export const BASE_CHARACTERISTICS = {
  str: { label: "STR" },
  dex: { label: "DEX" },
  int: { label: "INT" },
  con: { label: "CON" },
  app: { label: "APP" },
  pow: { label: "POW" },
  siz: { label: "SIZ" },
  edu: { label: "EDU" },
} as const

export type CharacteristicKey = keyof typeof BASE_CHARACTERISTICS

export const CHARACTERISTIC_KEYS = Object.keys(BASE_CHARACTERISTICS) as CharacteristicKey[]

// point-buy do charakterystyk (gracz przypisuje każdą wartość do jednej charakterystyki)
export const CHARACTERISTIC_POINT_BUY_VALUES = [40, 50, 50, 50, 60, 60, 70, 80] as const

export type Characteristics = Record<CharacteristicKey, number>

export type DerivedStats = {
  hp: number
  mp: number
  sanity: number
  moveRate: number
}

export function emptyCharacteristics(): Characteristics {
  return CHARACTERISTIC_KEYS.reduce((acc, key) => {
    acc[key] = 0
    return acc
  }, {} as Characteristics)
}

export function calculateDerivedStats(chars: Characteristics): DerivedStats {
  const { con, siz, pow, str, dex } = chars

  const hp = Math.floor((con + siz) / 10)
  const mp = Math.floor(pow / 5)
  const sanity = pow

  let moveRate = 7
  if (str >= siz || dex >= siz) moveRate = 8
  if (str > siz && dex > siz) moveRate = 9

  return { hp, mp, sanity, moveRate }
}