import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useParams, useHistory } from 'react-router-dom'
import { adddata } from '../context/createContext'
import axios from 'axios'
const Edit = () => {
  const { setUPdata} = useContext(adddata)
  const histore = useHistory()
  const { id } = useParams('')
  console.log(id)
  //   const { updata, setUPdata } = useContext(updatedata)
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

  const getdata = async () => {
    const res = await fetch(`https://crudapimern.herokuapp.com/getuser/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await res.json()
    console.log(data)

    if (res.status === 422 || !data) {
      console.log('error ')
    } else {
      setINP(data)
      console.log('get data')
    }
  }

  useEffect(() => {
    getdata()
  })

  const dataSubmit = async (e) => {
    e.preventDefault()
    const { name, email, age, mobile, work, add, desc } = inpval
    try {
      const config = {
        header: {
          'content-type': 'application/json',
        },
      }
      const res = await axios.patch(
        `https://crudapimern.herokuapp.com/updateuser/${id}`,
        { name, email, age, mobile, work, add, desc },
        config,
      )
      console.log(res)
      setUPdata(res)
      histore.push('/')
    } catch (error) {
      alert('fill the fields properly')
    }
  }
  return (
    <div>
      {' '}
      <div className="container">
        <NavLink to="/">edit your details</NavLink>
        <form className="mt-4" onSubmit={dataSubmit}>
          <div className="row">
            <div className="mb-3 col-lg-6 col-md-6 col-12">
              <label for="exampleInputEmail1" className="form-label">
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
              <label for="exampleInputPassword1" className="form-label">
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
              <label for="exampleInputPassword1" className="form-label">
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
              <label for="exampleInputPassword1" className="form-label">
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
              <label for="exampleInputPassword1" className="form-label">
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
              <label for="exampleInputPassword1" className="form-label">
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
              <label for="exampleInputPassword1" className="form-label">
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
  )
}

export default Edit
