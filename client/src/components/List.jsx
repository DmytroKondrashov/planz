import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function List() {
  const {id} = useParams();
  const [list, setList] = useState(null);
  const [plans, setPlans] = useState([]);
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [errors, setErrors] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

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
          planId: list._id
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok!')
      }
      await fetchPlans();
    } catch (error) {
      setErrors(...error, error.message);
    }
  }

  useEffect(() => {
    const user = localStorage.getItem('site');

    const fetchData = async() => {
      const listResponse = await fetch(`http://localhost:3001/lists/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${user}`
        }
      })

      const list = await listResponse.json();
      setList(list);

      await fetchPlans();
    }

    fetchData();
  }, [id])

  return(
    <>
      <h1 className="text-center">This is list</h1>
      <>
          <div className='col-xl-auto d-flex justify-content-center'>
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
          </div>
      </>
      {/* TODO: in thois table there should be a list of plans */}
      <table className="table mt-5 ps-5 pe-5">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Larry</td>
            <td>the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
    </table>
    </>
  )
}

export default List;
