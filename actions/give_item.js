const action = {
    action_name: "Give Item",
    item: {
        slot: 10,
        default_value: null,
        type: "item"
    },
    allow_multiple: {
        slot: 11,
        default_value: false,
        type: "toggle"
    },
    inventory_slot: {
        slot: 12,
        default_value: -1,
        type: "slot"
    },
    replace_existing_item: {
        slot: 13,
        default_value: false,
        type: "toggle",
    }
}

export default action;