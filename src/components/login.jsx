import React from 'react'
import brandlogo from '../constants/main-logo/brandlogo.jpg'
import { Input } from '../ui'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signUserFailure, signUserStart, signUserSucces } from '../slice/auth'
import AuthService from '../service/auth'
const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const {isLoading} = useSelector(state => state.auth)
  console.log(isLoading)

  const loginHandler =async (e) => {
    e.preventDefault()
    dispatch(signUserStart())
    const user = {email, password}
    try {
      const response = await AuthService.userLogin(user)
      dispatch(signUserSucces(response.data.user))
      console.log(response.data.user)
    } catch (error) {
      dispatch(signUserFailure(error.response.data.errors))
    }
  }
  
  return (
    <div className='container text-center' style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '50px'}}>
              <form className='w-25'>
                <img className="mb-4" src={brandlogo} alt="" width="72" height="72"/>
                <h1 className="h3 mb-3 fw-normal">Please login</h1>

              <Input label="Email" type="email" formId={"floatingEmail"} marginTop={"15px"} state={email} setState={setEmail}/>

              <Input label="Password" type="password" formId={"floatingPassword"} marginTop={"15px"} state={password} setState={setPassword}/>

                <button className="btn btn-dark w-100 py-2 mt-3" disabled={isLoading} onClick={e => loginHandler(e)} type="submit">{isLoading ? "Loading..." : "Login"}</button>
                <p className="mt-5 mb-3 text-body-secondary">© by Radjabov 2025</p>
          </form>
    </div>
  )
}

export default Login