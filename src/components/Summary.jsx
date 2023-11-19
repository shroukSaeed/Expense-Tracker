import { toast } from "react-toastify";

const Summary = ({ calculateTotal , calcBalance }) => {


    return (
        <div className='summary-container'>
            <h2 className='title'>Summary</h2>
            <div className="title-underline"></div>
            <div className="summary">
                <h5 className='text'>total income: ${calculateTotal('income')} </h5>
                <h5 className='text'>total expenses: ${calculateTotal('expense')}</h5>
                <h5 className='text'>total balance: ${calcBalance()}</h5>
            </div>
        </div>
    )
}

export default Summary
