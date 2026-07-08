"use client";

import {
  FORM_STEPS,
  FormProgress,
} from "@/components/newCharacterForm/FormProgress";
import {
  isBasicInfoStepComplete,
  StepBasicInfo,
} from "@/components/newCharacterForm/StepBasicInfo";
import {
  isBonusStepComplete,
  StepBonusSkills,
} from "@/components/newCharacterForm/StepBonusSkills";
import {
  isCharacteristicsStepComplete,
  StepCharacteristics,
} from "@/components/newCharacterForm/StepCharacteristics";
import { StepOccupation } from "@/components/newCharacterForm/StepOccupation";
import { StepOccupationalPointBuy } from "@/components/newCharacterForm/StepOccupationalPointBuy";
import {
  CharacterFormState,
  createEmptyFormState,
} from "@/lib/constsants/character-form";
import {
  isOccupationStepComplete,
  isOccupationalPointBuyComplete,
  buildCreateCharacterPayload,
} from "@/lib/constsants/character-form-logic";
import { emptyCharacteristics } from "@/lib/constsants/characteristics";
import { useRouter } from "next/navigation";

import { useState } from "react";

export function CharacterCreationForm() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [formState, setFormState] = useState<CharacterFormState>(() =>
    createEmptyFormState(emptyCharacteristics()),
  );
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  function canGoNext(): boolean {
    if (step === 0) return isBasicInfoStepComplete(formState.basicInfo);
    if (step === 1)
      return isCharacteristicsStepComplete(formState.characteristics);
    if (step === 2) return isOccupationStepComplete(formState);
    if (step === 3) return isOccupationalPointBuyComplete(formState);
    if (step === 4) return isBonusStepComplete(formState.bonusSkills);
    return true;
  }

  async function handleSubmit() {
    setSubmitError("");
    setSubmitting(true);
    try {
      const payload = buildCreateCharacterPayload(formState);

      const res = await fetch("/api/characters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        setSubmitError(data.error || "Nie udało się utworzyć postaci");
        setSubmitting(false);
        return;
      }

      router.push(`/characters/${data.id}`);
    } catch (err) {
      console.log(err)
      setSubmitError("Błąd połączenia z serwerem");
      setSubmitting(false);
    }
  }

  const isLastStep = step === FORM_STEPS.length - 1;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <FormProgress currentStep={step} />

      <div className="bg-white rounded-xl border border-stone-200 p-6 min-h-[420px]">
        {step === 0 && (
          <StepBasicInfo
            data={formState.basicInfo}
            onChange={(basicInfo) => setFormState({ ...formState, basicInfo })}
          />
        )}

        {step === 1 && (
          <StepCharacteristics
            characteristics={formState.characteristics}
            mode={formState.characteristicsMode}
            onModeChange={(characteristicsMode) =>
              setFormState({
                ...formState,
                characteristicsMode,
                characteristics: emptyCharacteristics(),
              })
            }
            onChange={(characteristics) =>
              setFormState({ ...formState, characteristics })
            }
          />
        )}

        {step === 2 && (
          <StepOccupation
            occupationKey={formState.occupationKey}
            onOccupationChange={(occupationKey) =>
              setFormState({
                ...formState,
                occupationKey,
                slotAssignments: {},
                customSpecText: {},
                occupationalSkillValues: {},
              })
            }
            slotAssignments={formState.slotAssignments}
            onSlotAssignmentsChange={(slotAssignments) =>
              setFormState({ ...formState, slotAssignments })
            }
            customSpecText={formState.customSpecText}
            onCustomSpecTextChange={(customSpecText) =>
              setFormState({ ...formState, customSpecText })
            }
          />
        )}

        {step === 3 && (
          <StepOccupationalPointBuy
            formState={formState}
            onChange={(occupationalSkillValues) =>
              setFormState({ ...formState, occupationalSkillValues })
            }
          />
        )}

        {step === 4 && (
          <StepBonusSkills
            formState={formState}
            onChange={(bonusSkills) =>
              setFormState({ ...formState, bonusSkills })
            }
          />
        )}
      </div>

      {submitError && (
        <p className="text-red-500 text-sm bg-red-50 p-2 rounded mt-4">
          {submitError}
        </p>
      )}

      <div className="flex justify-between mt-4">
        <button
          type="button"
          disabled={step === 0 || submitting}
          onClick={() => setStep((s) => s - 1)}
          className="px-4 py-2 text-sm rounded-lg border border-stone-300 text-stone-600 disabled:opacity-40"
        >
          Wstecz
        </button>

        {!isLastStep ? (
          <button
            type="button"
            disabled={!canGoNext()}
            onClick={() => setStep((s) => s + 1)}
            className="px-4 py-2 text-sm rounded-lg bg-stone-800 text-white disabled:opacity-40"
          >
            Dalej
          </button>
        ) : (
          <button
            type="button"
            disabled={!canGoNext() || submitting}
            onClick={handleSubmit}
            className="px-4 py-2 text-sm rounded-lg bg-stone-800 text-white disabled:opacity-40"
          >
            {submitting ? "Tworzenie..." : "Stwórz postać"}
          </button>
        )}
      </div>
    </div>
  );
}
