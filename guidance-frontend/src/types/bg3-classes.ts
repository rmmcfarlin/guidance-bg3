export const BG3_Classes = {
  "classes": {
    "barbarian": {
      "name": "Barbarian",
      "subclasses": {
        "berserker": { "name": "Berserker" },
        "giant": { "name": "Giant" },
        "wild-heart": { "name": "Wild Heart" },
        "wild-magic-barbarian": { "name": "Wild Magic" }
      }
    },
    "bard": {
      "name": "Bard",
      "subclasses": {
        "lore": { "name": "College of Lore" },
        "glamour": { "name": "College of Glamour" },
        "swords": { "name": "College of Swords" },
        "valor": { "name": "College of Valor" }
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
        "land": { "name": "Circle of the Land" },
        "moon": { "name": "Circle of the Moon" },
        "spores": { "name": "Circle of Spores" },
        "stars": { "name": "Circle of Stars"}
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
        "drunk": { "name": "Way of the Drunken Master"},
        "four-elements": { "name": "Way of the Four Elements" },
        "open-hand": { "name": "Way of the Open Hand" },
        "shadow": { "name": "Way of Shadow" }
      }
    },
    "paladin": {
      "name": "Paladin",
      "subclasses": {
        "ancients": { "name": "Oath of the Ancients" },
        "crown": { "name": "Oath of the Crown" },
        "devotion": { "name": "Oath of Devotion" },
        "vengeance": { "name": "Oath of Vengeance" }
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
        "wild-magic-sorcerer": { "name": "Wild Magic" }
      }
    },
    "warlock": {
      "name": "Warlock",
      "subclasses": {
        "archfey": { "name": "The Archfey" },
        "fiend": { "name": "The Fiend" },
        "hexblade": { "name": "The Hexblade" },
        "great-old-one": { "name": "The Great Old One" }
      }
    },
    "wizard": {
      "name": "Wizard",
      "subclasses": {
        "abjuration": { "name": "School of Abjuration" },
        "bladesinging": { "name": "School of Bladesinging" },
        "conjuration": { "name": "School of Conjuration" },
        "divination": { "name": "School of Divination" },
        "enchantment": { "name": "School of Enchantment" },
        "evocation": { "name": "School of Evocation" },
        "illusion": { "name": "School of Illusion" },
        "necromancy": { "name": "School of Necromancy" },
        "transmutation": { "name": "School of Transmutation" }
      }
    }
  }
} as const

export type Bg3ClassId = keyof typeof BG3_Classes.classes
export type Bg3SubclassId <C extends Bg3ClassId> = keyof typeof BG3_Classes.classes[C]["subclasses"]