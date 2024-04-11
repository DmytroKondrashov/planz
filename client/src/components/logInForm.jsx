import React, { useState } from 'react';

function LogInForm() {
  const [ formData, setFormData ] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [ name ]: value,
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = fetch('http://localhost:3000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok!')
      }

      const data = await response.json();
      console.log(data);

    } catch(err) {
      console.error('There was a problem with your fetch operation:', err);
    }
  }

  return(
    <>
      <form>
        <div className="mb-3">
          <label for="email1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" aria-describedby="emailHelp"  value={formData.email} onChange={handleChange}/>
        </div>
        <div className="mb-3">
          <label for="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" value={formData.password} onChange={handleChange}/>
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
      </form>
    </>
  )
}

export default LogInForm;
