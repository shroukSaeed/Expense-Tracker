import React, { useEffect, useState } from 'react';
import RecordList from './components/RecordList';
import Summary from './components/Summary';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import './App.css'

const App = () => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date());
  const [editId, setEditId] = useState(null);
  const [description, setDescription] = useState('');
  const [incomes, setIncomes] = useState(() => {
    return JSON.parse(localStorage.getItem('data')) || []
  });

  useEffect(() => {
    localStorage.setItem('data', JSON.stringify(incomes));
  }, [incomes])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (category === ''  || amount === '' || description === '') {
      toast.error('fill all fields');
      return;
    }
    if (amount > calcBalance() && category === 'expense') {
      toast.error(`Your Balance isn't enough`)
      return;
    }
    if (editId) {
      const newIcomes = incomes.map((t) => (
        t.id === editId ? { id: editId, amount, description, date, category } : t
      ))
      toast.success('item edited successfuly')
      setIncomes(newIcomes)
      setEditId(null)
    } else {

      setIncomes([...incomes, { id: Date.now(), description, amount, date, category }])
      toast.success('submitted')
    }

    setAmount('')
    setCategory('')
    setDescription('')
    setDate(new Date())
  }

  function calculateTotal(type) {
    const filteredRecords = incomes.filter((record) => record.category === type);
    return filteredRecords.reduce((total, record) => total + parseFloat(record.amount), 0).toFixed(2);
  }

  const calcBalance = () => {
    const income = calculateTotal('income');
    const expense = calculateTotal('expense');
    return (income - expense)
  }

  return <div className='container'>
    <div className="holder">
      <main>
        <h1 className='title'>Expense tracker</h1>


        <form onSubmit={handleSubmit}>
          <label htmlFor="amount" className='form-label'> Amount </label>
          <input type="number" name="amount" min={1} required id="amount" value={amount} className='form-input' onChange={e => setAmount(e.target.value)} />

          <label htmlFor="category" className='form-label'>Category</label>
          <select name="category" required id="category" value={category} className='form-input' onChange={e => setCategory(e.target.value)}>
            <option value=".." hidden>Category</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          <label htmlFor="date" className='form-label'>Date:</label>
          <DatePicker selected={date} required onChange={(newDate) => setDate(newDate)} className='form-input' />

          <label htmlFor="description" className='form-label'>Description</label>
          <input type="text-area" required name="description" id="description" value={description} className='form-textarea' onChange={e => setDescription(e.target.value)} />

          <button type='submit' className='btn submit-btn'>Submit</button>
        </form>
      </main>
      <Summary calculateTotal={calculateTotal} calcBalance={calcBalance} />
    </div>
    <RecordList incomes={incomes} setAmount={setAmount} setCategory={setCategory} setDate={setDate} setDescription={setDescription} setEditId={setEditId} />
    <ToastContainer />
  </div>

};

export default App;
