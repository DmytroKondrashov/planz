import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignUpForm() {
  const navigate = useNavigate();
  
  const [ formData, setFormData ] = useState({
    email: '',
    password: '',
    passwordConfirmation: '',
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
      if (formData.password === formData.passwordConfirmation) {
        const response = await fetch('http://localhost:3001/auth/signup', {
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
        navigate('/lists');
      } else {
        throw new Error('Password is not confirmed!');
      }
    } catch(err) {
      console.error('There was a problem with your fetch operation:', err);
    }
  }

  return(
    <>
      <div className='row justify-content-center align-items-center mt-5'>
        <div className='col-6 col-xl-auto'>
          <form>
            <div className="mb-3">
              <label htmlFor="email1" className="form-label">Email address</label>
              <input type="email" className="form-control" id="email" aria-describedby="emailHelp" value={formData.email} onChange={handleChange} name='email'/>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" id="password" value={formData.password} onChange={handleChange} name='password'/>
            </div>
            <div className="mb-3">
              <label htmlFor="passwordConfirmation" className="form-label">Password confirmation</label>
              <input type="password" className="form-control" id="passwordConfirmation" value={formData.passwordConfirmation} onChange={handleChange} name='passwordConfirmation'/>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default SignUpForm;
