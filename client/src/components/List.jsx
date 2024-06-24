import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function List() {
  const {id} = useParams();
  const [list, setList] = useState(null);
  const [plans, setPlans] = useState([]);

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


      const plansResponse = await fetch(`http://localhost:3001/plans/${list._id}`, {
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer: ${user}`
        }
      });

      const plans = await plansResponse.json();
      setPlans(plans);
    }

    fetchData();
  }, [id])

  return(
    <>
      <h1 className="text-center">This is list</h1>
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
