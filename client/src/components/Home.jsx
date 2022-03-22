import React, { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { AiFillDelete, AiFillEye } from 'react-icons/ai'
import { BsPencilSquare } from 'react-icons/bs'
import axios from 'axios'
import { adddata } from '../context/createContext'

const Home = () => {
  const { udata } = useContext(adddata)
  const { updata } = useContext(adddata)
  const { dltdata, setDLTdata } = useContext(adddata)
  const { setitemdata } = useContext(adddata)
  const [getuserdata, setUserdata] = useState([])
  console.log(getuserdata)

  const getdata = async () => {
    const res = await fetch('https://crudapimern.herokuapp.com/getdata', {
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
      setUserdata(data)
      console.log('get data')
    }
  }
  useEffect(() => {
    getdata()
  })
  const deleteuser = async (id) => {
    try {
      const config = {
        header: {
          'content-type': 'application/json',
        },
      }
      const res = await axios.delete(`https://crudapimern.herokuapp.com/deleteuser/${id}`, config)
      setDLTdata(res)
      setDLTdata(setitemdata)
      console.log('delete user')
      getdata()
    } catch (error) {
      alert('fill the fields properly')
      console.log(error)
    }
  }

  return (
    <div>
      <>
        {udata ? (
          <div
            className="alert alert-success alert-dismissible fade show"
            role="alert"
          >
            <strong>user</strong> added succesfully!
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        ) : null}

        {updata ? (
          <div
            className="alert alert-success alert-dismissible fade show"
            role="alert"
          >
            <strong>user</strong> updated succesfully!
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        ) : null}
        {dltdata ? (
          <div
            className="alert alert-danger alert-dismissible fade show"
            role="alert"
          >
            <strong>user</strong> deleted succesfully!
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        ) : null}

        <div className="mt-5">
          <div className="container">
            <div className="add_btn mt-2 mb-2">
              <NavLink to="/register" className="btn btn-primary">
                Add data
              </NavLink>
            </div>

            <table className="table">
              <thead>
                <tr className="table-dark">
                  <th scope="col">id</th>
                  <th scope="col">Username</th>
                  <th scope="col">email</th>
                  <th scope="col">Job</th>
                  <th scope="col">Number</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {getuserdata.map((element, id) => (
                  <tr key={id}>
                    <th scope="row">{id + 1}</th>
                    <td>{element.name}</td>
                    <td>{element.email}</td>
                    <td>{element.work}</td>
                    <td>{element.mobile}</td>
                    <td className="d-flex justify-content-between">
                      <NavLink to={`/view/${element._id}`}>
                        <button className="btn btn-success">
                          <AiFillEye />
                        </button>
                      </NavLink>
                      <NavLink to={`/edit/${element._id}`}>
                        <button className="btn btn-primary">
                          <BsPencilSquare />
                        </button>
                      </NavLink>
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteuser(element._id)}
                      >
                        <AiFillDelete />
                      </button>{' '}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    </div>
  )
}

export default Home
