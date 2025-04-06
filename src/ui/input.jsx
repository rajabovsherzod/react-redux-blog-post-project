import React from 'react'

const Input = ({label, type = "text", formId, marginTop, state, setState}) => {
  return (
    <div className='form-floating' style={{marginTop: marginTop}}>
          <input type={type} className="form-control" id={formId} value={state} onChange={e => setState(e.target.value)} placeholder={label}/>
          <label htmlFor="floatingPassword">{label}</label>
    </div>
  )
}

export default Input