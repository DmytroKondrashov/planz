import { useState } from "react";
import SignUpForm from "./SignUpForm";

function SignUpOrLogIn() {
  const [form, setForm] = useState(undefined);

  return (
    <>
      <h5 className="w-100 mt-5 text-center">Please <button className="btn btn-primary" onClick={() => setForm('signUp')}>sign up</button> or <button className="btn btn-secondary" onClick={() => setForm('signIn')}>log in</button></h5>
      <div className="mt-5">
        {form === 'signUp' && <SignUpForm/>}
        {form === 'signIn' && <h4 className="w-100 text-center">Log in form is currently in development!</h4>}
      </div>
    </>
  )
}

export default SignUpOrLogIn;
