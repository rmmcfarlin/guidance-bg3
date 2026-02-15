import { type Bg3ClassId, type AllSubclassIds } from "./bg3-classes"
import { type Bg3RaceId, type AllSubraceIds } from "./bg3-races"
import { type Bg3BackgroundId } from "./bg3-backgrounds"
import { type Weapons } from "./bg3-build-info/bg3-weapons/bg3-weapons"
import { type Gear } from "./bg3-build-info/bg3-gear/bg3-gear"
import { type Jewelry } from "./bg3-build-info/bg3-jewelry/bg3-jewelry"
import { type AbilityStats } from "./bg3-build-info/bg3-stats"
import { type Bg3SkillObject } from "./bg3-build-info/bg3-skills"
import { type Bg3SpellId } from "./bg3-build-info/bg3-spells/bg3-spells"

export interface PartyMember { 

characterId: string
displayName: string

// Class //

classId?: Bg3ClassId
subclassId?: AllSubclassIds

// Character //

raceId?: Bg3RaceId | AllSubraceIds
backgroundId?: Bg3BackgroundId

// Build //

weapons?: Weapons
gear?: Gear	
jewelry?: Jewelry
stats?: AbilityStats
	
skills?: Bg3SkillObject[]	
spells?: Bg3SpellId[]
}

// export type PartyMember = Record<string, MemberData>