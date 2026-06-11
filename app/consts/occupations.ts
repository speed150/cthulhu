import { SkillKey } from "@/app/consts/character"

export const OCCUPATIONS = {
  antiquarian: {
    label: "Antiquarian",
    skills: [
      "appraise",
      "artCraft",        // Any
      "history",
      "libraryUse",
      "languageOther",
      { choose: 1, from: ["charm", "fastTalk", "intimidate", "persuade"] },
      "spotHidden",
      { choose: 1, from: "any" },
    ]
  },
  author: {
    label: "Author",
    skills: [
      { skill: "artCraft", specialization: "Literature" },      // Literature
      "history",
      "libraryUse",
      { choose: 1, from: ["naturalWorld", "occult"] },
      "languageOther",
      "languageOwn",
      "psychology",
      { choose: 1, from: "any" },
    ]
  },
  dilettante: {
    label: "Dilettante",
    skills: [
      { skill: "artCraft", specialization: "any" },       // Any
      "firearmsHandgun",
      "languageOther",
      "ride",
      { choose: 1, from: ["charm", "fastTalk", "intimidate", "persuade"] },
      { choose: 3, from: "any" },
    ]
  },
  doctorOfMedicine: {
    label: "Doctor of Medicine",
    skills: [
      "firstAid",
      { skill: "languageOther", specialization: "Latin" },   // Latin
      "medicine",
      "psychology",
      { skill: "science", specialization: "Biology" },
      { skill: "science", specialization: "Pharmacy" },        // Pharmacy
      { choose: 2, from: "any" },
    ]
  },
  journalist: {
    label: "Journalist",
    skills: [
      "artCraft",        // Photography
      "history",
      "libraryUse",
      "languageOwn",
      { choose: 1, from: ["charm", "fastTalk", "intimidate", "persuade"] },
      "psychology",
      { choose: 2, from: "any" },
    ]
  },
  policeDetective: {
    label: "Police Detective",
    skills: [
      { choose: 1, from: ["artCraft", "disguise"] }, // Acting or Disguise
      "firearmsHandgun",
      "law",
      "listen",
      { choose: 1, from: ["charm", "fastTalk", "intimidate", "persuade"] },
      "psychology",
      "spotHidden",
      { choose: 1, from: "any" },
    ]
  },
  privateInvestigator: {
    label: "Private Investigator",
    skills: [
        { skill: "artCraft", specialization: "Photography" },        // Photography
      "disguise",
      "law",
      "libraryUse",
      { choose: 1, from: ["charm", "fastTalk", "intimidate", "persuade"] },
      "psychology",
      "spotHidden",
      { choose: 1, from: "any" },
    ]
  },
  professor: {
    label: "Professor",
    skills: [
      "libraryUse",
      "languageOther",
      "languageOwn",
      "psychology",
      { choose: 4, from: "any" },
    ]
  },
  custom:{
    label:"Custom",
    skills:[
        {choose:8,from: "any"}
    ]
  }
} as const

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