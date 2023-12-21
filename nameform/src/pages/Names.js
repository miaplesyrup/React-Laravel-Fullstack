import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';

function Names() {

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/names').then(res => {
      console.log(res);
    })
  },[]);

  return (
    <div className='container mt-5'>
      <div className='row'>
        <div className='col-md-12'>
          <div className='card'>
            <div className='card-header'>
              <h4>List of Names
                <Link to="/" className='btn btn-primary float-end'>Add Name</Link>
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
                  <tr></tr>
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