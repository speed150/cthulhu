import { CharacterFormState } from "@/lib/constsants/character-form";
import { calculateDerivedStats } from "@/lib/constsants/characteristics";
import { SkillChoiceOption, OCCUPATIONS, OccupationKey, OccupationSkill } from "@/lib/constsants/occupations";
import { BASE_SKILLS, SKILL_KEYS, SkillKey } from "@/lib/constsants/skills";
import { randomInt } from "crypto";

export type ResolvedSlot =
  | { id: string; type: "fixed"; skill: SkillKey }
  | { id: string; type: "fixed-spec"; skill: SkillKey; specialization: string }
  | { id: string; type: "fixed-spec-custom"; skill: SkillKey }
  | { id: string; type: "choice"; options: SkillChoiceOption[] | "any" }

export function expandOccupationSlots(occupationKey: OccupationKey | ""): ResolvedSlot[] {
  if (!occupationKey) return []
  const occupation = OCCUPATIONS[occupationKey]
  const slots: ResolvedSlot[] = []

  occupation.skills.forEach((entry: OccupationSkill, idx: number) => {
    if (typeof entry === "string") {
      slots.push({ id: `fixed-${idx}`, type: "fixed", skill: entry })
    } else if ("specialization" in entry) {
      if (entry.specialization === "any") {
        slots.push({ id: `fixed-${idx}`, type: "fixed-spec-custom", skill: entry.skill })
      } else {
        slots.push({ id: `fixed-${idx}`, type: "fixed-spec", skill: entry.skill, specialization: entry.specialization })
      }
    } else {
      for (let i = 0; i < entry.choose; i++) {
        slots.push({ id: `choice-${idx}-${i}`, type: "choice", options: entry.from })
      }
    }
  })

  return slots
}

export function describeChoiceOption(option: SkillChoiceOption): { label: string; value: string } {
  if (typeof option === "string") {
    return { label: BASE_SKILLS[option].label, value: option }
  }
  const specLabel = option.specialization === "any" ? "?" : option.specialization
  return {
    label: `${BASE_SKILLS[option.skill].label}: ${specLabel}`,
    value: `${option.skill}::${option.specialization}`,
  }
}

// Rozdziela wartość wybraną w <select> dla slotu "choice" na { skill, specialization }
export function parseChoiceValue(raw: string): { skill: SkillKey; specialization: string | null } {
  if (raw.includes("::")) {
    const [skill, specialization] = raw.split("::")
    return { skill: skill as SkillKey, specialization }
  }
  return { skill: raw as SkillKey, specialization: null }
}

export function slotLabel(slot: ResolvedSlot, customSpecText: Record<string, string>, slotAssignments: Record<string, string>): string {
  if (slot.type === "fixed") return BASE_SKILLS[slot.skill].label
  if (slot.type === "fixed-spec") return `${BASE_SKILLS[slot.skill].label}: ${slot.specialization}`
  if (slot.type === "fixed-spec-custom") {
    const text = customSpecText[slot.id]
    return `${BASE_SKILLS[slot.skill].label}: ${text || "?"}`
  }
  // choice
  const raw = slotAssignments[slot.id]
  if (!raw) return "Wybór umiejętności"
  const { skill, specialization } = parseChoiceValue(raw)
  if (!specialization) return BASE_SKILLS[skill].label
  if (specialization === "any") {
    const text = customSpecText[slot.id]
    return `${BASE_SKILLS[skill].label}: ${text || "?"}`
  }
  return `${BASE_SKILLS[skill].label}: ${specialization}`
}

// Czy dany slot wymaga inputu tekstowego "wpisz własną specjalizację"
export function slotNeedsCustomInput(slot: ResolvedSlot, slotAssignments: Record<string, string>): boolean {
  if (slot.type === "fixed-spec-custom") return true
  if (slot.type === "choice") {
    const raw = slotAssignments[slot.id]
    return !!raw && raw.endsWith("::any")
  }
  return false
}

// ===== Walidacja kroków =====

export function isOccupationStepComplete(state: CharacterFormState): boolean {
  if (!state.occupationKey) return false
  const slots = expandOccupationSlots(state.occupationKey)
  return slots.every((slot) => {
    if (slot.type === "fixed" || slot.type === "fixed-spec") return true
    if (slot.type === "fixed-spec-custom") return !!state.customSpecText[slot.id]?.trim()
    // choice
    const raw = state.slotAssignments[slot.id]
    if (!raw) return false
    if (raw.endsWith("::any")) return !!state.customSpecText[slot.id]?.trim()
    return true
  })
}

// ===== Sloty do point-buy zawodowego (umiejętności zawodu, rozwiązane do konkretnych SkillKey + Credit Rating) =====

