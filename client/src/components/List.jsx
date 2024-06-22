import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function List() {
  const {id} = useParams();
  const [list, setList] = useState(null);

  useEffect(() => {
    const fetchData = async() => {
      const user = localStorage.getItem('site');
      const response = await fetch(`http://localhost:3001/lists/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${user}`
        }
      })

      const data = await response.json();
      console.log(data)
      setList(data);
    }

    fetchData();
  }, [id])

  return(
    <>
      <h1 className="text-center">This is list</h1>
      {/* TODO: in thois table there should be a list of plans */}
      <table class="table mt-5">
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
