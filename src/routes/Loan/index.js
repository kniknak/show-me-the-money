import {injectReducer} from '../../store/reducers'
import {Connection} from "./modules/loanDb"
import {LOAN_CONNECT, LOAN_INIT} from "./modules/loan"


export default (store) => ({
    /*  Async getComponent is only invoked when route matches   */
    getComponent (nextState, cb) {
        /*  Webpack - use 'require.ensure' to create a split point
         and embed an async module loader (jsonp) when bundling   */
        require.ensure([], (require) => {
            /*  Webpack - use require callback to define
             dependencies for bundling   */
            const Loan = require('./containers/LoanContainer').default
            const reducer = require('./modules/loan').default

            const connection = new Connection()

            connection.open(
                connection => {
                    console.log(connection)
                    store.dispatch({
                        type: LOAN_CONNECT,
                        connection,
                    })

                    connection.listenToUpdates(() => connection.readDataFromStore(loansData => store.dispatch({
                        type: LOAN_INIT,
                        loansData,
                    })))
                }
            )

            /*  Add the reducer to the store on key 'loan'  */
            injectReducer(store, {key: 'loan', reducer})

            /*  Return getComponent   */
            cb(null, Loan)

            /* Webpack named bundle   */
        }, 'loan')
    }
})
