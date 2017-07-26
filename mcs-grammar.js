CodeMirror.defineSimpleMode("mcs", {
	start: [
		// Function declarations
		{
			regex: /(function)(\s+)([\w]*)/,
			token: ["builtin", null, "variable-2"]
		},
		// Execute
		{
			regex: /(\s*)(execute)(\s+)(@[apers](?:\[[a-zA-Z0-9_=,!$]*?\]+)?)(\s+)((?:[~\d.-]+\s){3})/,
			token: [null, "builtin", null, "variable-3", null, "variable-3"],
			sol: true
		},
		// Variables
		{
			regex: /(\s*)(var)(\s+)([\w\-]*)(\s+)(=)(\s+)/,
			token: [null, "builtin", null, "variable", null, "keyword", null],
			sol: true
		}, {
			regex: /(\s*)(\$[\w\-]*)(\s+)(=)(\s+)/,
			token: [null, "variable", null, "keyword", null],
			sol: true
		}, {
			regex: /(\$[\w\-]*)/,
			token: ["variable"]
		},
		// Selectors
		{
			regex: /@[apers](\[[a-zA-Z0-9_=,!$]*?\]+)?/,
			token: ["variable-3"]
		},
		// Comments
		{
			regex: /\s*#.*/,
			token: ["comment"],
			sol: true
		}, {
			regex: /\s*\/\/.*/,
			token: ["comment"],
			sol: true
		},
		// Numbers
		{
			regex: /\b[0-9\.\-]+\b/,
			token: ["number"]
		}, {
			regex: /(?:item|xp_orb|leash_knot|painting|item_frame|armor_stand|ender_crystal|egg|arrow|snowball|fireball|small_fireball|ender_pearl|eye_of_ender_signal|potion|xp_bottle|wither_skull|fireworks_rocket|tnt|falling_block|commandblock_minecart|boat|minecart|chest_minecart|furnace_minecart|tnt_minecart|hopper_minecart|spawner_minecart|creeper|skeleton|spider|giant|zombie|slime|ghast|zombie_pigman|enderman|cave_spider|silverfish|blaze|magma_cube|ender_dragon|wither|witch|endermite|guardian|shulker|rabbit|bat|pig|sheep|cow|chicken|squid|wolf|mooshroom|snowman|ocelot|villager_golem|horse|villager)\b/,
			token: "property"
		}, {
			regex: /\/?(?:achievement|blockdata|clear|clone|debug|defaultgamemode|difficulty|effect|enchant|entitydata|execute|fill|gamemode|gamerule|give|help|me|particle|playsound|stopsound|publish|replaceitem|say|scoreboard|seed|setblock|setscore|setworldspawn|spawnpoint|spreadplayers|stats|summon|tell|tellraw|testfor|testforblock|testforblocks|time|title|toggledownfall|tp|trigger|weather|whitelist|worldborder|xp|teleport|kill)\b/,
			token: "atom"
		}, {
			regex: /([a-zA-Z0-9]+)(?=\s*\(.*)/,
			token: "variable"
		},
		// Custom variables
		{
			regex: /(\=|\+\=|\-\=|\*\=|\/\=|\%\=|\+\+|\-\-|\*|\/|\+|\-|\%|\>|\<|\>\=|\<\=)/,
			token: ["operator"]
		}, {
			regex: /"(?:[^\\]|\\.)*?"/,
			token: "string"
		}, {
			regex: /(?:\w+)/
		}
	],
	meta: {
		dontIndentStates: ["comment"],
		lineComment: "//"
	}
});
