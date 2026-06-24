import { Characteristics } from "@/lib/constsants/characteristics"
import { OccupationKey } from "@/lib/constsants/occupations"
import { SkillKey } from "@/lib/constsants/skills"

export type BasicInfo = {
  name: string
  player: string
  age: string
  residence: string
  birthplace: string
}

export type CharacteristicsMode = "pointbuy" | "manual"

// Przypisanie dla slotu typu "choice" z OCCUPATIONS:
// - klucz umiejętności (np. "charm")
// - lub "skillKey::specialization" (np. "artCraft::Disguise" albo "artCraft::any")
export type SlotAssignments = Record<string, string>

// Wpisany przez gracza tekst specjalizacji dla slotów "any" (np. nazwa języka)
// slotId -> tekst
export type CustomSpecText = Record<string, string>

// Wartości przypisane w point-buy zawodowym: slotId -> wartość (70/60/.../40)
export type OccupationalSkillValues = Record<string, number>

// 4 sloty bonusowe (+20), każdy to wybrany SkillKey albo null
export type BonusSkills = (SkillKey|null)[]

export type CharacterFormState = {
  basicInfo: BasicInfo
  characteristicsMode: CharacteristicsMode
  characteristics: Characteristics
  occupationKey: OccupationKey | ""
  slotAssignments: SlotAssignments
  customSpecText: CustomSpecText
  occupationalSkillValues: OccupationalSkillValues
  bonusSkills: BonusSkills
}

export function createEmptyFormState(characteristics: Characteristics): CharacterFormState {
  return {
    basicInfo: { name: "", player: "", age: "", residence: "", birthplace: "" },
    characteristicsMode: "pointbuy",
    characteristics,
    occupationKey: "",
    slotAssignments: {},
    customSpecText: {},
    occupationalSkillValues: {},
    bonusSkills: [null, null, null, null],
  }
}

// Payload wysyłany do POST /api/characters
export type CreateCharacterPayload = {
  name: string
  occupation: OccupationKey
  age: number | null
  residence: string | null
  birthplace: string | null
  maxHP:number
  HP: number
  maxMP: number
  MP: number
  luck:number
  sanity: number
  moveRate: number
  characteristics: Characteristics
  skills: Record<SkillKey, number>
}