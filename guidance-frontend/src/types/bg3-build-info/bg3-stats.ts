export type Ability = 
    "strength"|
    "dexterity"|
    "constitution"|
    "intelligence"|
    "wisdom"|
    "charisma"

export type AbilityStats = Record<Ability, number>

export const defaultStats: AbilityStats = {
  strength: 10,
  dexterity: 10,
  constitution: 10,
  intelligence: 10,
  wisdom: 10,
  charisma: 10,
}

   
