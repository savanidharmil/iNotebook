import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'

function Signup(props) {
  const [credentials, setCredentials] = useState({name:"",email:"", password:"", cpassword:""});
    let history = useNavigate();
    const {name,email,password}=credentials;
    const handleSubmit = async (e) => {
        e.preventDefault(); 
        const response = await fetch("http://localhost:5000/api/auth/createUser", {
            method: "POST",
            headers: {
                'content-type':'Application/json'
            },
            body: JSON.stringify({name,email,password})
        });
        const json = await response.json();
        if(json.success){
            console.log(json)
            // save the auth tocken and redirect to home page
            localStorage.setItem('token',json.authtoken);
            history("/", { replace: true });
            props.showAlert("Account Created Successfully","success");
        }else{
            props.showAlert("Invelid Credentials","danger");
        }
    }
    const onChange= (e) =>{
        setCredentials({...credentials, [e.target.name]:e.target.value})
    }
  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" name="name" onChange={onChange} value={credentials.name} required  />
            <div id="nameHelp" className="form-text">We'll never share your name with anyone else.</div>
        </div>
        <div className="mb-3">
            <label htmlFor="Email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" name="email" onChange={onChange} value={credentials.email} required  />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" name="password" onChange={onChange} value={credentials.password} minLength={5} required />
        </div>
        <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">Confirm Password</label>
            <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} value={credentials.cpassword} minLength={5} required />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup
