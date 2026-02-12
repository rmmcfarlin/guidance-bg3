import { type PartyMember } from "../components/class-generators/party-selector-menu"
import type { Bg3BackgroundId } from "./bg3-backgrounds"

interface Race {
  name: string
  subraces: Record<string, { name: string }>
}

export const Bg3_Races: Record<string, Race>= {
    "human": {
        "name": "Human",
        "subraces": {}
    }, 
    "elf": {
        "name": "Elf",
        "subraces": {
            "high-elf": { "name": "High Elf"},
            "wood-elf": { "name": "Wood Elf"}
        }
    },
     "half-elf": {
        "name": "Half Elf",
        "subraces": {
            "high-half": { "name": "High Half-Elf"},
            "wood-half": { "name": "Wood Half-Elf"},
            "drow-half": { "name": "Drow Half-Elf"}
        }
    },
    "drow": {
        "name": "Drow",
        "subraces": {
            "lolth-sworn": { "name": "Lolth-Sworn Drow"},
            "seldarine": { "name": "Seldarine Drow"}
        }
    },
    "dwarf": {
        "name": "Dwarf",
        "subraces": {
            "gold": { "name": "Gold Dwarf"},
            "shield": { "name": "Shield Dwarf"},
            "duergar": { "name": "Duergar"}
        }
    },
    "gnome": {
        "name": "Gnome",
        "subraces": {
            "rock": { "name": "Rock Gnome"},
            "forest": { "name": "Forest Gnome"},
            "deep": { "name": "Deep Gnome"}
        }
    },
    "tiefling": {
        "name": "Tiefling",
        "subraces": {
            "asmodeus": { "name": "Asmodeus Tiefling"},
            "mephistopheles": { "name": "Mephistopheles Tiefling"},
            "zariel": { "name": "Zariel Tiefling"},
        }
    },
    "githyanki": {
        "name": "Githyanki",
        "subraces": {}
    },
    "dragonborn": {
        "name": "Dragonborn",
        "subraces": {
            "black": { "name": "Black Dragonborn"},
            "blue": { "name": "Blue Dragonborn"},
            "brass": { "name": "Brass Dragonborn"},
            "bronze": { "name": "Bronze Dragonborn"},
            "copper": { "name": "Copper Dragonborn"},
            "gold": { "name": "Gold Dragonborn"},
            "green": { "name": "Green Dragonborn"},
            "red": { "name": "Red Dragonborn"},
            "silver": { "name": "Silver Dragonborn"},
            "white": { "name": "White Dragonborn"}
        }
    },
    "half-orc": {
        "name": "Half-Orc",
        "subraces": {}
    },
    "halfling": {
        "name": "Halfling",
        "subraces": {
            "strongheart": { "name": "Strongheart Halfling"},
            "lightfoot": { "name": "Lightfoot Halfling"}
        }
    }
} as const

export type Bg3RaceId = keyof typeof Bg3_Races
export type Bg3SubraceId <C extends Bg3RaceId> = keyof typeof Bg3_Races[C]["subraces"]
export type Bg3PlayableRaceId =
  | Bg3RaceId
  | AllSubraceIds

type AllSubraceIds = {
  [R in Bg3RaceId]: keyof typeof Bg3_Races[R]["subraces"]
}[Bg3RaceId]


export interface CompanionBackground {
    raceId: Bg3PlayableRaceId
    raceName: string
    backgroundId: Bg3BackgroundId
    backgroundName: string
}

export const companionBackgrounds: Record<PartyMember, CompanionBackground> = {
    "Astarion": {
        "raceId": "high-elf",
        "raceName": "High Elf",
        "backgroundId": "charlatan",
        "backgroundName": "Charlatan"
    },
    "Gale": {
        "raceId": "human",
        "raceName": "Human",
        "backgroundId": "sage",
        "backgroundName": "Sage"
    },
    "Laezel": {
        "raceId": "githyanki",
        "raceName": "Githyanki",
        "backgroundId": "soldier",
        "backgroundName": "Soldier"
    },
    "Karlach": {
        "raceId": "zariel",
        "raceName": "Zariel Tiefling",
        "backgroundId": "outlander",
        "backgroundName": "Outlander"
    },
    "Shadowheart": {
        "raceId": "half-high",
        "raceName": "High Half-Elf",
        "backgroundId": "acolyte",
        "backgroundName": "Acolyte"
    },
    "Wyll": {
        "raceId": "human",
        "raceName": "Human",
        "backgroundId": "folk-hero",
        "backgroundName": "Folk Hero"
    },
    "Minthara": {
        "raceId": "lolth",
        "raceName": "Lolth Sworn Drow",
        "backgroundId": "noble",
        "backgroundName": "Noble"
    },
    "Jaheira": {
        "raceId": "high-half",
        "raceName": "High Half-Elf",
        "backgroundId": "soldier",
        "backgroundName": "Soldier"
    },
    "Minsc": {
        "raceId": "human",
        "raceName": "Human",
        "backgroundId": "folk-hero",
        "backgroundName": "Folk Hero"
    }, 
    "Halsin": {
        "raceId": "wood-elf",
        "raceName": "Wood Elf",
        "backgroundId": "outlander",
        "backgroundName": "Outlander"
    }, 
    "Durge": {
        "raceId": "white",
        "raceName": "White Dragonborn",
        "backgroundId": "haunted-one",
        "backgroundName": "Haunted One"
    },
    "Tav": {
        "raceId": "high-elf",
        "raceName": "High Elf",
        "backgroundId": "charlatan",
        "backgroundName": "Charlatan"
    }
}