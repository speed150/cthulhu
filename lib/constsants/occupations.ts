import { SkillKey } from "@/lib/constsants/skills"


// - { choose, from }                -> wybór N z listy (lista może mieszać stringi i obiekty specjalizacji)
export type SpecializedSkill = {
  skill: SkillKey
  specialization: string // konkretna nazwa (np. "Latin") albo "any" gdy gracz wpisuje własną
}

export type SkillChoiceOption = SkillKey | SpecializedSkill

export type SkillChoice = {
  choose: number
  from: SkillChoiceOption[] | "any"
}

export type OccupationSkill = SkillKey | SpecializedSkill | SkillChoice

export const OCCUPATIONS = {
  antiquarian: {
    label: "Antiquarian",
    skills: [
      "appraise",
      { skill: "artCraft", specialization: "any" },
      "history",
      "libraryUse",
      { skill: "languageOther", specialization: "any" },
      { choose: 1, from: ["charm", "fastTalk", "intimidate", "persuade"] },
      "spotHidden",
      { choose: 1, from: "any" },
    ],
  },
  author: {
    label: "Author",
    skills: [
      { skill: "artCraft", specialization: "Literature" },
      "history",
      "libraryUse",
      { choose: 1, from: ["naturalWorld", "occult"] },
      { skill: "languageOther", specialization: "any" },
      "languageOwn",
      "psychology",
      { choose: 1, from: "any" },
    ],
  },
  dilettante: {
    label: "Dilettante",
    skills: [
      { skill: "artCraft", specialization: "any" },
      "firearmsHandgun",
      { skill: "languageOther", specialization: "any" },
      "ride",
      { choose: 1, from: ["charm", "fastTalk", "intimidate", "persuade"] },
      { choose: 3, from: "any" },
    ],
  },
  doctorOfMedicine: {
    label: "Doctor of Medicine",
    skills: [
      "firstAid",
      { skill: "languageOther", specialization: "Latin" },
      "medicine",
      "psychology",
      { skill: "science", specialization: "Biology" },
      { skill: "science", specialization: "Pharmacy" },
      { choose: 2, from: "any" },
    ],
  },
  journalist: {
    label: "Journalist",
    skills: [
      { skill: "artCraft", specialization: "Photography" },
      "history",
      "libraryUse",
      "languageOwn",
      { choose: 1, from: ["charm", "fastTalk", "intimidate", "persuade"] },
      "psychology",
      { choose: 2, from: "any" },
    ],
  },
  policeDetective: {
    label: "Police Detective",
    skills: [
      {
        choose: 1,
        from: [
          { skill: "artCraft", specialization: "any" },
          { skill: "artCraft", specialization: "Disguise" },
        ],
      },
      "firearmsHandgun",
      "law",
      "listen",
      { choose: 1, from: ["charm", "fastTalk", "intimidate", "persuade"] },
      "psychology",
      "spotHidden",
      { choose: 1, from: "any" },
    ],
  },
  privateInvestigator: {
    label: "Private Investigator",
    skills: [
      { skill: "artCraft", specialization: "Photography" },
      { skill: "artCraft", specialization: "Disguise" },
      "law",
      "libraryUse",
      { choose: 1, from: ["charm", "fastTalk", "intimidate", "persuade"] },
      "psychology",
      "spotHidden",
      { choose: 1, from: "any" },
    ],
  },
  professor: {
    label: "Professor",
    skills: [
      "libraryUse",
      { skill: "languageOther", specialization: "any" },
      "languageOwn",
      "psychology",
      { choose: 4, from: "any" },
    ],
  },
  custom: {
    label: "Custom profession",
    skills: [
      { choose: 8, from: "any" }
    ]
  }
} as const satisfies Record<string, { label: string; skills: OccupationSkill[] }>

export type OccupationKey = keyof typeof OCCUPATIONS