CodeMirror.defineSimpleMode("command", {

  start: [

    {regex: /"(?:[^\\]|\\.)*?"/, token: "string"},

    // Function declarations
    {regex: /(function)(\s+)([a-zA-Z0-9]*)(\s*\()/,
     token: ["builtin", null, "variable-2"]},

    // Number repeating blocks
    {regex: /(\s*)(instant repeat)(\s+)([0-9]+)(\s+)(times)/,
     token: [null, "keyword", null, "number", null, "keyword"], sol: true},
    {regex: /(\s*)(repeat)(\s+)([0-9]+)(\s+)(times)/,
     token: [null, "keyword", null, "number", null, "keyword"], sol: true},
    // Named repeating blocks
    {regex: /(\s*)(repeat)(\s+)([a-zA-Z0-9]*)(\s*:\s*off)/,
     token: [null, "keyword", null, "variable", "variable-2"], sol: true},

    {regex: /(\s*)(repeat)(\s+)([a-zA-Z0-9]*)/,
     token: [null, "keyword", null, "variable"], sol: true},

    {regex: /@[apers](\[[a-zA-Z0-9_=,!$]*?\]+)?/,
     token: ["variable-3"]},

    {regex: /\s*#.*/,
     token: ["comment"], sol: true},
    {regex: /\s*\/\/.*/,
     token: ["comment"], sol: true},

    {regex: /\b[0-9.]+\b/,
     token: ["number"]},

    {regex: /\$_[a-zA-Z0-9_]+/,
     token: ["number-2"]},
    {regex: /\$[a-zA-Z0-9_]+/,
     token: ["number"]},

    {regex: /(?:item|xp_orb|leash_knot|painting|item_frame|armor_stand|ender_crystal|egg|arrow|snowball|fireball|small_fireball|ender_pearl|eye_of_ender_signal|potion|xp_bottle|wither_skull|fireworks_rocket|tnt|falling_block|commandblock_minecart|boat|minecart|chest_minecart|furnace_minecart|tnt_minecart|hopper_minecart|spawner_minecart|creeper|skeleton|spider|giant|zombie|slime|ghast|zombie_pigman|enderman|cave_spider|silverfish|blaze|magma_cube|ender_dragon|wither|witch|endermite|guardian|shulker|rabbit|bat|pig|sheep|cow|chicken|squid|wolf|mooshroom|snowman|ocelot|villager_golem|horse|villager)\b/,
      token: "property" },

    {regex: /\/?(?:achievement|blockdata|clear|clone|debug|defaultgamemode|difficulty|effect|enchant|entitydata|execute|fill|gamemode|gamerule|give|help|me|particle|playsound|stopsound|publish|replaceitem|say|scoreboard|seed|setblock|setscore|setworldspawn|spawnpoint|spreadplayers|stats|summon|tell|tellraw|testfor|testforblock|testforblocks|time|title|toggledownfall|tp|trigger|weather|whitelist|worldborder|xp|teleport|kill)\b/,
      token: "atom"},

    // {regex: /^(move)/,
    //  token: "keyword"},
    // {regex: /^(towards)/,
    //  token: "keyword"},
    // {regex: /^(from)/,
    //  token: "keyword"},

    // 'instant' keyword:
    {regex: /(\s*)(instant repeat)/,
     token: [null, "keyword"], sol: true},
    {regex: /(\s*)(instant )([a-zA-Z0-9]+)\s*\(.*\)/,
     token: [null, "keyword", "variable", null], sol: true},

    {regex: /(\s*)(start)(\s+)([a-zA-Z0-9]+)/,
     token: [null, "keyword", null, "variable"]},
    {regex: /(\s*)(stop)(\s+)([a-zA-Z0-9]+)/,
     token: [null, "keyword", null, "variable"]},

    {regex: /(?:^\s*(delay|if|repeat))\b/,
     token: "keyword"},

    {regex: /\b(?:or|and)\b/,
     token: ["keyword"]},

    {regex: /([}]*)(else)\b/,
     token: [null, "keyword"]},

    {regex: /([a-zA-Z0-9]+)(?=\s*\(.*)/,
     token: "variable"},

     // Custom variables
    {regex: /(\=|\+\=|\-\=|\*\=|\/\=|\%\=|\+\+|\-\-|\*|\/|\+|\-|\%|\>|\<|\>\=|\<\=)/,
     token: ["keyword"]},

    {regex: /(?:\w+)/}
  ],

  // The multi-line comment state.
  comment: [
    {regex: /.*?\*\//, token: "comment", next: "start"},
    {regex: /.*/, token: "comment"}
  ],

  meta: {
    dontIndentStates: ["comment"],
    lineComment: "//"
  }
});
