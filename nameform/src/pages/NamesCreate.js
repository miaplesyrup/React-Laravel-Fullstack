import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function NamesCreate() {

  const [names, setNames] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    phone: ""
  });

  const handleInput = (e) => {
    setNames({ ...names, [e.target.name]: e.target.value })
  }

  const saveName = (e) => {
    e.preventDefault();
    
    const data = {
      firstName: names.firstName,
      lastName: names.lastName,
      email: names.email,
      address: names.address,
      phone: names.phone
    }

    axios.post('http://127.0.0.1:8000/api/names', data)
    .then(res => {
      alert(res.data.message);
    });
  }

  return (
    <div className='container mt-5'>
      <div className='row'>
        <div className='col-md-12'>
          <div className='card'>
            <div className='card-header'>
              <h4>Add Student
                <Link to="/names" className='btn btn-primary float-end'>Back</Link>
              </h4>
            </div>
            <div className='card-body'>
              <form onSubmit={saveName}>
                <div className='mb-3'>
                  <label>First Name</label>
                  <input type="text" value={names.firstName} onChange={handleInput}className='form-control' name='firstName' required />
                </div>
                <div className='mb-3'>
                  <label>Last Name</label>
                  <input type="text" value={names.lastName} onChange={handleInput}className='form-control' name='lastName' required />
                </div>
                <div className='mb-3'>
                  <label>Email</label>
                  <input type="text" value={names.email} onChange={handleInput}className='form-control' name='email' required />
                </div>
                <div className='mb-3'>
                  <label>Address</label>
                  <input type="text" value={names.address} onChange={handleInput}className='form-control' name='address' required />
                </div>
                <div className='mb-3'>
                  <label>Phone</label>
                  <input type="text" value={names.phone} onChange={handleInput}className='form-control' name='phone' required />
                </div>
                <button type="submit" className='btn btn-success'>Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


export default NamesCreate;