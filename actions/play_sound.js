const action = {
    action_name: "Play Sound",
    sound: {
        slot: 10,
        default_value: null,
        type: "sound"
    },
    volume: {
        slot: 11,
        default_value: 0.7,
        type: "anvil"
    },
    pitch: {
        slot: 12,
        default_value: 1,
        type: "anvil"
    },
    location: {
        slot: 13,
        default_value: null,
        type: "location",
    }
}

export default action;