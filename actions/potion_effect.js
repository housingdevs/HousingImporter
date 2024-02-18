const action = {
    action_name: "Apply Potion Effect",
    effect: {
        slot: 10,
        default_value: null,
        type: "static_option_select"
    },
    duration: {
        slot: 11,
        default_value: 60,
        type: "anvil_input"
    },
    level: {
        slot: 12,
        default_value: 10,
        type: "anvil_input"
    },
    override_existing_effects: {
        slot: 13,
        default_value: false,
        type: "toggle"
    }
}

export default action;