
const initialStateCustomer = {
    fullName: "",
    nationalID: "",
    createdAt: ""
}



const customerReducer = (state = initialStateCustomer, action) => {
    switch (action.type) {
        case "account/createCustomer": // redux no check this    thid is just for developers
            return {
                ...state,
                fullName: action.payload.fullName,
                nationalID: action.payload.nationalID,
                createdAt: action.payload.createdAt
            }
        case "account/updateName":
            return { ...state, fullName: action.payload.fullName }

        default: return state
    }
}



export const createCustomer = (fullName, nationalID) => {
    return {
        type: "account/createCustomer", payload: {
            fullName, nationalID,
            createdAt: new Date().toISOString()
        }
    }
}

export const updateName = (fullName) => {
    return { type: "account/updateName", payload: { fullName } }
}

export default customerReducer