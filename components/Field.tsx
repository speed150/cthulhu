export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-stone-600 mb-1">{label}</span>
      {children}
    </label>
  )
}