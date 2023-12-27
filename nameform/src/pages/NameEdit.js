import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../components/Loading";

function NameEdit() {

  let {id} = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [inputErrorList, setInputErrorList] = useState({});
  const [name, setName] = useState({});

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/names/${id}/edit`).then(res => {
      console.log(res)
      setName(res.data.name);
      setLoading(false);
    })
    .catch(function (error){
      if(error.response){
        if(error.response.status === 404){
          alert(error.response.data.message);
          setLoading(false);
        }
        if(error.response.status === 500){
          alert(error.response.data)
          setLoading(false);
        }
      }
    })
  },[id]);

  const handleInput = (e) => {
    setName({ ...name, [e.target.name]: e.target.value })
  }

  const updateName = (e) => {
    e.preventDefault();
    
    setLoading(true);
    const data = {
      firstName: name.firstName,
      lastName: name.lastName,
      email: name.email,
      address: name.address,
      phone: name.phone
    }

    axios.put(`http://127.0.0.1:8000/api/names/${id}/edit`, data)
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
        if(error.response.status === 404){
          alert(error.response.data.message);
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

  if(Object.keys(name).length === 0) {
    return (
      <div className="container">
        <h4>No Such Name ID found</h4>
      </div>
    )
  }

  return (
    <div className='container mt-5'>
      <div className='row'>
        <div className='col-md-12'>
          <div className='card'>
            <div className='card-header'>
              <h4>Edit Name
                <Link to="/names" className='btn btn-primary float-end'>Back</Link>
              </h4>
            </div>
            <div className='card-body'>
              <form onSubmit={updateName}>
                <div className='mb-3'>
                  <label>First Name</label>
                  <input type="text" value={name.firstName} onChange={handleInput}className='form-control' name='firstName' required />
                  <span className='text-danger'>{inputErrorList.firstName}</span>
                </div>
                <div className='mb-3'>
                  <label>Last Name</label>
                  <input type="text" value={name.lastName} onChange={handleInput}className='form-control' name='lastName' required />
                  <span className='text-danger'>{inputErrorList.lastName}</span>
                </div>
                <div className='mb-3'>
                  <label>Email</label>
                  <input type="text" value={name.email} onChange={handleInput}className='form-control' name='email' required />
                  <span className='text-danger'>{inputErrorList.email}</span>
                </div>
                <div className='mb-3'>
                  <label>Address</label>
                  <input type="text" value={name.address} onChange={handleInput}className='form-control' name='address' required />
                  <span className='text-danger'>{inputErrorList.address}</span>
                </div>
                <div className='mb-3'>
                  <label>Phone</label>
                  <input type="text" value={name.phone} onChange={handleInput}className='form-control' name='phone' required />
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


export default NameEdit;