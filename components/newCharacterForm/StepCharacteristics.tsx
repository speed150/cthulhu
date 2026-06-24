import { Field } from "@/components/Field"
import { CharacteristicsMode } from "@/lib/constsants/character-form"
import { Characteristics, CHARACTERISTIC_KEYS, CHARACTERISTIC_POINT_BUY_VALUES, calculateDerivedStats, BASE_CHARACTERISTICS } from "@/lib/constsants/characteristics"

type Props = {
  characteristics: Characteristics
  mode: CharacteristicsMode
  onModeChange: (mode: CharacteristicsMode) => void
  onChange: (characteristics: Characteristics) => void
}

export function StepCharacteristics({ characteristics, mode, onModeChange, onChange }: Props) {
  const usedValues = CHARACTERISTIC_KEYS.map((k) => characteristics[k]).filter((v) => v > 0)
  const available = [...CHARACTERISTIC_POINT_BUY_VALUES] as number[]
  usedValues.forEach((v) => {
    const idx = available.indexOf(v)
    if (idx !== -1) available.splice(idx, 1)
  })

  const derived = calculateDerivedStats(characteristics)

  function setValue(key: keyof Characteristics, value: number) {
    onChange({ ...characteristics, [key]: value })
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-stone-800">Charakterystyki</h2>
        <div className="flex gap-2 text-sm">
          <button
            type="button"
            onClick={() => onModeChange("pointbuy")}
            className={`px-3 py-1 rounded-full border ${
              mode === "pointbuy" ? "bg-stone-800 text-white border-stone-800" : "border-stone-300 text-stone-600"
            }`}
          >
            Lista wartości
          </button>
          <button
            type="button"
            onClick={() => onModeChange("manual")}
            className={`px-3 py-1 rounded-full border ${
              mode === "manual" ? "bg-stone-800 text-white border-stone-800" : "border-stone-300 text-stone-600"
            }`}
          >
            Ręcznie
          </button>
        </div>
      </div>

      {mode === "pointbuy" && (
        <p className="text-sm text-stone-500">
          Przypisz każdą z wartości <strong>[{CHARACTERISTIC_POINT_BUY_VALUES.join(", ")}]</strong> do jednej
          charakterystyki. Dostępne: {available.length > 0 ? available.join(", ") : "wszystkie przypisane"}
        </p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {CHARACTERISTIC_KEYS.map((key) => {
          const { label } = BASE_CHARACTERISTICS[key]
          const value = characteristics[key]

          if (mode === "manual") {
            return (
              <Field key={key} label={label}>
                <input
                  type="number"
                  min={0}
                  max={99}
                  className="input text-center"
                  value={value || ""}
                  onChange={(e) => setValue(key, Number(e.target.value) || 0)}
                />
              </Field>
            )
          }

          const selectable = value > 0 ? [value, ...available] : [0, ...available]
          const options = [...new Set(selectable)].filter((v) => v > 0).sort((a, b) => a - b)

          return (
            <Field key={key} label={label}>
              <select
                className="input text-center"
                value={value || 0}
                onChange={(e) => setValue(key, Number(e.target.value) || 0)}
              >
                <option value={0}>—</option>
                {options.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </Field>
          )
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-stone-200">
        <h3 className="text-sm font-medium text-stone-600 mb-2">Pochodne (liczone automatycznie)</h3>
        <div className="grid grid-cols-4 gap-3 text-center">
          <DerivedStat label="HP" value={derived.hp} />
          <DerivedStat label="MP" value={derived.mp} />
          <DerivedStat label="Sanity" value={derived.sanity} />
          <DerivedStat label="Move" value={derived.moveRate} />
        </div>
      </div>
    </div>
  )
}

function DerivedStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-stone-50 rounded-lg py-2 border border-stone-200">
      <div className="text-xs text-stone-400 uppercase tracking-wide">{label}</div>
      <div className="text-lg font-semibold text-stone-800">{value}</div>
    </div>
  )
}

export function isCharacteristicsStepComplete(characteristics: Characteristics): boolean {
  return Object.values(characteristics).every((v) => v > 0)
}