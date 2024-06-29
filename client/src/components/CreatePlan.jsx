import { useState } from 'react';
import DatePicker from 'react-datepicker';

function CreatePlan({list, setPlans}) {
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);

  const fetchPlans = async () => {
    const user = localStorage.getItem('site');
    const plansResponse = await fetch(`http://localhost:3001/plans/${list._id}`, {
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${user}`
      }
    });

    const plans = await plansResponse.json();
    setPlans(plans);
  } 

  const handleNameChange = (e) => {
    const { value } = e.target;
    setName(value);
  }

  const handleTextChange = (e) => {
    const { value } = e.target;
    setText(value);
  }

  const handleDateChange = (date) => {
    setSelectedDate(date);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = localStorage.getItem('site');
      const response = await fetch('http://localhost:3001/plans', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${user}`
        },
        body: JSON.stringify({ 
          name,
          text,
          due: selectedDate,
          listId: list._id
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok!')
      }
      await fetchPlans();
    } catch (error) {
      console.log(error.message)
    }
  }

  return(
    <form>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Plan Name</label>
        <input type="name" className="form-control" id="name" value={name} onChange={handleNameChange} name='name'/>
      </div>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Plan Text</label>
        <input type="text" className="form-control" id="text" value={text} onChange={handleTextChange} name='text'/>
      </div>
      <div className="mb-3">
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          showTimeSelect
          dateFormat="Pp"
          placeholderText="Select a date and time"
        />
      </div>
      <div className="text-center">
        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Create Plan</button>
      </div>
    </form>
  )
}

export default CreatePlan;
