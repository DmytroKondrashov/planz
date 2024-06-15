import React, { useEffect, useState } from 'react';

function Lists() {
  const [lists, setLists] = useState(null);
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
        setError(error.message);
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

  return (
    <div>
      <h1>YOUR LISTS HERE</h1>
      <ul>
        {lists.map(list => (
          <li key={list.id}>{list.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Lists;
