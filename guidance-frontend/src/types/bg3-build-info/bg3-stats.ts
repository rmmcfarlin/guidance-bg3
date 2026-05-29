import { type Bg3ClassId } from "../bg3-classes"

export type Ability = 
    "strength"|
    "dexterity"|
    "constitution"|
    "intelligence"|
    "wisdom"|
    "charisma"

export type AbilityStats = Record<Ability, number>

export const defaultStats: AbilityStats = {
  strength: 8,
  dexterity: 8,
  constitution: 8,
  intelligence: 8,
  wisdom: 8,
  charisma: 8
}

export const recommendedStats: Record<Bg3ClassId, AbilityStats> = {
  'barbarian': { strength: 17, dexterity: 14, constitution: 15, intelligence: 8,  wisdom: 12, charisma: 8 },
  'bard':      { strength: 10, dexterity: 14, constitution: 16, intelligence: 8,  wisdom: 12, charisma: 16 },
  'cleric':    { strength: 10, dexterity: 14, constitution: 16, intelligence: 8,  wisdom: 17, charisma: 10 },
  'druid':     { strength: 8,  dexterity: 14, constitution: 16, intelligence: 10, wisdom: 17, charisma: 8  },
  'fighter':   { strength: 17, dexterity: 14, constitution: 16, intelligence: 8,  wisdom: 10, charisma: 8  },
  'monk':      { strength: 8,  dexterity: 17, constitution: 14, intelligence: 8,  wisdom: 16, charisma: 8  },
  'paladin':   { strength: 17, dexterity: 10, constitution: 14, intelligence: 8,  wisdom: 10, charisma: 16 },
  'ranger':    { strength: 8,  dexterity: 17, constitution: 14, intelligence: 8,  wisdom: 14, charisma: 10 },
  'rogue':     { strength: 8,  dexterity: 17, constitution: 14, intelligence: 10, wisdom: 12, charisma: 12 },
  'sorcerer':  { strength: 8,  dexterity: 14, constitution: 16, intelligence: 10, wisdom: 10, charisma: 17 },
  'warlock':   { strength: 8,  dexterity: 14, constitution: 16, intelligence: 10, wisdom: 10, charisma: 17 },
  'wizard':    { strength: 8,  dexterity: 14, constitution: 16, intelligence: 17, wisdom: 10, charisma: 10 }
}

export type BonusObject = {plusOne: Ability, plusTwo: Ability}

export const recommendedBonuses: Record<Bg3ClassId, BonusObject> = {
  'barbarian': { plusOne: 'constitution', plusTwo: 'strength'},
  'bard':      { plusOne: 'constitution', plusTwo: 'charisma' },
  'cleric':    { plusOne: 'constitution', plusTwo: 'wisdom' },
  'druid':     { plusOne: 'constitution', plusTwo: 'wisdom'},
  'fighter':   { plusOne: 'constitution', plusTwo: 'strength'},
  'monk':      { plusOne: 'wisdom', plusTwo: 'dexterity'},
  'paladin':   { plusOne: 'charisma', plusTwo: 'strength'},
  'ranger':    { plusOne: 'wisdom', plusTwo: 'dexterity'},
  'sorcerer':  { plusOne: 'constitution', plusTwo: 'charisma'},
  'warlock':   { plusOne: 'constitution', plusTwo: 'charisma'},
  'wizard':    { plusOne: 'constitution', plusTwo: 'intelligence'}
}

   
