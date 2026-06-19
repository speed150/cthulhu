import { BASE_SKILLS } from "@/lib/consts/character"

export type SkillKey = keyof typeof BASE_SKILLS

export type SkillWithSpec = {
    skill: SkillKey
    specialization: string  
}
type BaseSkillValue =
    | number                                    
    | { spec: string; value: number }[]        

type CharacterBaseSkills = {
    [K in SkillKey]?: BaseSkillValue
}
