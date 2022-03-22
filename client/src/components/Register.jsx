import React, { useState, useContext } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import axios from 'axios'
import { adddata } from '../context/createContext'

const Register = () => {
  const { udata, setUdata } = useContext(adddata)
  const histore = useHistory()
  const [inpval, setINP] = useState({
    name: '',
    email: '',
    age: '',
    mobile: '',
    work: '',
    add: '',
    desc: '',
  })
  const setdata = (e) => {
    console.log(e.target.value)
    const { name, value } = e.target
    setINP((preval) => {
      return {
        ...preval,
        [name]: value,
      }
    })
  }
  const dataSubmit = async (e) => {
    e.preventDefault()
    const { name, email, age, mobile, work, add, desc } = inpval
    try {
      const config = {
        header: {
          'content-type': 'application/json',
        },
      }
      const res = await axios.post(
        '/register',
        { name, email, age, mobile, work, add, desc },
        config,
      )

      console.log(res)
      setUdata(res)
      histore.push('/')
    } catch (error) {
      alert('fill the fields properly')
    }
  }
  return (
    <div>
      {' '}
      <div>
        {' '}
        <div className="container">
          <NavLink to="/">Register your self</NavLink>
          <form className="mt-4" onSubmit={dataSubmit}>
            <div className="row">
              <div className="mb-3 col-lg-6 col-md-6 col-12">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  value={inpval.name}
                  onChange={setdata}
                  name="name"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="mb-3 col-lg-6 col-md-6 col-12">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  email
                </label>
                <input
                  type="email"
                  value={inpval.email}
                  onChange={setdata}
                  name="email"
                  className="form-control"
                  id="exampleInputPassword1"
                />
              </div>
              <div className="mb-3 col-lg-6 col-md-6 col-12">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  age
                </label>
                <input
                  type="text"
                  value={inpval.age}
                  onChange={setdata}
                  name="age"
                  className="form-control"
                  id="exampleInputPassword1"
                />
              </div>
              <div className="mb-3 col-lg-6 col-md-6 col-12">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Mobile
                </label>
                <input
                  type="number"
                  value={inpval.mobile}
                  onChange={setdata}
                  name="mobile"
                  className="form-control"
                  id="exampleInputPassword1"
                />
              </div>
              <div className="mb-3 col-lg-6 col-md-6 col-12">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Work
                </label>
                <input
                  type="text"
                  value={inpval.work}
                  onChange={setdata}
                  name="work"
                  className="form-control"
                  id="exampleInputPassword1"
                />
              </div>
              <div className="mb-3 col-lg-6 col-md-6 col-12">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Address
                </label>
                <input
                  type="text"
                  value={inpval.add}
                  onChange={setdata}
                  name="add"
                  className="form-control"
                  id="exampleInputPassword1"
                />
              </div>
              <div className="mb-3 col-lg-12 col-md-12 col-12">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Description
                </label>
                <textarea
                  name="desc"
                  value={inpval.desc}
                  onChange={setdata}
                  className="form-control"
                  id=""
                  cols="30"
                  rows="5"
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
