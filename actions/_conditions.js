const conditions = {
    IN_GROUP: {
        condition_name: "Required Group",
        required_group: {
            slot: 10,
            default_value: null,
            type: "dynamic_option_select"
        },
        include_higher_groups: {
            slot: 11,
            default_value: false,
            type: "toggle"
        }
    }
}
export default conditions;