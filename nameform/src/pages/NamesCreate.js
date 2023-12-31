import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Loading from "../components/Loading";

function NamesCreate() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [inputErrorList, setInputErrorList] = useState({});
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
    
    setLoading(true);
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
      navigate('/names')
      setLoading(false);
    })
    .catch(function (error){
      if(error.response){
        if(error.response.status === 422){
          setInputErrorList(error.response.data.errors);
          setLoading(false);
        }
        if(error.response.status === 500){
          alert(error.response.data)
          setLoading(false);
        }
      }
    })
  }

  if(loading){
    return (
      <Loading />
      )
  }

  return (
    <div className='container mt-5'>
      <div className='row'>
        <div className='col-md-12'>
          <div className='card'>
            <div className='card-header'>
              <h4>Add Name
                <Link to="/names" className='btn btn-primary float-end'>Back</Link>
              </h4>
            </div>
            <div className='card-body'>
              <form onSubmit={saveName}>
                <div className='mb-3'>
                  <label>First Name</label>
                  <input type="text" value={names.firstName} onChange={handleInput}className='form-control' name='firstName' required />
                  <span className='text-danger'>{inputErrorList.firstName}</span>
                </div>
                <div className='mb-3'>
                  <label>Last Name</label>
                  <input type="text" value={names.lastName} onChange={handleInput}className='form-control' name='lastName' required />
                  <span className='text-danger'>{inputErrorList.lastName}</span>
                </div>
                <div className='mb-3'>
                  <label>Email</label>
                  <input type="text" value={names.email} onChange={handleInput}className='form-control' name='email' required />
                  <span className='text-danger'>{inputErrorList.email}</span>
                </div>
                <div className='mb-3'>
                  <label>Address</label>
                  <input type="text" value={names.address} onChange={handleInput}className='form-control' name='address' required />
                  <span className='text-danger'>{inputErrorList.address}</span>
                </div>
                <div className='mb-3'>
                  <label>Phone</label>
                  <input type="text" value={names.phone} onChange={handleInput}className='form-control' name='phone' required />
                  <span className='text-danger'>{inputErrorList.phone}</span>
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