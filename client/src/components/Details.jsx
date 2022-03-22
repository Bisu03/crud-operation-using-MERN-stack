import React, { useEffect, useState,useContext } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import CreateIcon from '@mui/icons-material/Create'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import WorkIcon from '@mui/icons-material/Work'
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import { adddata } from '../context/createContext'

const Details = () => {
  const { itemtdata } = useContext(adddata)
  const [getuserdata, setUserdata] = useState([])
  const { id } = useParams('')
  console.log(id)

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
      setUserdata(data)
      console.log('get data')
    }
  }

  useEffect(() => {
    getdata()
  })

  return (
    <div>
      {' '}
      <div className="container mt-3">
        <h1 style={{ fontWeight: 400 }}>Welcome Harsh Pathak</h1>

        <Card sx={{ maxWidth: 600 }}>
          <CardContent>
            <div className="add_btn">
              <NavLink to={`/edit/${getuserdata._id}`}>
                {' '}
                <button className="btn btn-primary mx-2">
                  <CreateIcon />
                </button>
              </NavLink>
              <button className="btn btn-danger" onClick={()=>itemtdata(getuserdata._id)}>
                <DeleteOutlineIcon />
              </button>
            </div>
            <div className="row">
              <div className="left_view col-lg-6 col-md-6 col-12">
                <img
                  src="https://www.dgvaishnavcollege.edu.in/dgvaishnav-c/uploads/2021/01/dummy-profile-pic.jpg"
                  style={{ width: 50 }}
                  alt="profile"
                />
                <h3 className="mt-3">
                  Name: <span>{getuserdata.name}</span>
                </h3>
                <h3 className="mt-3">
                  Age: <span>{getuserdata.age}</span>
                </h3>
                <p className="mt-3">
                  <MailOutlineIcon />
                  Email: <span>{getuserdata.email}</span>
                </p>
                <p className="mt-3">
                  <WorkIcon />
                  Occuption: <span>{getuserdata.job}</span>
                </p>
              </div>
              <div className="right_view  col-lg-6 col-md-6 col-12">
                <p className="mt-5">
                  <PhoneAndroidIcon />
                  mobile: <span>{getuserdata.mobile}</span>
                </p>
                <p className="mt-3">
                  <LocationOnIcon />
                  location: <span>{getuserdata.add}</span>
                </p>
                <p className="mt-3">
                  Description: <span>{getuserdata.desc}</span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Details
