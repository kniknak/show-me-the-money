import React from 'react'

export const Loan = ({
    currentLoan,
    loans,
    setCurrentLoan,
    orderLoan,
    updateLoan,
    maxAmount,
    status,
}) => (
    <div style = {{margin: '0 auto'}}>
        <h2>{status || "Get loan"}</h2>
        <form onSubmit = {ev => ev.preventDefault() || orderLoan(currentLoan)}>
            <input type = "range" value = {currentLoan.amount} onChange = {ev => setCurrentLoan(currentLoan.set("amount", parseInt(ev.target.value)))} min = "2" max = {maxAmount + ""}/>
            <p>Amount: ${currentLoan.amount}</p>
            <input type = "range" value = {currentLoan.days} onChange = {ev => setCurrentLoan(currentLoan.set("days", parseInt(ev.target.value)))} min = "7" max = "30"/>
            <p>Days: {currentLoan.days}</p>
            <p>Pay back: ${Math.round(currentLoan.payBack * 100) / 100} (10% per day, daily capitalization)</p>
            <button>I will pay back</button>
        </form>
        {!!loans.size && <h2>Your loans</h2>}
        {!!loans.size && (
            <ul style = {{paddingLeft: 0}}>
                {loans.map(loan => (
                    <li key = {loan.id} style = {{border: "1px solid", marginBottom: 20, listStyle: "none"}}>
                        <p>Id: {loan.id}</p>
                        <p>Created: {loan.created.toString()}</p>
                        <p>Amount: ${loan.amount}</p>
                        <p>Days: {loan.days + (loan.prolongated ? 7 : 0)}</p>
                        <p>Pay back: ${Math.round(loan.payBack * 100) / 100} ({loan.prolongated ? 15 : 10}% per day, daily capitalization)</p>
                        {loan.prolongated ? (
                            <p>Prolongated!</p>
                        ) : (
                            <a href = "#" onClick = {ev => ev.preventDefault() || updateLoan(loan.set("prolongated", true))}>Prolongate</a>
                        )}
                    </li>
                )).toList()}
            </ul>
        )}
    </div>
)

Loan.propTypes = {
    currentLoan: React.PropTypes.object.isRequired,
    loans: React.PropTypes.object.isRequired,
    setCurrentLoan: React.PropTypes.func.isRequired,
    orderLoan: React.PropTypes.func.isRequired,
    updateLoan: React.PropTypes.func.isRequired,
    maxAmount: React.PropTypes.number.isRequired,
    status: React.PropTypes.string,
}

export default Loan
