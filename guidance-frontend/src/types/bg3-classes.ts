interface Class {
  name: string
  subclasses: Record<string, {name: string}>
}

export const BG3_Classes: Record<string, Class> = {
    "barbarian": {
      "name": "Barbarian",
      "subclasses": {
        "berserker": { "name": "Berserker" },
        "giant": { "name": "Giant" },
        "wild-heart": { "name": "Wild Heart" },
        "wild-magic-uniquifier": { "name": "Wild Magic" }
      }
    },
    "bard": {
      "name": "Bard",
      "subclasses": {
        "college-of-lore": { "name": "College of Lore" },
        "college-of-glamour": { "name": "College of Glamour" },
        "college-of-swords": { "name": "College of Swords" },
        "college-of-valor": { "name": "College of Valor" }
      }
    },
    "cleric": {
      "name": "Cleric",
      "subclasses": {
        "death": { "name": "Death Domain" },
        "knowledge": { "name": "Knowledge Domain" },
        "life": { "name": "Life Domain" },
        "light": { "name": "Light Domain" },
        "nature": { "name": "Nature Domain" },
        "tempest": { "name": "Tempest Domain" },
        "trickery": { "name": "Trickery Domain" },
        "war": { "name": "War Domain" }
      }
    },
    "druid": {
      "name": "Druid",
      "subclasses": {
        "circle-of-the-land": { "name": "Circle of the Land" },
        "circle-of-the-moon": { "name": "Circle of the Moon" },
        "circle-of-spores": { "name": "Circle of Spores" },
        "circle-of-stars": { "name": "Circle of Stars"}
      }
    },
    "fighter": {
      "name": "Fighter",
      "subclasses": {
        "arcane-archer": { "name": "Arcane Archer"},
        "battle-master": { "name": "Battle Master" },
        "champion": { "name": "Champion" },
        "eldritch-knight": { "name": "Eldritch Knight" }
      }
    },
    "monk": {
      "name": "Monk",
      "subclasses": {
        "way-of-the-drunken-master": { "name": "Way of the Drunken Master"},
        "way-of-the-four-elements": { "name": "Way of the Four Elements" },
        "way-of-the-open-hand": { "name": "Way of the Open Hand" },
        "way-of-the-shadow": { "name": "Way of Shadow" }
      }
    },
    "paladin": {
      "name": "Paladin",
      "subclasses": {
        "oath-of-the-ancients": { "name": "Oath of the Ancients" },
        "oath-of-the-crown": { "name": "Oath of the Crown" },
        "oath-of-devotion": { "name": "Oath of Devotion" },
        "oath-of-vengeance": { "name": "Oath of Vengeance" },
        "oathbreaker": { "name": "Oathbreaker"}
      }
    },
    "ranger": {
      "name": "Ranger",
      "subclasses": {
        "beast-master": { "name": "Beast Master" },
        "gloom-stalker": { "name": "Gloom Stalker" },
        "hunter": { "name": "Hunter" },
        "swarmkeeper": { "name": "Swarmkeeper" }
      }
    },
    "rogue": {
      "name": "Rogue",
      "subclasses": {
        "arcane-trickster": { "name": "Arcane Trickster" },
        "assassin": { "name": "Assassin" },
        "swashbuckler": { "name": "Swashbuckler" },
        "thief": { "name": "Thief" }
      }
    },
    "sorcerer": {
      "name": "Sorcerer",
      "subclasses": {
        "draconic-bloodline": { "name": "Draconic Bloodline" },
        "shadow-magic": { "name": "Shadow Magic"},
        "storm-sorcery": { "name": "Storm Sorcery" },
        "wild-magic": { "name": "Wild Magic" }
      }
    },
    "warlock": {
      "name": "Warlock",
      "subclasses": {
        "the-archfey": { "name": "The Archfey" },
        "the-fiend": { "name": "The Fiend" },
        "the-hexblade": { "name": "The Hexblade" },
        "the-great-old-one": { "name": "The Great Old One" }
      }
    },
    "wizard": {
      "name": "Wizard",
      "subclasses": {
        "school-of-abjuration": { "name": "School of Abjuration" },
        "school-of-bladesinging": { "name": "School of Bladesinging" },
        "school-of-conjuration": { "name": "School of Conjuration" },
        "school-of-divination": { "name": "School of Divination" },
        "school-of-enchantment": { "name": "School of Enchantment" },
        "school-of-evocation": { "name": "School of Evocation" },
        "school-of-illusion": { "name": "School of Illusion" },
        "school-of-necromancy": { "name": "School of Necromancy" },
        "school-of-transmutation": { "name": "School of Transmutation" }
      }
    }
  } as const

export type Bg3ClassId = keyof typeof BG3_Classes
export type Bg3SubclassId <C extends Bg3ClassId> = keyof typeof BG3_Classes[C]["subclasses"]

export type AllSubclassIds = {
  [S in Bg3ClassId]: keyof typeof BG3_Classes[S]["subclasses"]
}[Bg3ClassId]