import { useState } from "react";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";

function SignUpOrLogIn() {
  const [form, setForm] = useState(undefined);

  return (
    <>
      <h5 className="w-100 mt-5 text-center">Please <button className="btn btn-primary" onClick={() => setForm('signUp')}>sign up</button> or <button className="btn btn-secondary" onClick={() => setForm('signIn')}>log in</button></h5>
      <div className="mt-5">
        {form === 'signUp' && <SignUpForm/>}
        {form === 'signIn' && <SignInForm/>}
      </div>
    </>
  )
}

export default SignUpOrLogIn;
