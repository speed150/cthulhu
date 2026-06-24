import { CharacterFormState, BonusSkills } from "@/lib/constsants/character-form"
import { getOccupationalSkillValue } from "@/lib/constsants/character-form-logic"
import { SkillKey, BONUS_SKILL_SLOTS, BONUS_SKILL_VALUE, SKILL_KEYS, BASE_SKILLS } from "@/lib/constsants/skills"

type Props = {
  formState: CharacterFormState
  onChange: (bonusSkills: BonusSkills) => void
}

export function StepBonusSkills({ formState, onChange }: Props) {
  const dexHalf = Math.floor((formState.characteristics.dex || 0) / 2)
  const eduValue = formState.characteristics.edu || 0

  function baseFor(key: SkillKey): number {
    if (key === "dodge") return dexHalf
    if (key === "languageOwn") return eduValue
    return getOccupationalSkillValue(formState, key)
  }

  function setSlot(index: number, key: SkillKey | "") {
    const next = [...formState.bonusSkills]
    next[index] = key || null
    onChange(next)
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-stone-800">Umiejętności — bonus</h2>
      <p className="text-sm text-stone-500">
        Wybierz {BONUS_SKILL_SLOTS} różne umiejętności — każda dostaje +{BONUS_SKILL_VALUE} do wartości z
        poprzedniego kroku.
      </p>

      <div className="flex flex-col gap-2">
        {Array.from({ length: BONUS_SKILL_SLOTS }).map((_, i) => {
          const selectedKey = formState.bonusSkills[i]
          const takenByOthers = formState.bonusSkills.filter((s, idx) => idx !== i && s !== null)

          return (
            <div key={i} className="flex items-center gap-3 bg-stone-50 border border-stone-200 rounded-lg px-3 py-2">
              <span className="text-sm text-stone-500 whitespace-nowrap">
                Bonus {i + 1}/{BONUS_SKILL_SLOTS}
              </span>
              <select
                className="input flex-1"
                value={selectedKey || ""}
                onChange={(e) => setSlot(i, e.target.value as SkillKey | "")}
              >
                <option value="">— wybierz umiejętność —</option>
                {SKILL_KEYS.filter((k) => !takenByOthers.includes(k)).map((k) => {
                  const base = baseFor(k)
                  return (
                    <option key={k} value={k}>
                      {BASE_SKILLS[k].label} ({base}% → {base + BONUS_SKILL_VALUE}%)
                    </option>
                  )
                })}
              </select>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function isBonusStepComplete(bonusSkills: BonusSkills): boolean {
  return bonusSkills.every((s) => s !== null)
}