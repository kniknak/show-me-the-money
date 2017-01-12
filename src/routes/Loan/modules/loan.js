import {Record, OrderedMap} from "immutable"

const interestDaily = 1.1
const interestDailyProlongated = 1.15
const maxAmount = 400
const timeToDecide = 30000
const loansPerMinute = 3

class Loan extends Record({
    id: undefined,
    amount: 200,
    days: 14,
    prolongated: false,
    created: undefined,
}) {
    get payBack() {
        return this.amount * (this.prolongated ? interestDailyProlongated : interestDaily) ** (this.days + (this.prolongated ? 7 : 0))
    }
}

const sort = (a, b) => a.created > b.created ? -1 : 1

// ------------------------------------
// Constants
// ------------------------------------
export const LOAN_CONNECT = 'LOAN_CONNECT'
export const LOAN_INIT = 'LOAN_INIT'
export const LOAN_SET = 'LOAN_SET'
export const LOAN_UPDATE = 'LOAN_UPDATE'
export const LOAN_STATUS = 'LOAN_STATUS'

// ------------------------------------
// Actions/ ------------------------------------
export const setCurrentLoan = currentLoan => dispatch => {
    dispatch({
        type: LOAN_SET,
        currentLoan,
    })

    dispatch({
        type: LOAN_STATUS,
        status: undefined,
    })
}

export const orderLoan = loan => (dispatch, getState) => {
    const currentTime = new Date()
    const {
        pageLoaded,
        loans,
        connection,
    } = getState().loan

    if ((loan.amount === maxAmount) && (pageLoaded.valueOf() + timeToDecide > currentTime.valueOf())) {
        return dispatch({
            type: LOAN_STATUS,
            status: "Too early!",
        })
    }

    if (loans.filter(loan => loan.created.valueOf() + 60000 > currentTime.valueOf()).size >= loansPerMinute) {
        return dispatch({
            type: LOAN_STATUS,
            status: "Too much loans per minute! Think twice!",
        })
    }

    loan = loan.set("created", currentTime).set("id", (new Date()).valueOf() + "." + Math.random())

    dispatch({
        type: LOAN_SET,
        currentLoan: new Loan(),
    })

    dispatch({
        type: LOAN_UPDATE,
        loan,
    })

    connection.updateLoan(loan)

    dispatch({
        type: LOAN_STATUS,
        status: "You will pay your whole life!",
    })
}

export const updateLoan = loan => (dispatch, getState) => {
    dispatch({
        type: LOAN_UPDATE,
        loan,
    })

    getState().loan.connection.updateLoan(loan)

    dispatch({
        type: LOAN_STATUS,
        status: "Prolongated!",
    })
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [LOAN_CONNECT]: (state, {connection}) => ({connection}),
    [LOAN_INIT]: (state, {loansData}) => ({
        loans: OrderedMap(loansData.map(data => [data.id, new Loan(data)])).sort(sort),
    }),
    [LOAN_STATUS]: (state, {status}) => ({status}),
    [LOAN_SET]: (state, {currentLoan}) => ({currentLoan}),
    [LOAN_UPDATE]: ({loans}, {loan}) => ({
        loans: loans.set(loan.id, loan).sort(sort),
    }),
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
    currentLoan: new Loan(),
    loans: OrderedMap(),
    status: undefined,
    pageLoaded: new Date(),
    maxAmount,
    connection: undefined,
}

export default function loanReducer (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]

    return handler ? {...state, ...handler(state, action)} : state
}
