import { createSlice } from "@reduxjs/toolkit"

const initialStateAccount = {
    balance: 0,
    loan: 0,
    loanPurpose: "",
    isLoading: false
}

// one diffrence between reducer and redux = state = initialState
// const accountReducer = (state = initialStateAccount, action) => {
//     switch (action.type) {
//         case "account/deposit":
//             return { ...state, balance: state.balance + action.payload , isLoading: false}
//         case "account/withdraw":
//             return { ...state, balance: state.balance - action.payload }
//         case "account/requestLoan":
//             if (state.loan > 0)
//                 return state
//             //later 
//             return {
//                 ...state,
//                 loan: action.payload.amount,
//                 loanPurpose: action.payload.purpose,
//                 balance: state.balance + action.payload.amount
//             }

//         case "account/payLoan":
//             return {
//                 ...state,
//                 loan: 0,
//                 loanPurpose: "",
//                 balance: state.balance - state.loan
//             }
//             case "account/ConvertingCurrency": 
//             return{
//                 ...state,
//                 isLoading: true
//             }

//         default:
//             return state
//     }
// }

const acountSlice = createSlice({
    name: "account",
    initialState: initialStateAccount,
    reducers: {
        deposit(state, action) { // account/deposite
            state.balance = state.balance + action.payload
            state.isLoading = false
        },
        withdraw(state, action) {
            state.balance -= action.payload
        },
        requestLoan: {
            prepare(amount, purpose) {
                return { payload: { amount, purpose } }
            },

            reducer(state, action) {
                if (state.loan > 0)
                    return
                state.loan = action.payload.amount
                state.loanPurpose = action.payload.purpose
                state.balance = state.balance + action.payload.amount
            }
        },
        payLoan(state) {
            state.balance -= state.loan // state.balance = state.balance - state.loan 
            state.loan = 0
            state.loanPurpose = ""
        },
        ConvertingCurrency(state){
            state.isLoading = true
        }

    }
})

export const {  requestLoan, payLoan, withdraw } = acountSlice.actions

export default acountSlice.reducer

export const deposit = (amount, currency) => {

    if (currency === "USD")
        return { type: "account/deposit", payload: amount }

    return async (dispatch, getState) => {//Middleware
        dispatch({ type: "account/ConvertingCurrency" })
        //At call
        const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`)
        const data = await res.json()
        const convert = data.rates.USD

        //return Action
        dispatch({ type: "account/deposit", payload: convert })

    }//Middleware
}


// export const deposit = (amount, currency) => {

//     if (currency === "USD")
//         return { type: "account/deposit", payload: amount }

//     return async (dispatch, getState) => {//Middleware
//         dispatch({type : "account/ConvertingCurrency" })
//         //At call
//         const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`)
//         const data = await res.json()
//         const convert = data.rates.USD

//         //return Action
//         dispatch({ type: "account/deposit", payload: convert })

//     }//Middleware
// }
// export const withdraw = (amount) => {
//     return { type: "account/withdraw", payload: amount }
// }
// export const requestLoan = (amount, purpose) => {
//     return { type: 'account/requestLoan', payload: { purpose: purpose, amount: amount } }
// }
// export const payLoan = () => {
//     return { type: "account/payLoan" }
// }

// export default accountReducer