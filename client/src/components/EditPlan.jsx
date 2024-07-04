import { useState } from "react";
import DatePicker from 'react-datepicker';
import { useLocation, useNavigate } from 'react-router-dom';

function EditPlan() {
  const navigate = useNavigate();
  const location = useLocation();
  const { plan } = location.state || {};
  const [name, setName] = useState(plan?.name || '');
  const [text, setText] = useState(plan?.text || '');
  const [selectedDate, setSelectedDate] = useState(plan?.due ? new Date(plan.due) : null);

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const user = localStorage.getItem('site');
      const requestBody = {}
      if (name) {
        requestBody.name = name;
      }
      
      if (text) {
        requestBody.text = text;
      }

      if (selectedDate) {
        requestBody.due = selectedDate;
      }
      const response = await fetch('http://localhost:3001/plans/${id}', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${user}`
        },
        body: JSON.stringify({ 
          _id: plan._id,
          ...requestBody,
          listId: plan.listId,
        })
      })
      navigate(`/list/${plan.listId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok!')
      }
    } catch(error) {
      console.log(error);
    }
  }

  return(
    <form>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Plan Name</label>
        <input type="name" className="form-control" value={name} onChange={(e) => setName(e.target.value)}/>
      </div>
      <div className="mb-3">
        <label htmlFor="text" className="form-label">Plan Text</label>
        <input type="text" className="form-control" value={text} onChange={(e) => setText(e.target.value)}/>
      </div>
      <div className="mb-3">
        <DatePicker
          selected={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          showTimeSelect
          dateFormat="Pp"
          placeholderText="Select a date and time"
        />
      </div>
      <div className="text-center">
        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Edit Plan</button>
      </div>
    </form>
  )
}

export default EditPlan;
