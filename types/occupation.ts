import { OCCUPATIONS } from "@/lib/consts/occupations"
import { SkillKey } from "@/types/skill"

export type OccupationKey = keyof typeof OCCUPATIONS
type SpecializedSkill = {
  skill: SkillKey
  specialization: string
}

type SkillChoice = {
  choose: number
  from: SkillKey[] | "any"
}

export type OccupationSkill = SkillKey | SpecializedSkill | SkillChoice