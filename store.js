import { combineReducers, createStore } from "redux"


const initialStateAccount = {
    balance: 0,
    loan: 0,
    loanPurpose: "",
}

const initialStateCustomer = {
    fullName: "",
    nationalID: "",
    createdAt: ""
}

// one diffrence between reducer and redux = state = initialState
const accountReducer = (state = initialStateAccount, action) => {
    switch (action.type) {
        case "account/deposit":
            return { ...state, balance: state.balance + action.payload }
        case "account/withdraw":
            return { ...state, balance: state.balance - action.payload }
        case "account/requestLoan":
            if (state.loan > 0)
                return state
            //later 
            return {
                ...state,
                loan: action.payload.amount,
                loanPurpose: action.payload.purpose,
                balance: state.balance + action.payload.amount
            }

        case "account/payLoan":
            return {
                ...state,
                loan: 0,
                loanPurpose: "",
                balance: state.balance - state.loan
            }

        default:
            return state
    }
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

const rootReducer = combineReducers({
    account: accountReducer,
    customer: customerReducer
})

const store = createStore(rootReducer)



// store.dispatch({ type: "account/deposit", payload: 500 })

// console.log(store.getState())

// store.dispatch({ type: "account/withdraw", payload: 200 })

// console.log(store.getState())

// store.dispatch({ type: 'account/requestLoan', payload: { purpose: "buy a new car", amount: 1000 } })

// console.log(store.getState())

// store.dispatch({ type: 'account/payLoan' })

// console.log(store.getState())


const deposit = (amount) => {
    return { type: "account/deposit", payload: amount }
}
const withdraw = (amount) => {
    return { type: "account/withdraw", payload: amount }
}
const requestLoan = (amount, purpose) => {
    return { type: 'account/requestLoan', payload: { purpose: purpose, amount: amount } }
}
const payLoan = () => {
    return { type: "account/payLoan" }
}

store.dispatch(deposit(500))
store.dispatch(withdraw(200))
console.log(store.getState())
store.dispatch(requestLoan(1000, "buy a new car"))
console.log(store.getState())
store.dispatch(payLoan())
console.log(store.getState())

const createCustomer = (fullName, nationalID) => {
    return {
        type: "account/createCustomer", payload: {
            fullName, nationalID,
            createdAt: new Date().toISOString()
        }
    }
}

const updateName = (fullName) => {
    return { type: "account/updateName", payload: { fullName } }
}

store.dispatch(createCustomer("Mohammad" , 127))
store.dispatch(deposit(250))

console.log(store.getState())