import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';
import Loading from '../components/Loading';

function Names() {

  const [loading, setLoading] = useState(true);
  const [names, setNames] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/names').then(res => {
      setNames(res.data.names);
      setLoading(false);
    })
  },[]);

  if(loading){
    return (
      <Loading />
      )
  }

  let nameDetails = "";
  nameDetails = names.map((item,index) => {
    return (
      <tr key={index}>
        <td>{item.id}</td>
        <td>{item.firstName}</td>
        <td>{item.lastName}</td>
        <td>{item.email}</td>
        <td>{item.address}</td>
        <td>{item.phone}</td>
        <td>
          <Link to="/" className="btn btn-success">Edit</Link>
        </td>
        <td>
          <button className='btn btn-danger'>Delete</button>
        </td>
      </tr>
    )
  })

  return (
    <div className='container mt-5'>
      <div className='row'>
        <div className='col-md-12'>
          <div className='card'>
            <div className='card-header'>
              <h4>List of Names
                <Link to="/names/create" className='btn btn-primary float-end'>Add Name</Link>
              </h4>
            </div>
            <div className='card-body'>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Phone</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {nameDetails}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Names