export type OccupationalPointBuySlot = { id: string; skillKey: SkillKey; label: string }

export function getOccupationalPointBuySlots(state: CharacterFormState): OccupationalPointBuySlot[] {
  const slots = expandOccupationSlots(state.occupationKey)
  const resolved: OccupationalPointBuySlot[] = []

  slots.forEach((slot) => {
    if (slot.type === "fixed" || slot.type === "fixed-spec" || slot.type === "fixed-spec-custom") {
      resolved.push({ id: slot.id, skillKey: slot.skill, label: slotLabel(slot, state.customSpecText, state.slotAssignments) })
      return
    }
    // choice
    const raw = state.slotAssignments[slot.id]
    if (raw) {
      const { skill } = parseChoiceValue(raw)
      resolved.push({ id: slot.id, skillKey: skill, label: slotLabel(slot, state.customSpecText, state.slotAssignments) })
    }
  })

  // Credit Rating jest zawsze dostępny do point-buy zawodowego, niezależnie od zawodu
  resolved.push({ id: "creditRating-slot", skillKey: "creditRating", label: "Credit Rating" })

  return resolved
}

export function isOccupationalPointBuyComplete(state: CharacterFormState): boolean {
  const slots = getOccupationalPointBuySlots(state)
  const assigned = slots.map((s) => state.occupationalSkillValues[s.id]).filter((v) => v > 0)
  return assigned.length === slots.length
}

// Wartość umiejętności PO point-buy zawodowym (przed bonusami), z fallbackiem do bazy
export function getOccupationalSkillValue(state: CharacterFormState, skillKey: SkillKey): number {
  const slots = getOccupationalPointBuySlots(state)
  const slot = slots.find((s) => s.skillKey === skillKey)
  if (slot) {
    const value = state.occupationalSkillValues[slot.id]
    if (value > 0) return value
  }
  return BASE_SKILLS[skillKey].base
}

// ===== Finalne wartości umiejętności (baza/point-buy zawodowy + bonusy +20, pochodne DEX/EDU) =====

export function buildFinalSkillValues(state: CharacterFormState): Record<SkillKey, number> {
  const dexHalf = Math.floor((state.characteristics.dex || 0) / 2)
  const eduValue = state.characteristics.edu || 0

  const result = {} as Record<SkillKey, number>

  SKILL_KEYS.forEach((key: SkillKey) => {
    if (key === "dodge") {
      result[key] = dexHalf
    } else if (key === "languageOwn") {
      result[key] = eduValue
    } else {
      result[key] = getOccupationalSkillValue(state, key)
    }
  })

  state.bonusSkills.forEach((key: SkillKey | null) => {
    if (key) result[key] = (result[key] || 0) + 20
  })

  return result
}

// ===== Specjalizacje wybrane podczas kroku zawodu (do zapisu razem z postacią) =====

export function buildSpecializationsSummary(state: CharacterFormState): { skill: SkillKey; specialization: string }[] {
  const slots = expandOccupationSlots(state.occupationKey)
  const result: { skill: SkillKey; specialization: string }[] = []

  slots.forEach((slot) => {
    if (slot.type === "fixed-spec-custom") {
      const text = state.customSpecText[slot.id]
      if (text) result.push({ skill: slot.skill, specialization: text })
    } else if (slot.type === "fixed-spec") {
      result.push({ skill: slot.skill, specialization: slot.specialization })
    } else if (slot.type === "choice") {
      const raw = state.slotAssignments[slot.id]
      if (raw) {
        const { skill, specialization } = parseChoiceValue(raw)
        if (specialization === "any") {
          const text = state.customSpecText[slot.id]
          if (text) result.push({ skill, specialization: text })
        } else if (specialization) {
          result.push({ skill, specialization })
        }
      }
    }
  })

  return result
}
function genLuck() {
  let res = 0
  for (let i = 0; i < 3; i++) {
    res += (Math.floor(Math.random()*6)+1) * 5
  }
  return res
}
// ===== Payload finalny do wysłania do API =====

export function buildCreateCharacterPayload(state: CharacterFormState) {
  const derived = calculateDerivedStats(state.characteristics)
  return {
    name: state.basicInfo.name.trim(),
    age: state.basicInfo.age ? Number(state.basicInfo.age) : null,
    residence: state.basicInfo.residence.trim() || null,
    birthplace: state.basicInfo.birthplace.trim() || null,
    characteristics: state.characteristics,
    maxHP: derived.hp,
    HP: derived.hp,
    maxMP: derived.mp,
    MP: derived.mp,
    sanity: derived.sanity,
    luck: genLuck(),
    moveRate: derived.moveRate,
    occupation: state.occupationKey as OccupationKey,
    skills: buildFinalSkillValues(state),
  }
}