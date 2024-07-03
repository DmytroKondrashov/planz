import { useState } from "react";
import DatePicker from 'react-datepicker';

function EditPlan(plan) {
  console.log(plan)
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  }

  const handleSubmit = () => {}

  return(
    <form>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Plan Name</label>
        <input type="name" className="form-control" value={name}/>
      </div>
      <div className="mb-3">
        <label htmlFor="text" className="form-label">Plan Text</label>
        <input type="text" className="form-control" value={text}/>
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
        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Edit Plan</button>
      </div>
    </form>
  )
}

export default EditPlan;
