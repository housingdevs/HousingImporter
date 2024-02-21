export const menus = {
    CHANGE_STAT: {
        action_name: 'Change Player Stat',
        stat: {
            slot: 10,
            default_value: 'Kills',
            type: 'chat_input'
        },
        mode: {
            slot: 11,
            default_value: 'INCREMENT',
            type: 'static_option_select',
            options: [
                'Increment',
                'Decrement',
                'Set',
                'Multiply',
                'Divide'
            ]
        },
        amount: {
            slot: 12,
            default_value: 1,
            type: 'anvil_input'
        }
    },
    CONDITIONAL: {
        action_name: 'Conditional',
        conditions: {
            slot: 10,
            default_value: [],
            type: 'conditions'
        },
        match_any_condition: {
            slot: 11,
            default_value: false,
            type: 'toggle'
        },
        if_actions: {
            slot: 12,
            default_value: [],
            type: 'subactions'
        },
        else_actions: {
            slot: 13,
            default_value: [],
            type: 'subactions'
        }
    },
    conditions: {
        IN_GROUP: {
            condition_name: 'Required Group',
            required_group: {
                slot: 10,
                default_value: null,
                type: 'dynamic_option_select'
            },
            include_higher_groups: {
                slot: 11,
                default_value: false,
                type: 'toggle'
            }
        },
        PLAYER_STAT: {
            condition_name: 'Player Stat Requirement',
            stat: {
                slot: 10,
                default_value: 'Kills',
                type: 'chat_input'
            },
            mode: {
                slot: 11,
                default_value: 'EQUAL',
                type: 'static_option_select',
                options: [
                    'Less Than',
                    'Less Than or Equal',
                    'Equal',
                    'Greater Than or Equal',
                    'Greater Than'
                ]
            },
            amount: {
                slot: 12,
                default_value: null,
                type: 'anvil_input'
            }
        },
        GLOBAL_STAT: {
            condition_name: 'Global Stat Requirement',
            stat: {
                slot: 10,
                default_value: 'Kills',
                type: 'chat_input'
            },
            mode: {
                slot: 11,
                default_value: 'EQUAL',
                type: 'static_option_select',
                options: [
                    'Less Than',
                    'Less Than or Equal',
                    'Equal',
                    'Greater Than or Equal',
                    'Greater Than'
                ]
            },
            amount: {
                slot: 12,
                default_value: null,
                type: 'anvil_input'
            }
        },
        HAS_PERMISSION: {
            condition_name: 'Required Permission',
            required_permission: {
                slot: 10,
                default_value: null,
                type: 'static_option_select',
                options: [
                    'Fly',
                    'Wood Door',
                    'Iron Door',
                    'Wood Trap Door',
                    'Iron Trap Door',
                    'Fence Gate',
                    'Button',
                    'Lever',
                    'Use Launch Pads',
                    '/tp',
                    '/tp Other Players',
                    'Jukebox',
                    'Kick',
                    'Ban',
                    'Mute',
                    'Pet Spawning',
                    'Build',
                    'Offline Build',
                    'Fluid',
                    'Pro Tools',
                    'Use Chests',
                    'Use Ender Chests',
                    'Item Editor',
                    'Switch Game Mode',
                    'Edit Stats',
                    'Change Player Group',
                    'Change Gamerules',
                    'Housing Menu',
                    'Team Chat Spy',
                    'Edit Actions',
                    'Edit Regions',
                    'Edit Scoreboard',
                    'Edit Event Actions',
                    'Edit Commands',
                    'Edit Functions',
                    'Edit Inventory Layouts',
                    'Edit Teams',
                    'Edit Custom Menus',
                    'Item: Mailbox',
                    'Item: Egg Hunt',
                    'Item: Teleport Pad',
                    'Item: Launch Pad',
                    'Item: Action Pad',
                    'Item: Hologram',
                    'Item: NPCs',
                    'Item: Action Button',
                    'Item: Leaderboard',
                    'Item: Trash Can',
                    'Item: Biome Stick'
                ]
            }
        },
        IN_REGION: {
            condition_name: 'Within Region',
            region: {
                slot: 10,
                default_value: null,
                type: 'dyanmic_option_select'
            }
        },
        HAS_ITEM: {
            condition_name: 'Has Item',
            item: {
                slot: 10,
                default_value: null,
                type: 'item'
            },
            what_to_check: {
                slot: 11,
                default_value: 'Metadata',
                type: 'static_option_select',
                options: [
                    'Item Type',
                    'Metadata'
                ]
            },
            where_to_check: {
                slot: 12,
                default_value: 'Anywhere',
                type: 'static_option_select',
                options: [
                    'Hand',
                    'Armor',
                    'Hotbar',
                    'Inventory',
                    'Anywhere'
                ]
            },
            required_amount: {
                slot: 13,
                default_value: 'Any',
                type: 'static_option_select',
                options: [
                    'Any Amount',
                    'Equal or Greater Amount'
                ]
            }
        },
        IN_PARKOUR: {
            condition_name: 'Doing Parkour'
        },
        POTION_EFFECT: {
            condition_name: 'Has Potion Effect',
            effect: {
                slot: 10,
                default_value: null,
                type: 'static_option_select',
                options: [
                    'Speed',
                    'Slowness',
                    'Haste',
                    'Mining Fatigue',
                    'Strength',
                    'Instant Health',
                    'Instant Damage',
                    'Jump Boost',
                    'Nausea',
                    'Regeneration',
                    'Resistance',
                    'Fire Resistance',
                    'Water Breathing',
                    'Invisibility',
                    'Blindness',
                    'Night Vision',
                    'Hunger',
                    'Weakness',
                    'Poison',
                    'Wither',
                    'Health Boost',
                    'Absorption'
                ]
            }
        },
        SNEAKING: {
            condition_name: 'Player Sneaking'
        },
        FLYING: {
            condition_name: 'Player Flying'
        },
        HEALTH: {
            condition_name: 'Player Health',
            mode: {
                slot: 10,
                default_value: 'EQUAL',
                type: 'static_option_select',
                options: [
                    'Less Than',
                    'Less Than or Equal',
                    'Equal',
                    'Greater Than or Equal',
                    'Greater Than'
                ]
            },
            amount: {
                slot: 11,
                default_value: null,
                type: 'anvil_input'
            }
        },
        MAX_HEALTH: {
            condition_name: 'Max Player Health',
            mode: {
                slot: 10,
                default_value: 'EQUAL',
                type: 'static_option_select',
                options: [
                    'Less Than',
                    'Less Than or Equal',
                    'Equal',
                    'Greater Than or Equal',
                    'Greater Than'
                ]
            },
            amount: {
                slot: 11,
                default_value: null,
                type: 'anvil_input'
            }
        },
        HUNGER_LEVEL: {
            condition_name: 'Player Hunger',
            mode: {
                slot: 10,
                default_value: 'EQUAL',
                type: 'static_option_select',
                options: [
                    'Less Than',
                    'Less Than or Equal',
                    'Equal',
                    'Greater Than or Equal',
                    'Greater Than'
                ]
            },
            amount: {
                slot: 11,
                default_value: null,
                type: 'anvil_input'
            }
        },
        GAMEMODE: {
            condition_name: 'Required Gamemode',
            required_gamemode: {
                slot: 10,
                default_value: null,
                type: 'static_option_select',
                options: [
                    'Adventure',
                    'Survival',
                    'Creative'
                ]
            }
        },
        PLACEHOLDER_NUMBER: {
            condition_name: 'Placeholder Number Requirement',
            placeholder: {
                slot: 10,
                default_value: null,
                type: 'chat_input'
            },
            mode: {
                slot: 11,
                default_value: 'EQUAL',
                type: 'static_option_select',
                options: [
                    'Less Than',
                    'Less Than or Equal',
                    'Equal',
                    'Greater Than or Equal',
                    'Greater Than'
                ]
            },
            amount: {
                slot: 12,
                default_value: null,
                type: 'anvil_input'
            }
        },
        IN_TEAM: {
            condition_name: 'Required Team',
            required_team: {
                slot: 10,
                default_value: 'None',
                type: 'dynamic_option_select'
            }
        },
        TEAM_STAT: {
            condition_name: 'Team Stat Requirement',
            stat: {
                slot: 10,
                default_value: 'Kills',
                type: 'chat_input'
            },
            team: {
                slot: 11,
                default_value: 'None',
                type: 'dynamic_option_select'
            },
            mode: {
                slot: 12,
                default_value: 'EQUAL',
                type: 'static_option_select',
                options: [
                    'Less Than',
                    'Less Than or Equal',
                    'Equal',
                    'Greater Than or Equal',
                    'Greater Than'
                ]
            },
            amount: {
                slot: 13,
                default_value: null,
                type: 'anvil_input'
            }
        },
        PVP_ENABLED: {
            condition_name: 'Pvp Enabled'
        },
        FISHING_ENVIRONMENT: {
            condition_name: 'Fishing Environment',
            environment: {
                slot: 10,
                default_value: null,
                type: 'static_option_select',
                options: [
                    'Water',
                    'Lava'
                ]
            }
        },
        PORTAL_TYPE: {
            condition_name: 'Portal Type',
            portal_type: {
                slot: 10,
                default_value: 'End Portal',
                type: 'static_option_select',
                options: [
                    'Nether Portal',
                    'End Portal'
                ]
            }
        },
        DAMAGE_CAUSE: {
            condition_name: 'Damage Cause',
            cause: {
                slot: 10,
                default_value: null,
                type: 'static_option_select',
                options: [
                    'Entity Attack',
                    'Projectile',
                    'Suffocation',
                    'Fall',
                    'Lava',
                    'Fire',
                    'Fire Tick',
                    'Drowning',
                    'Starvation',
                    'Poison',
                    'Thorns'
                ]
            }
        },
        DAMAGE_AMOUNT: {
            condition_name: 'Damage Amount',
            mode: {
                slot: 10,
                default_value: 'EQUAL',
                type: 'static_option_select',
                options: [
                    'Less Than',
                    'Less Than or Equal',
                    'Equal',
                    'Greater Than or Equal',
                    'Greater Than'
                ]
            },
            amount: {
                slot: 11,
                default_value: null,
                type: 'anvil_input'
            }
        },
        BLOCK_TYPE: {
            condition_name: 'Block Type',
            item: {
                slot: 10,
                default_value: null,
                type: 'item'
            },
            match_type_only: {
                slot: 11,
                default_value: false,
                type: 'toggle'
            }
        },
        IS_ITEM: {
            condition_name: 'Is Item',
            item: {
                slot: 10,
                default_value: null,
                type: 'item'
            },
            what_to_check: {
                slot: 11,
                default_value: 'Metadata',
                type: 'static_option_select',
                options: [
                    'Item Type',
                    'Metadata'
                ]
            },
            where_to_check: {
                slot: 12,
                default_value: 'Anywhere',
                type: 'static_option_select',
                options: [
                    'Hand',
                    'Armor',
                    'Hotbar',
                    'Inventory',
                    'Anywhere'
                ]
            },
            required_amount: {
                slot: 13,
                default_value: 'Any',
                type: 'static_option_select',
                options: [
                    'Any Amount',
                    'Equal or Greater Amount'
                ]
            }
        }
    },
    SEND_MESSAGE: {
        action_name: 'Send a Chat Message',
        message: {
            slot: 10,
            default_value: 'Hello!',
            type: 'chat_input'
        }
    },
    PLAY_SOUND: {
        action_name: 'Play Sound',
        sound: {
            slot: 10,
            default_value: null,
            type: 'sound'
        },
        volume: {
            slot: 11,
            default_value: 0.7,
            type: 'anvil'
        },
        pitch: {
            slot: 12,
            default_value: 1,
            type: 'anvil'
        },
        location: {
            slot: 13,
            default_value: null,
            type: 'location'
        }
    },
    GIVE_ITEM: {
        action_name: 'Give Item',
        item: {
            slot: 10,
            default_value: null,
            type: 'item'
        },
        allow_multiple: {
            slot: 11,
            default_value: false,
            type: 'toggle'
        },
        inventory_slot: {
            slot: 12,
            default_value: -1,
            type: 'slot'
        },
        replace_existing_item: {
            slot: 13,
            default_value: false,
            type: 'toggle'
        }
    },
    TITLE: {
        action_name: 'Display Title',
        title: {
            slot: 10,
            default_value: 'Hello World!',
            type: 'chat_input'
        },
        subtitle: {
            slot: 11,
            default_value: 0,
            type: 'chat_input'
        },
        fade_in: {
            slot: 12,
            default_value: 1,
            type: 'anvil_input'
        },
        stay: {
            slot: 13,
            default_value: 5,
            type: 'anvil_input'
        },
        fade_out: {
            slot: 14,
            default_value: 1,
            type: 'anvil_input'
        }
    },
    EXIT: {
        action_name: 'Exit'
    },
    CHANGE_PLAYER_GROUP: {
        action_name: 'Change Player\'s Group',
        group: {
            slot: 10,
            default_value: null,
            type: 'dynamic_option_select'
        },
        demotion_protection: {
            slot: 10,
            default_value: true,
            type: 'toggle'
        }
    },
    KILL: {
        action_name: 'Kill Player'
    },
    FULL_HEAL: {
        action_name: 'Full Heal'
    },
    SPAWN: {
        action_name: 'Go To House Spawn'
    },
    ACTION_BAR: {
        action_name: 'Display Action Bar',
        message: {
            slot: 10,
            default_value: 'Hello World!',
            type: 'chat_input'
        }
    },
    RESET_INVENTORY: {
        action_name: 'Reset Inventory'
    },
    PARKOUR_CHECKPOINT: {
        action_name: 'Parkour Checkpoint'
    },
    REMOVE_ITEM: {
        action_name: 'Remove Item',
        item: {
            slot: 10,
            default_value: null,
            type: 'item'
        }
    },
    POTION_EFFECT: {
        action_name: 'Apply Potion Effect',
        effect: {
            slot: 10,
            default_value: null,
            type: 'static_option_select'
        },
        duration: {
            slot: 11,
            default_value: 60,
            type: 'anvil_input'
        },
        level: {
            slot: 12,
            default_value: 10,
            type: 'anvil_input'
        },
        override_existing_effects: {
            slot: 13,
            default_value: false,
            type: 'toggle'
        }
    },
    CLOSE_MENU: {
        action_name: 'Close Menu'
    },
    DISPLAY_MENU: {
        action_name: 'Display Menu',
        menu: {
            slot: 10,
            default_value: null,
            type: 'dynamic_option_select'
        }
    },
    CHANGE_TEAM_STAT: {
        action_name: 'Change Team Stat',
        stat: {
            slot: 10,
            default_value: 'Kills',
            type: 'chat_input'
        },
        mode: {
            slot: 11,
            default_value: 'INCREMENT',
            type: 'static_option_select',
            options: [
                'Increment',
                'Decrement',
                'Set',
                'Multiply',
                'Divide'
            ]
        },
        amount: {
            slot: 12,
            default_value: 1,
            type: 'anvil_input'
        },
        team: {
            slot: 13,
            default_value: 'None',
            type: 'dynamic_option_select'
        }
    },
    SET_PLAYER_TEAM: {
        action_name: 'Set Player Team',
        team: {
            slot: 10,
            default_value: 'None',
            type: 'dynamic_option_select'
        }
    },
    PAUSE: {
        action_name: 'Pause Execution',
        ticks_to_wait: {
            slot: 10,
            default_value: 20,
            type: 'anvil_input'
        }
    },
    ENCHANT_HELD_ITEM: {
        action_name: 'Enchant Held Item',
        enchantment: {
            slot: 10,
            default_value: null,
            type: 'enchantment'
        },
        level: {
            slot: 11,
            default_value: 1,
            type: 'anvil_input'
        }
    },
    APPLY_LAYOUT: {
        action_name: 'Apply Inventory Layout',
        layout: {
            slot: 10,
            default_value: null,
            type: 'dynamic_option_select'
        }
    },
    TRIGGER_FUNCTION: {
        action_name: 'Trigger Function',
        function: {
            slot: 10,
            default_value: null,
            type: 'dynamic_option_select'
        },
        trigger_for_all_players: {
            slot: 11,
            default_value: false,
            type: 'toggle'
        }
    },
    USE_HELD_ITEM: {
        action_name: 'Use/Remove Held Item'
    },
    RANDOM_ACTION: {
        action_name: 'Random Action',
        actions: {
            slot: 10,
            default_value: [],
            type: 'subactions'
        }
    },
    SET_GAMEMODE: {
        action_name: 'Set Gamemode',
        gamemode: {
            slot: 10,
            default_value: null,
            type: 'static_option_select',
            options: [
                'Adventure',
                'Survival',
                'Creative'
            ]
        }
    },
    SET_COMPASS_TARGET: {
        action_name: 'Set Compass Target',
        location: {
            slot: 10,
            default_value: null,
            type: 'location'
        }
    },
    BAIL_PARKOUR: {
        action_name: 'Fail Parkour',
        reason: {
            slot: 10,
            default_value: 'Failed!',
            type: 'chat_input'
        }
    },
    FAIL_PARKOUR: {
        action_name: 'Fail Parkour',
        reason: {
            slot: 10,
            default_value: 'Failed!',
            type: 'chat_input'
        }
    },
    TELEPORT_PLAYER: {
        action_name: 'Teleport Player',
        location: {
            slot: 10,
            default_value: null,
            type: 'location'
        }
    },
    CHANGE_GLOBAL_STAT: {
        action_name: 'Change Global Stat',
        stat: {
            slot: 10,
            default_value: 'Kills',
            type: 'chat_input'
        },
        mode: {
            slot: 11,
            default_value: 'INCREMENT',
            type: 'static_option_select',
            options: [
                'Increment',
                'Decrement',
                'Set',
                'Multiply',
                'Divide'
            ]
        },
        amount: {
            slot: 12,
            default_value: 1,
            type: 'anvil_input'
        }
    },
    SEND_TO_LOBBY: {
        action_name: 'Send to Lobby',
        location: {
            slot: 10,
            default_value: null,
            type: 'static_option_select',
            options: [
                'Main Lobby',
                'Tournament Hall',
                'Blitz SG',
                'The TNT Games',
                'Mega Walls',
                'Arcade Games',
                'Cops and Crims',
                'UHC Champions',
                'Warlords',
                'Smash Heroes',
                'Housing',
                'SkyWars',
                'Speed UHC',
                'Classic Games',
                'Prototype',
                'Bed Wars',
                'Murder Mystery',
                'Build Battle',
                'Duels',
                'Wool Wars'
            ]
        }
    },
    GIVE_EXP_LEVELS: {
        action_name: 'Give Experience Levels',
        levels: {
            slot: 10,
            default_value: 1,
            type: 'anvil_input'
        }
    },
    CLEAR_EFFECTS: {
        action_name: 'Clear All Potion Effects'
    },
    SET_MAX_HEALTH: {
        action_name: 'Change Max Health',
        max_health: {
            slot: 10,
            default_value: 20,
            type: 'anvil_input'
        },
        mode: {
            slot: 11,
            default_value: 'INCREMENT',
            type: 'static_option_select',
            options: [
                'Increment',
                'Decrement',
                'Set',
                'Multiply',
                'Divide'
            ]
        },
        heal_on_change: {
            slot: 12,
            default_value: true,
            type: 'toggle'
        }
    },
    CHANGE_MAX_HEALTH: {
        action_name: 'Change Max Health',
        max_health: {
            slot: 10,
            default_value: 20,
            type: 'anvil_input'
        },
        mode: {
            slot: 11,
            default_value: 'INCREMENT',
            type: 'static_option_select',
            options: [
                'Increment',
                'Decrement',
                'Set',
                'Multiply',
                'Divide'
            ]
        },
        heal_on_change: {
            slot: 12,
            default_value: true,
            type: 'toggle'
        }
    },
    SET_HEALTH: {
        action_name: 'Change Health',
        health: {
            slot: 10,
            default_value: 20,
            type: 'anvil_input'
        },
        mode: {
            slot: 11,
            default_value: 'INCREMENT',
            type: 'static_option_select',
            options: [
                'Increment',
                'Decrement',
                'Set',
                'Multiply',
                'Divide'
            ]
        }
    },
    CHANGE_HEALTH: {
        action_name: 'Change Health',
        health: {
            slot: 10,
            default_value: 20,
            type: 'anvil_input'
        },
        mode: {
            slot: 11,
            default_value: 'INCREMENT',
            type: 'static_option_select',
            options: [
                'Increment',
                'Decrement',
                'Set',
                'Multiply',
                'Divide'
            ]
        }
    },
    SET_HUNGER_LEVEL: {
        action_name: 'Change Hunger Level',
        hunger: {
            slot: 10,
            default_value: 20,
            type: 'anvil_input'
        },
        mode: {
            slot: 11,
            default_value: 'INCREMENT',
            type: 'static_option_select',
            options: [
                'Increment',
                'Decrement',
                'Set',
                'Multiply',
                'Divide'
            ]
        }
    },
    CHANGE_HUNGER_LEVEL: {
        action_name: 'Change Hunger Level',
        hunger: {
            slot: 10,
            default_value: 20,
            type: 'anvil_input'
        },
        mode: {
            slot: 11,
            default_value: 'INCREMENT',
            type: 'static_option_select',
            options: [
                'Increment',
                'Decrement',
                'Set',
                'Multiply',
                'Divide'
            ]
        }
    }
}