import React, { useState } from 'react';

function LogInForm() {
  const [ formData, setFormData ] = useState([

  ])

  return(
    <>
      <form>
        <div class="mb-3">
          <label for="email1" class="form-label">Email address</label>
          <input type="email" class="form-control" id="email" aria-describedby="emailHelp" />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input type="password" class="form-control" id="password" />
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </>
  )
}

export default LogInForm;
