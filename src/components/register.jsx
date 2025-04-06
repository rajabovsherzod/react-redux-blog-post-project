import React from 'react'
import brandlogo from '../constants/main-logo/brandlogo.jpg'
import { Input } from '../ui'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { registerUserFailure, registerUserStart, registerUserSucces } from '../slice/auth'
import AuthService from '../service/auth'
const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const {isLoading} = useSelector(state => state.auth)

const registerHandler = async (e) => {
  e.preventDefault()
  dispatch(registerUserStart())
  const user = {username: name, email, password}
  try {
    const response = await AuthService.userRegister(user)
    console.log(response)
    console.log(user)
    dispatch(registerUserSucces())
  } catch (error) {
    dispatch(registerUserFailure())
  }
}

  return (
    <div className='container text-center' style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '50px'}}>
      <form className='w-25'>
        <img className="mb-4" src={brandlogo} alt="" width="72" height="72"/>
        <h1 className="h3 mb-3 fw-normal">Please sign up</h1>

       <Input label="Username" formId={"floatingName"} state={name} setState={setName}/>

       <Input label="Email" formId={"floatingEmail"} type="email" marginTop={"15px"} state={email} setState={setEmail}/>

       <Input label="Password" formId={"floatingPassword"} type="password" marginTop={"15px"} state={password} setState={setPassword}/>

        <button className="btn btn-dark w-100 py-2 mt-3" onClick={e => registerHandler(e)} disabled={isLoading} type="submit">{isLoading ? "Loading...": "Register"}</button>
        <p className="mt-5 mb-3 text-body-secondary">© by Radjabov 2025</p>
  </form>
    </div>
  )
}

export default Register