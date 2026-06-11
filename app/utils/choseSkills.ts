import { BASE_SKILLS } from "@/app/consts/character"
import { OccupationSkill } from "@/app/consts/occupations"

function renderSkill(s: OccupationSkill) {
  if (typeof s === "string") 
    return BASE_SKILLS[s].label                          // "History"
  if ("specialization" in s) 
    return `${BASE_SKILLS[s.skill].label} (${s.specialization})`  // "Art/Craft (Photography)"
  if ("choose" in s) 
    return `Choose ${s.choose} from: ${s.from === "any" ? "any" : s.from.join(", ")}`
}
