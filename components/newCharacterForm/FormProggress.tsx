const STEPS = ["Dane", "Charakterystyki", "Zawód", "Umiejętności (zawodowe)", "Umiejętności (bonus)"]

export function FormProgress({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex items-center mb-6">
      {STEPS.map((label, idx) => {
        const isActive = idx === currentStep
        const isDone = idx < currentStep
        return (
          <div key={label} className="flex items-center flex-1 last:flex-initial">
            <div className="flex flex-col items-center shrink-0">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium ${
                  isActive
                    ? "bg-stone-800 text-white"
                    : isDone
                    ? "bg-stone-300 text-stone-700"
                    : "bg-stone-100 text-stone-400"
                }`}
              >
                {idx + 1}
              </div>
              <span className="text-[10px] text-stone-500 mt-1 whitespace-nowrap">{label}</span>
            </div>
            {idx < STEPS.length - 1 && (
              <div className={`h-px flex-1 mx-2 ${isDone ? "bg-stone-400" : "bg-stone-200"}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}

export const FORM_STEPS = STEPS