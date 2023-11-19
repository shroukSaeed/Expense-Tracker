const IncomeList = ({ incomes , setIncomes , setAmount , setCategory , setEditId , setDate , setDescription}) => {

    const handleEdit = (t) => {
        setEditId(t.id)
        setAmount(t.amount)
        setCategory(t.category)
        setDescription(t.description)
        setDate(new Date(t.date))
    }

    const handleDelete = (id) => {
        const filtered = incomes.filter(i => i.id !== id)
        setIncomes(filtered)
    }

    return (
        <table>
            <thead>
                <tr>

                    <th>Category</th>
                    <th>Amount</th>
                    <th>Description</th>
                    <th>Date</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {incomes.map((income) => {
                    return <tr key={income.id}>
                        <td>{income.category}</td>
                        <td>${income.amount}</td>
                        <td>{income.description}</td>
                        <td>{new Date(income.date).toDateString()}</td>
                        <td>
                            <button className='btn ' onClick={() => handleEdit(income)}>edit</button>
                            <button className='btn ' onClick={() => handleDelete(income.id)}>delete</button>
                        </td>
                    </tr>
                })}
            </tbody>
        </table>
    )
}

export default IncomeList
