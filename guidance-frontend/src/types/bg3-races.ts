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
            "high-half-elf": { "name": "High Half-Elf"},
            "wood-half-elf": { "name": "Wood Half-Elf"},
            "drow-half-elf": { "name": "Drow Half-Elf"}
        }
    },
    "drow": {
        "name": "Drow",
        "subraces": {
            "lolth-sworn-drow": { "name": "Lolth-Sworn Drow"},
            "seldarine-drow": { "name": "Seldarine Drow"}
        }
    },
    "dwarf": {
        "name": "Dwarf",
        "subraces": {
            "gold-dwarf": { "name": "Gold Dwarf"},
            "shield-dwarf": { "name": "Shield Dwarf"},
            "duergar": { "name": "Duergar"}
        }
    },
    "gnome": {
        "name": "Gnome",
        "subraces": {
            "rock-gnome": { "name": "Rock Gnome"},
            "forest-gnome": { "name": "Forest Gnome"},
            "deep-gnome": { "name": "Deep Gnome"}
        }
    },
    "tiefling": {
        "name": "Tiefling",
        "subraces": {
            "asmodeus-tiefling": { "name": "Asmodeus Tiefling"},
            "mephistopheles-tiefling": { "name": "Mephistopheles Tiefling"},
            "zariel-tiefling": { "name": "Zariel Tiefling"},
        }
    },
    "githyanki": {
        "name": "Githyanki",
        "subraces": {}
    },
    "dragonborn": {
        "name": "Dragonborn",
        "subraces": {
            "black-dragonborn": { "name": "Black Dragonborn"},
            "blue-dragonborn": { "name": "Blue Dragonborn"},
            "brass-dragonborn": { "name": "Brass Dragonborn"},
            "bronze-dragonborn": { "name": "Bronze Dragonborn"},
            "copper-dragonborn": { "name": "Copper Dragonborn"},
            "gold-dragonborn": { "name": "Gold Dragonborn"},
            "green-dragonborn": { "name": "Green Dragonborn"},
            "red-dragonborn": { "name": "Red Dragonborn"},
            "silver-dragonborn": { "name": "Silver Dragonborn"},
            "white-dragonborn": { "name": "White Dragonborn"}
        }
    },
    "half-orc": {
        "name": "Half-Orc",
        "subraces": {}
    },
    "halfling": {
        "name": "Halfling",
        "subraces": {
            "strongheart-halfling": { "name": "Strongheart Halfling"},
            "lightfoot-halfling": { "name": "Lightfoot Halfling"}
        }
    }
} as const

export type Bg3RaceId = keyof typeof Bg3_Races
export type Bg3SubraceId <C extends Bg3RaceId> = keyof typeof Bg3_Races[C]["subraces"]
export type Bg3PlayableRaceId =
  | Bg3RaceId
  | AllSubraceIds

export type AllSubraceIds = {
  [R in Bg3RaceId]: keyof typeof Bg3_Races[R]["subraces"]
}[Bg3RaceId]


export interface CompanionBackground {
    raceId: Bg3PlayableRaceId
    raceName: string
    backgroundId: Bg3BackgroundId
    backgroundName: string
}

export const companionBackgrounds: Record<string, CompanionBackground> = {
    "astarion": {
        "raceId": "high-elf",
        "raceName": "High Elf",
        "backgroundId": "charlatan",
        "backgroundName": "Charlatan"
    },
    "gale": {
        "raceId": "human",
        "raceName": "Human",
        "backgroundId": "sage",
        "backgroundName": "Sage"
    },
    "laezel": {
        "raceId": "githyanki",
        "raceName": "Githyanki",
        "backgroundId": "soldier",
        "backgroundName": "Soldier"
    },
    "karlach": {
        "raceId": "zariel-tiefling",
        "raceName": "Zariel Tiefling",
        "backgroundId": "outlander",
        "backgroundName": "Outlander"
    },
    "shadowheart": {
        "raceId": "high-half-elf",
        "raceName": "High Half-Elf",
        "backgroundId": "acolyte",
        "backgroundName": "Acolyte"
    },
    "wyll": {
        "raceId": "human",
        "raceName": "Human",
        "backgroundId": "folk-hero",
        "backgroundName": "Folk Hero"
    },
    "minthara": {
        "raceId": "lolth-sworn-drow",
        "raceName": "Lolth Sworn Drow",
        "backgroundId": "noble",
        "backgroundName": "Noble"
    },
    "jaheira": {
        "raceId": "half-high-elf",
        "raceName": "High Half-Elf",
        "backgroundId": "soldier",
        "backgroundName": "Soldier"
    },
    "minsc": {
        "raceId": "human",
        "raceName": "Human",
        "backgroundId": "folk-hero",
        "backgroundName": "Folk Hero"
    }, 
    "halsin": {
        "raceId": "wood-elf",
        "raceName": "Wood Elf",
        "backgroundId": "outlander",
        "backgroundName": "Outlander"
    }, 
    "durge": {
        "raceId": "white-dragonborn",
        "raceName": "White Dragonborn",
        "backgroundId": "haunted-one",
        "backgroundName": "Haunted One"
    }
}