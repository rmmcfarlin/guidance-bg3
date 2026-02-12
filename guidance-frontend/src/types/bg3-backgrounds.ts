export const Bg3_Backgrounds = {
    "acolyte": {
        "name": "Acolyte"
    },
    "charlatan": {
        "name": "Charlatan"
    },
    "criminal": {
        "name": "Criminal"
    },
    "entertainer": {
        "name": "Entertainer"
    },
    "folk-hero": {
        "name": "Folk Hero"
    },
    "guild-artisan": {
        "name": "Guild Artisan"
    },
    "haunted-one": {
        "name": "Haunted One"
    },
    "noble": {
        "name": "Noble"
    },
    "outlander": {
        "name": "Outlander"
    },
    "sage": {
        "name": "Sage"
    },
    "soldier": {
        "name": "Soldier"
    },
    "urchin": {
        "name": "Urchin"
    }
} as const

export type Bg3BackgroundId = keyof typeof Bg3_Backgrounds