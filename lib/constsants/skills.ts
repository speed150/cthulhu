export const BASE_SKILLS = {
  accounting: { label: "Accounting", base: 5 },
  anthropology: { label: "Anthropology", base: 1 },
  appraise: { label: "Appraise", base: 5 },
  archaeology: { label: "Archaeology", base: 1 },
  artCraft: {
    label: "Art/Craft",
    base: 5,
    specializations: ["Literature", "Photography", "Painting", "Sculpting", "Disguise"],
    customSpec: true, // gracz może wpisać własną specjalizację
  },
  charm: { label: "Charm", base: 15 },
  climb: { label: "Climb", base: 20 },
  creditRating: { label: "Credit Rating", base: 0 },
  cthulhuMythos: { label: "Cthulhu Mythos", base: 0 },
  dodge: { label: "Dodge (half DEX)", base: 0 }, // pochodna DEX, liczona w kodzie
  driveAuto: { label: "Drive Auto", base: 20 },
  elecRepair: { label: "Elec Repair", base: 10 },
  fastTalk: { label: "Fast Talk", base: 5 },
  fighting: {
    label: "Fighting",
    base: 0,
    specializations: ["Brawl", "Sword", "Spear", "Axe"],
    customSpec: true,
  },
  firearmsHandgun: { label: "Firearms (Handgun)", base: 20 },
  firearmsRifle: { label: "Firearms (Rifle)", base: 25 },
  firstAid: { label: "First Aid", base: 30 },
  history: { label: "History", base: 5 },
  intimidate: { label: "Intimidate", base: 15 },
  jump: { label: "Jump", base: 20 },
  languageOther: {
    label: "Language (Other)",
    base: 1,
    specializations: ["Latin", "French", "Spanish", "Arabic"],
    customSpec: true, // gracz wpisuje dowolny język
  },
  languageOwn: { label: "Language (Own)", base: 0 }, // pochodna EDU, liczona w kodzie
  law: { label: "Law", base: 5 },
  libraryUse: { label: "Library Use", base: 20 },
  listen: { label: "Listen", base: 20 },
  locksmith: { label: "Locksmith", base: 1 },
  mechRepair: { label: "Mech. Repair", base: 10 },
  medicine: { label: "Medicine", base: 1 },
  naturalWorld: { label: "Natural World", base: 10 },
  navigate: { label: "Navigate", base: 10 },
  occult: { label: "Occult", base: 5 },
  opHvMachine: { label: "Op. Hv. Machine", base: 1 },
  persuade: { label: "Persuade", base: 10 },
  pilot: {
    label: "Pilot",
    base: 1,
    specializations: ["Aircraft", "Boat"],
    customSpec: true,
  },
  psychology: { label: "Psychology", base: 10 },
  psychoanalysis: { label: "Psychoanalysis", base: 1 },
  ride: { label: "Ride", base: 5 },
  science: {
    label: "Science",
    base: 1,
    specializations: ["Biology", "Pharmacy", "Astronomy", "Chemistry", "Geology"],
    customSpec: true,
  },
  sleightOfHand: { label: "Sleight of Hand", base: 10 },
  spotHidden: { label: "Spot Hidden", base: 25 },
  stealth: { label: "Stealth", base: 20 },
  survival: {
    label: "Survival",
    base: 10,
    specializations: ["Desert", "Sea", "Arctic"],
    customSpec: true,
  },
  swim: { label: "Swim", base: 20 },
  throw: { label: "Throw", base: 20 },
  track: { label: "Track", base: 10 },
} as const

export type SkillKey = keyof typeof BASE_SKILLS

export const SKILL_KEYS = Object.keys(BASE_SKILLS) as SkillKey[]

// point-buy do umiejętności zawodowych + Credit Rating (zamiast wartości bazowej)
export const SKILL_POINT_BUY_VALUES = [70, 60, 60, 50, 50, 50, 40, 40, 40] as const

// liczba dowolnych umiejętności które dostają bonus po point-buy zawodowym
export const BONUS_SKILL_SLOTS = 4
export const BONUS_SKILL_VALUE = 20