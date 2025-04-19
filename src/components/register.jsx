import React from 'react'
import brandlogo from '../constants/main-logo/brandlogo.jpg'
import { Input } from '../ui'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { signUserFailure, signUserStart, signUserSucces } from '../slice/auth'
import { ValidationError} from './'
import { useNavigate } from 'react-router-dom'
import AuthService from '../service/auth'
const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const {isLoading, isLoggedIn} = useSelector(state => state.auth)
  const navigate = useNavigate()
  console.log(isLoggedIn)
const registerHandler = async (e) => {
  e.preventDefault()
  dispatch(signUserStart())
  const user = {username: name, email, password}
  try {
    const response = await AuthService.userRegister(user)
    dispatch(signUserSucces(response.user))
    navigate('/')
  } catch (error) {
    console.log(error.response.data.errors)
    dispatch(signUserFailure(error.response.data.errors))
  }
}

  return (
    <div className='container text-center' style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '50px'}}>
      <form className='w-25'>
        <img className="mb-4" src={brandlogo} alt="" width="72" height="72"/>
        <h1 className="h3 mb-3 fw-normal">Please sign up</h1>
        <ValidationError/>

       <Input label="Email" formId={"floatingEmail"} type="email"  state={email} setState={setEmail}/>

       <Input label="Password" formId={"floatingPassword"} type="password" marginTop={"15px"} state={password} setState={setPassword}/>   

       <Input label="Username" formId={"floatingName"} marginTop={"15px"} state={name} setState={setName}/>


        <button className="btn btn-dark w-100 py-2 mt-3" onClick={e => registerHandler(e)} disabled={isLoading} type="submit">{isLoading ? "Loading...": "Register"}</button>
        <p className="mt-5 mb-3 text-body-secondary">© by Radjabov 2025</p>
  </form>
    </div>
  )
}

export default Register