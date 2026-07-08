import { Field } from "@/components/Field"
import { SlotAssignments, CustomSpecText } from "@/lib/constsants/character-form"
import { expandOccupationSlots, ResolvedSlot, slotLabel, slotNeedsCustomInput, describeChoiceOption } from "@/lib/constsants/character-form-logic"
import { OccupationKey, OCCUPATIONS } from "@/lib/constsants/occupations"
import { BASE_SKILLS, SKILL_KEYS } from "@/lib/constsants/skills"

type Props = {
  occupationKey: OccupationKey | ""
  onOccupationChange: (key: OccupationKey | "") => void
  slotAssignments: SlotAssignments
  onSlotAssignmentsChange: (assignments: SlotAssignments) => void
  customSpecText: CustomSpecText
  onCustomSpecTextChange: (text: CustomSpecText) => void
}

export function StepOccupation({
  occupationKey,
  onOccupationChange,
  slotAssignments,
  onSlotAssignmentsChange,
  customSpecText,
  onCustomSpecTextChange,
}: Props) {
  const slots = expandOccupationSlots(occupationKey)

  function handleSlotChange(slotId: string, value: string) {
    onSlotAssignmentsChange({ ...slotAssignments, [slotId]: value })
  }

  function handleCustomSpecChange(slotId: string, text: string) {
    onCustomSpecTextChange({ ...customSpecText, [slotId]: text })
  }

  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold text-stone-800">Zawód</h2>

      <Field label="Wybierz zawód *">
        <select
          className="input"
          value={occupationKey}
          onChange={(e) => onOccupationChange(e.target.value as OccupationKey | "")}
        >
          <option value="">— wybierz —</option>
          {Object.entries(OCCUPATIONS).map(([key, occ]) => (
            <option key={key} value={key}>
              {occ.label}
            </option>
          ))}
        </select>
      </Field>

      {occupationKey && (
        <div className="space-y-3">
          <p className="text-sm text-stone-500">
            Umiejętności zawodowe — {OCCUPATIONS[occupationKey].label} otrzymuje bonus do poniższych umiejętności.
          </p>
          <div className="space-y-2">
            {slots.map((slot) => (
              <SlotRow
                key={slot.id}
                slot={slot}
                slotAssignments={slotAssignments}
                customSpecText={customSpecText}
                onSlotChange={handleSlotChange}
                onCustomSpecChange={handleCustomSpecChange}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function SlotRow({
  slot,
  slotAssignments,
  customSpecText,
  onSlotChange,
  onCustomSpecChange,
}: {
  slot: ResolvedSlot
  slotAssignments: SlotAssignments
  customSpecText: CustomSpecText
  onSlotChange: (slotId: string, value: string) => void
  onCustomSpecChange: (slotId: string, text: string) => void
}) {
  // Umiejętność fixed bez specjalizacji lub ze stałą specjalizacją — tylko wyświetlenie
  if (slot.type === "fixed" || slot.type === "fixed-spec") {
    return (
      <div className="flex items-center justify-between bg-stone-50 border border-stone-200 rounded-lg px-3 py-2">
        <span className="text-sm text-stone-700">{slotLabel(slot, customSpecText, slotAssignments)}</span>
      </div>
    )
  }

  // Umiejętność ze specjalizacją wpisywaną przez gracza (np. Language: ?)
  if (slot.type === "fixed-spec-custom") {
    return (
      <div className="flex items-center gap-3 bg-stone-50 border border-stone-200 rounded-lg px-3 py-2">
        <span className="text-sm text-stone-600 whitespace-nowrap">{BASE_SKILLS[slot.skill].label}:</span>
        <input
          className="input flex-1"
          placeholder={`np. ${Object.hasOwn(BASE_SKILLS[slot.skill],'specializations') ? BASE_SKILLS[slot.skill].specializations[0]:""}`}
          value={customSpecText[slot.id] || ""}
          onChange={(e) => onCustomSpecChange(slot.id, e.target.value)}
        />
      </div>
    )
  }

  // Wybór z listy (choice) — może wymagać dodatkowego inputu jeśli wybrano opcję "any"
  const rawValue = slotAssignments[slot.id] || ""
  const optionsList = slot.options === "any" ? SKILL_KEYS : slot.options
  const needsCustom = slotNeedsCustomInput(slot, slotAssignments)

  return (
    <div className="flex items-center gap-3 bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 flex-wrap">
      <span className="text-sm text-stone-500 shrink-0">Wybór umiejętności</span>
      <select
        className="input flex-1 min-w-[160px]"
        value={rawValue}
        onChange={(e) => onSlotChange(slot.id, e.target.value)}
      >
        <option value="">— wybierz —</option>
        {optionsList.map((opt) => {
          const { label, value } = describeChoiceOption(opt)
          return (
            <option key={value} value={value}>
              {label}
            </option>
          )
        })}
      </select>
      {needsCustom && (
        <input
          className="input flex-1 min-w-[140px]"
          placeholder="wpisz specjalizację"
          value={customSpecText[slot.id] || ""}
          onChange={(e) => onCustomSpecChange(slot.id, e.target.value)}
        />
      )}
    </div>
  )
}