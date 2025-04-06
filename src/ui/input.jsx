import React from 'react'

const Input = ({label, type = "text", marginTop, state, setState}) => {
  return (
    <div className='form-floating' style={{marginTop: marginTop}}>
          <input type={type} class="form-control" id="floatingPassword" value={state} onChange={e => setState(e.target.value)} placeholder={label}/>
          <label for="floatingPassword">{label}</label>
    </div>
  )
}

export default Input