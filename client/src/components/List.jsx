import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import EditPlan from "./EditPlan";
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/list.css'

function List() {
  const {id} = useParams();
  const [list, setList] = useState(null);
  const [plans, setPlans] = useState([]);

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
            <EditPlan list={list} setPlans={setPlans}/>
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
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {plans.map((plan, index) => {
                return (<tr key={plan._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{plan.name}</td>
                  <td>{plan.text}</td>
                  <td>{plan.due}</td>
                  <td>
                    <Link to={`/plan/${plan._id}`}>
                      <img src={`${process.env.PUBLIC_URL}/764599.png`} alt="Icon" className="icon"/>
                    </Link>
                  </td>
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
