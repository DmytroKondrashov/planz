import { useState } from "react"
import { useAuth } from "../hooks/AuthProvider";

function SignInForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const auth = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (formData.email !== '' && formData.password !== '') {
        auth.loginAction(formData);
        return;
      } else {
        alert("pleae provide a email and password!")
      }
    } catch (err) {
      console.error(err);
    } 
  }

  return (
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
            <div className="text-center">
              <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default SignInForm
