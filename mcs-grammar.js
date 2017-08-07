CodeMirror.defineSimpleMode("mcs", {
    start: [
        // Group, Functions, Macros
        {
            regex: /(group|macro|function)(\s+)([\w\d$_-]*)/,
            token: ["keyword", null, "variable-2"]
        },
        // Basic keywords
        {
            regex: /(?:var|return|if|foreach|for|else|in)/,
            token: "keyword"
        },
        // Execute
        {
            regex: /(\s*)(execute)(\s+)(@[apers](?:\[[a-zA-Z0-9_=,!$]*?\]+)?)(\s+)((?:[~\d.-]+\s){3})/,
            token: [null, "keyword", null, "variable-3", null, "variable-3"]
        },
        // Variables
        {
            regex: /(\$[\w\-]*)/,
            token: ["variable"]
        },
        {
            regex: /(@!namespace)/,
            token: "keyword",
            sol: true
        },
        // Selectors
        {
            regex: /@[apers](\[[a-zA-Z0-9_=,!${}]*?\]+)?/,
            token: ["variable-3"]
        },
        // Comments
        {
            regex: /\s*#.*/,
            token: ["comment"],
            sol: true
        },
        {
            regex: /\s*\/\/.*/,
            token: ["comment"]
        },
        // Numbers
        {
            regex: /\b[0-9\.\-]+\b/,
            token: ["number"]
        },
        {
            regex: /(?:item|xp_orb|leash_knot|painting|item_frame|armor_stand|ender_crystal|egg|arrow|snowball|fireball|small_fireball|ender_pearl|eye_of_ender_signal|potion|xp_bottle|wither_skull|fireworks_rocket|tnt|falling_block|commandblock_minecart|boat|minecart|chest_minecart|furnace_minecart|tnt_minecart|hopper_minecart|spawner_minecart|creeper|skeleton|spider|giant|zombie|slime|ghast|zombie_pigman|enderman|cave_spider|silverfish|blaze|magma_cube|ender_dragon|wither|witch|endermite|guardian|shulker|rabbit|bat|pig|sheep|cow|chicken|squid|wolf|mooshroom|snowman|ocelot|villager_golem|horse|villager)\b/,
            token: "property"
        },
        {
            regex: /\/?(?:achievement|blockdata|clear|clone|debug|defaultgamemode|difficulty|effect|enchant|entitydata|execute|fill|gamemode|gamerule|give|help|me|particle|playsound|stopsound|publish|replaceitem|say|scoreboard|seed|setblock|setscore|setworldspawn|spawnpoint|spreadplayers|stats|summon|tell|tellraw|testfor|testforblock|testforblocks|time|title|toggledownfall|tp|trigger|weather|whitelist|worldborder|xp|teleport|kill)\b/,
            token: "command"
        },
        {
            regex: /([a-zA-Z0-9]+)(?=\s*\(.*)/,
            token: "variable"
        },
        // Custom variables
        {
            regex: /(\=|\+\=|\-\=|\*\=|\/\=|\%\=|\+\+|\-\-|\*|\/|\+|\-|\%|\>|\<|\>\=|\<\=)/,
            token: ["operator"]
        },
        {
            regex: /true|false|null|undefined/,
            token: "atom"
        },
        {
            regex: /"(?:[^\\]|\\.)*?"/,
            token: "string"
        },
        {
            regex: /[\{\[\(]/,
            indent: true
        },
        {
            regex: /[\}\]\)]/,
            dedent: true
        },
        {
            regex: /(?:\w+)/
        }
    ],
    meta: {
        dontIndentStates: ["comment"],
        lineComment: "//"
    }
});
