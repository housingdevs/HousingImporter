const action = {
    action_name: "Conditional",
    conditions: {
        slot: 10,
        default_value: [],
        type: "conditions"
    },
    match_any_condition: {
        slot: 11,
        default_value: false,
        type: "toggle"
    },
    if_actions: {
        slot: 12,
        default_value: [],
        type: "subactions"
    },
    else_actions: {
        slot: 13,
        default_value: [],
        type: "subactions"
    }
};

export default action;