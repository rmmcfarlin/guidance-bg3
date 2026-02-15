import { type Ability } from "./bg3-stats"

export type Bg3Skill = 
    "athletics"|
    "acrobatics"|
    "sleight-of-hand"|
    "stealth"|
    "arcana"|
    "history"|
    "investigation"|
    "nature"|
    "religion"|
    "animal-handling"|
    "insight"|
    "medicine"|
    "perception"|
    "survival"|
    "deception"|
    "intimidation"|
    "performance"|
    "persuasion"

export interface Bg3SkillObject {
    skillId: Bg3Skill
    ability: Ability
    tags: string[]
}

export const Bg3_Skills: Record<Bg3Skill, Bg3SkillObject> = {
    "athletics": {
        skillId: "athletics",
        ability: "strength",
        tags: []
    }, 
    "acrobatics": {
        skillId: "acrobatics",
        ability: "strength",
        tags: []
    },
    "sleight-of-hand": {
        skillId: "sleight-of-hand",
        ability: "dexterity",
        tags: []
    },
    "stealth": {
        skillId: "stealth",
        ability: "dexterity",
        tags: []
    },
    "arcana": {
        skillId: "arcana",
        ability: "intelligence",
        tags: []
    },
    "history": {
        skillId: "arcana",
        ability: "intelligence",
        tags: []
    },
    "investigation": {
        skillId: "investigation",
        ability: "intelligence",
        tags: []
    },
    "nature": {
        skillId: "nature",
        ability: "intelligence",
        tags: []
    },
    "religion": {
        skillId: "religion",
        ability: "intelligence",
        tags: []
    },
    "animal-handling": {
        skillId: "animal-handling",
        ability: "wisdom",
        tags: []
    },
    "insight": {
        skillId: "insight",
        ability: "wisdom",
        tags: []
    },
    "medicine": {
        skillId: "medicine",
        ability: "wisdom",
        tags: []
    },
    "perception": {
        skillId: "perception",
        ability: "wisdom",
        tags: []
    },
    "survival": {
        skillId: "survival",
        ability: "wisdom",
        tags: []
    },
    "deception": {
        skillId: "deception",
        ability: "charisma",
        tags: []
    },
    "intimidation": {
        skillId: "intimidation",
        ability: "charisma",
        tags: []
    },
    "performance": {
        skillId: "performance",
        ability: "charisma",
        tags: []
    },
    "persuasion": {
        skillId: "persuasion",
        ability: "charisma",
        tags: []
    }
}