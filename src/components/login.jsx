import React from 'react'
import brandlogo from '../constants/main-logo/brandlogo.jpg'
import { Input } from '../ui'
import { useState } from 'react'
const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  return (
    <div className='container text-center' style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '50px'}}>
              <form className='w-25'>
                <img class="mb-4" src={brandlogo} alt="" width="72" height="72"/>
                <h1 class="h3 mb-3 fw-normal">Please login</h1>

              <Input label="Email" type="email" marginTop={"15px"} state={email} setState={setEmail}/>

              <Input label="Password" type="password" marginTop={"15px"} state={password} setState={setPassword}/>

                <button class="btn btn-dark w-100 py-2 mt-3" type="submit">Login</button>
                <p class="mt-5 mb-3 text-body-secondary">© by Radjabov 2025</p>
          </form>
    </div>
  )
}

export default Login