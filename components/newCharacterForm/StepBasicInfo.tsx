import { BasicInfo } from "@/lib/constsants/character-form"
import { Field } from "../Field"

type Props = {
  data: BasicInfo
  onChange: (data: BasicInfo) => void
}

export function StepBasicInfo({ data, onChange }: Props) {
  function update<K extends keyof BasicInfo>(key: K, value: BasicInfo[K]) {
    onChange({ ...data, [key]: value })
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-stone-800">Dane postaci</h2>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Imię postaci *">
          <input
            className="input"
            value={data.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="np. Randolph Carter"
          />
        </Field>
        <Field label="Gracz">
          <input className="input" value={data.player} onChange={(e) => update("player", e.target.value)} />
        </Field>
        <Field label="Wiek">
          <input
            type="number"
            className="input"
            value={data.age}
            onChange={(e) => update("age", e.target.value)}
          />
        </Field>
        <Field label="Miejsce zamieszkania">
          <input className="input" value={data.residence} onChange={(e) => update("residence", e.target.value)} />
        </Field>
        <Field label="Miejsce urodzenia">
          <input className="input" value={data.birthplace} onChange={(e) => update("birthplace", e.target.value)} />
        </Field>
      </div>
    </div>
  )
}

export function isBasicInfoStepComplete(data: BasicInfo): boolean {
  return data.name.trim().length > 0
}