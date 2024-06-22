import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function List() {
  const {id} = useParams();
  const [list, setList] = useState(null);

  useEffect(() => {
    const fetchData = async() => {
      const user = localStorage.getItem('site');
      console.log(user)
      const response = await fetch(`http://localhost:3001/lists/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${user}`
        }
      })

      const data = await response.json();
      setList(data);
    }

    fetchData();
  }, [id])

  return(
    <>
      <h1>This is list</h1>
    </>
  )
}

export default List;
