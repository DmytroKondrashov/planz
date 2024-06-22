import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Lists() {
  const [lists, setLists] = useState(null);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = localStorage.getItem('site');
        const response = await fetch('http://localhost:3001/lists', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${user}`
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setLists(data);
      } catch (error) {
        setError(...error, error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleChange = (e) => {
    const { value } = e.target;
    setName(value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = localStorage.getItem('site');
      const response = await fetch('http://localhost:3001/lists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${user}`
        },
        body: JSON.stringify({ name })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok!')
      }
      const data = await response.json();
      setLists([...lists, data]);
    } catch (error) {
      setError(...error, error.message);
    }
  }

  return (
    <div>
      <div className='row justify-content-center align-items-center mt-5'>
        <h1 className="text-center">YOUR LISTS HERE</h1>
        { 
        (<>
            <div className='col-6 col-xl-auto'>
              <form>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Create new List</label>
                  <input type="name" className="form-control" id="name" value={name} onChange={handleChange} name='name'/>
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Create</button>
                </div>
              </form>
            </div>
        </>)}
        <ul className='mt-5'>
          {lists.map(list => (
            <li className='text-center' key={list.id}><Link to={`/lists/${list.id}`}>{list.name}</Link></li>
          ))}
        </ul>
      </div> 
    </div>
  );
}

export default Lists;
