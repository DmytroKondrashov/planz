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

  const handleDelete = async(id) => {
    const user = localStorage.getItem('site');
    await fetch(`http://localhost:3001/plans/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${user}`
      }
    })
    fetchPlans();
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
          listId: list._id
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
    }

    fetchData();
  }, [id])

  useEffect(() => {
    if (list) {
      fetchPlans();
    }
  }, [list]);

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
      {plans.length ? <>
        <div className=" mt-5 ps-5 pe-5">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Text</th>
                <th scope="col">Due</th>
              </tr>
            </thead>
            <tbody>
              {plans.map((plan, index) => {
                return (<tr key={plan._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{plan.name}</td>
                  <td>{plan.text}</td>
                  <td>{plan.due}</td>
                  <td><a className="text-danger text-decoration-none" href="#" onClick={() => handleDelete(plan._id)}>X</a></td>
                </tr>)
              })}
            </tbody>
          </table>
        </div>
      </> : <><h3 className="mt-5 text-center">There are no plans here yet. Maybe create one?</h3></>}
    </>
  )
}

export default List;
