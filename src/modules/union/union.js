export default {
    typeProcessing(type) {
        if (type == "object") {
            return "cascaderStrCodesNames"
        }
        if (type == "string") {
            return "inputString"
        }
        if (type == "boolean") {
            return "switchBoolean"
        }
        if (type == "date") {
            return "datePickerDate"
        }
        if (type == "number") {
            return "InputNumberThe"
        }
    },
    modulesName: [{
        k: "Input",
        v: "theInput"
    }]

}