// lib/constants.ts
export const BASE_CHARACTERISTICS = {
    str: { label: "STR", default: 0 },
    dex: { label: "DEX", default: 0 },
    int: { label: "INT", default: 0 },
    con: { label: "CON", default: 0 },
    app: { label: "APP", default: 0 },
    pow: { label: "POW", default: 0 },
    siz: { label: "SIZ", default: 0 },
    edu: { label: "EDU", default: 0 },
}

export const BASE_SKILLS = {
    accounting: { label: "Accounting", base: 5 },
    anthropology: { label: "Anthropology", base: 1 },
    appraise: { label: "Appraise", base: 5 },
    archaeology: { label: "Archaeology", base: 1 },
    artCraft: {
        label: "Art/Craft",
        base: 5,
        specializations: ["Literature", "Photography", "Painting", "Sculpting"] // przykłady
        // gracz może też wpisać własną
    },
    charm: { label: "Charm", base: 15 },
    climb: { label: "Climb", base: 20 },
    creditRating: { label: "Credit Rating", base: 0 },
    cthulhuMythos: { label: "Cthulhu Mythos", base: 0 },
    disguise: { label: "Disguise", base: 5 },
    dodge: { label: "Dodge (half DEX)", base: 0 }, // pochodna DEX
    driveAuto: { label: "Drive Auto", base: 20 },
    elecRepair: { label: "Elec Repair", base: 10 },
    fastTalk: { label: "Fast Talk", base: 5 },
    fightingBrawl: { label: "Fighting (Brawl)", base: 25 },
    fighting: {
        label: "Fighting",
        base: 0,
        specializations: ["Brawl", "Sword", "Spear", "Axe"]
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
        specializations: ["Latin", "French", "Spanish", "Arabic"]
        // gracz wpisuje dowolny język
    },
    languageOwn: { label: "Language (Own)", base: 0 }, // pochodna EDU
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
        specializations: ["Aircraft", "Boat"]
    },
    psychology: { label: "Psychology", base: 10 },
    psychoanalysis: { label: "Psychoanalysis", base: 1 },
    ride: { label: "Ride", base: 5 },
    science: {
        label: "Science",
        base: 1,
        specializations: ["Biology", "Pharmacy", "Astronomy", "Chemistry", "Geology"]
    },
    sleightOfHand: { label: "Sleight of Hand", base: 10 },
    spotHidden: { label: "Spot Hidden", base: 25 },
    stealth: { label: "Stealth", base: 20 },
    survival: {
        label: "Survival",
        base: 10,
        specializations: ["Desert", "Sea", "Arctic"]
    },
    swim: { label: "Swim", base: 20 },
    throw: { label: "Throw", base: 20 },
    track: { label: "Track", base: 10 },
}
