import { CharacterFormState, OccupationalSkillValues } from "@/lib/constsants/character-form"
import { getOccupationalPointBuySlots } from "@/lib/constsants/character-form-logic"
import { SKILL_POINT_BUY_VALUES, BASE_SKILLS } from "@/lib/constsants/skills"

type Props = {
  formState: CharacterFormState
  onChange: (values: OccupationalSkillValues) => void
}

export function StepOccupationalPointBuy({ formState, onChange }: Props) {
  if (!formState.occupationKey) {
    return <p className="text-sm text-stone-500">Wybierz najpierw zawód w poprzednim kroku.</p>
  }

  const slots = getOccupationalPointBuySlots(formState)
  const usedValues = slots.map((s) => formState.occupationalSkillValues[s.id]).filter((v) => v > 0)
  const available = [...SKILL_POINT_BUY_VALUES] as number[]
  usedValues.forEach((v) => {
    const idx = available.indexOf(v)
    if (idx !== -1) available.splice(idx, 1)
  })

  function setValue(slotId: string, value: number) {
    onChange({ ...formState.occupationalSkillValues, [slotId]: value })
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-stone-800">Umiejętności zawodowe</h2>
      <p className="text-sm text-stone-500">
        Przypisz każdą z wartości <strong>[{SKILL_POINT_BUY_VALUES.join(", ")}]</strong> do jednej z umiejętności
        zawodowych — zamienia wartość bazową. Dostępne:{" "}
        {available.length > 0 ? available.join(", ") : "wszystkie przypisane"}
      </p>

      <div className="flex flex-col gap-2">
        {slots.map((slot) => {
          const value = formState.occupationalSkillValues[slot.id]
          const base = BASE_SKILLS[slot.skillKey].base
          const selectable = value > 0 ? [value, ...available] : [0, ...available]
          const options = [...new Set(selectable)].filter((v) => v > 0).sort((a, b) => b - a)

          return (
            <div
              key={slot.id}
              className="flex items-center justify-between gap-3 bg-amber-50 border border-amber-300 rounded-lg px-3 py-2"
            >
              <span className="text-sm text-stone-700">
                {slot.label} <span className="text-stone-400 text-xs">(baza {base}%)</span>
              </span>
              <select
                className="input w-24 text-center shrink-0"
                value={value || 0}
                onChange={(e) => setValue(slot.id, Number(e.target.value) || 0)}
              >
                <option value={0}>—</option>
                {options.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </div>
          )
        })}
      </div>
    </div>
  )
}