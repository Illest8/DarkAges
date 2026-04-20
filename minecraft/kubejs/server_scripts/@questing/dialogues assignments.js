// kubejs/server_scripts/dialogs.js

// ---------------------------------------------------------------------------
// Dialog configuration — fully $check()-driven
// ---------------------------------------------------------------------------
// Each rule can have:
//   name: { match, type }   // optional name match
//   checks: [ { type, args... } ] // passed directly to $check()
//   dialog: string          // dialog ID to show
//   skip: boolean           // optional skip flag
//
// $check() types supported: data, dataHigher, dataLower, quest, stage, item
// ---------------------------------------------------------------------------

const mobDialogs = [
  {
    type: 'darkages:noble',
    dialogs: {
      // default: 'profession',
      rules: [
        { checks: [{ type: 'quest', args: ['guild_intro'] }], dialog: 'noble_welcome' },
        { name: { match: 'Scholar', type: 'contains' }, dialog: 'scholar_generic' },

        { name: { match: 'Suspicious Man', type: 'exact' }, dialog: 'drinks' },
        {
          name: { match: 'Figaro', type: 'contains' },
          dialog: 'crier'
        },
        {
          name: { match: 'Warden', type: 'contains' },
          checks: [{ type: 'quest', args: ['2C9825E26EDCC627'] }],
          dialog: 'prison_warden_leave_prison'
        },
        {
          name: { match: 'Warden', type: 'contains' },
          checks: [{ type: 'quest', args: ['06556EC1F36A6D8C'] }],
          dialog: 'prison_warden_generic'
        },
        {
          name: { match: 'Warden', type: 'contains' },
          dialog: 'prison_warden_greet'
        },
        {
          checks: [{ type: 'structure', args: ['minecraft:village_plains'] }],
          dialog: 'solen_housecarl'
        }
      ]
    }
  },
  {
    type: 'darkages:woman',
    dialogs: {
      rules: [
        {
          name: { match: 'Rivanna', type: 'contains' },
          checks: [
            {
              type: 'quest',
              args: ['10488DB630AC2E65']
            },
            {
              type: 'quest',
              args: ['295450B19A7DC6FA', true]
            }
          ],
          dialog: 'verden_rivanna_darktower'
        },
        {
          name: { match: 'Thalor Woman', type: 'contains' },
          dialog: 'thalor_woman'
        },
        {
          name: { match: 'Rivanna', type: 'contains' },
          checks: [
            {
              type: 'quest',
              args: ['03C401979FDE5B80']
            },
            {
              type: 'quest',
              args: ['76316717D51AB960', true]
            }
          ],
          dialog: 'verden_rivanna_darktower-complete'
        },
        {
          name: { match: 'Rivanna', type: 'contains' },
          dialog: 'verden_rivanna'
        }
      ]
    }
  },
  {
    type: 'darkages:blacksmith',
    dialogs: {
      rules: [
        {
          checks: [
            {
              type: 'structure',
              args: ['darkages:overworld/verden']
            },
            {
              type: 'dataLower',
              args: ['reputation', -100]
            }
          ],
          dialog: 'verden_deny'
        },
        {
          checks: [
            {
              type: 'structure',
              args: ['darkages:overworld/verden']
            },
            {
              type: 'quest',
              args: ['162CB5FA587A5C38', true]
            }
          ],
          dialog: 'verden_blacksmith_generic'
        }
      ]
    }
  },
  {
    type: 'darkages:friar',
    dialogs: {
      default: 'first_tutorial'
    }
  },
  {
    type: 'darkages:general',
    dialogs: {
      default: 'general_greet',
      rules: [
        { checks: [{ type: 'quest', args: ['fim'] }], dialog: 'general' },
        { name: { match: 'Warrior Leader', type: 'contains' }, dialog: 'join_warrior_guild' }
      ]
    }
  },
  {
    type: 'darkages:guard',
    dialogs: {
      default: 'guard_basic',
      rules: [
        {
          checks: [
            {
              type: 'structure',
              args: ['darkages:overworld/prison']
            },
            {
              type: 'quest',
              args: ['06556EC1F36A6D8C', true]
            }
          ],
          dialog: 'prison_guard_generic'
        }
      ]
    }
  },
  {
    type: 'darkages:wise_man',
    dialogs: {
      rules: [
        {
          checks: [
            {
              type: 'structure',
              args: ['minecraft:village_plains']
            }
          ],
          dialog: 'town_wise-man'
        }
      ]
    }
  }
];

// ---------------------------------------------------------------------------
// Utility helpers
// ---------------------------------------------------------------------------
function getEntityName(entity) {
  return String(entity.getName());
}

function matchesNameRule(name, rule) {
  const type = rule.type || 'exact';
  if (type === 'exact') return name === rule.match;
  if (type === 'contains') return name.includes(rule.match);
  if (type === 'regex') {
    try {
      return new RegExp(rule.match, rule.flags || '').test(name);
    } catch (e) {
      return false;
    }
  }
  return false;
}

// ---------------------------------------------------------------------------
// Unified rule matcher using $check()
// ---------------------------------------------------------------------------
function ruleMatches(player, entityName, rule) {
  // Name check (optional)
  if (rule.name && !matchesNameRule(entityName, rule.name)) return false;

  // Condition checks (optional)
  if (Array.isArray(rule.checks) && typeof global.$check === 'function') {
    for (const c of rule.checks) {
      // c.args is an array of arguments after type
      if (!global.$check.apply(null, [c.type, player].concat(c.args || []))) {
        return false;
      }
    }
  }

  return true;
}

// ---------------------------------------------------------------------------
// Dialog selector
// ---------------------------------------------------------------------------
function selectDialogId(config, player, entityName) {
  const d = config.dialogs || {};

  if (Array.isArray(d.rules)) {
    for (const rule of d.rules) {
      if (ruleMatches(player, entityName, rule)) {
        return { dialog: rule.dialog, skip: !!rule.skip };
      }
    }
  }

  if (typeof d.default === 'string') {
    return { dialog: d.default, skip: false };
  }

  return { dialog: null, skip: false };
}

// ---------------------------------------------------------------------------
// Event listener
// ---------------------------------------------------------------------------
ItemEvents.entityInteracted(event => {
  const entity = event.target;
  const player = event.player;
  if (event.getHand && event.getHand() === 'off_hand') return;

  if (entity.getType() == 'darkages:orc' && !getEntityName(entity).includes('Orc Shaman') && player.hasEffect('darkages:disguise')) {
    player.server.runCommandSilent(`dialog ${player.username} show ${player.username} orc_common`);
  }

  const config = mobDialogs.find(cfg => cfg.type === entity.getType());
  if (!config) return;

  const entityName = getEntityName(entity);
  const choice = selectDialogId(config, player, entityName);

  if (player.potionEffects.getActive().toString().includes('crime')) {
    player.tell(`${entity.getName().getString()}: I will not talk to a criminal.`);
    return;
  }

  if (!choice.skip && choice.dialog) {
    // player.tell(`Starting dialog:  ${choice.dialog}`)
    // console.log(Object.keys(epicfightPatch(player)))
    epicfightPatch(player).toMode('vanilla', true)
    player.server.runCommandSilent(`dialog ${player.username} show ${player.username} ${choice.dialog}`);
  }
});