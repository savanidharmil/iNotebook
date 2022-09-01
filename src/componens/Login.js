import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'

function Login(props) {
    const [credentials, setCredentials] = useState({email:"", password:""});
    let history = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                'content-type':'Application/json'
            },
            body: JSON.stringify({email:credentials.email,password:credentials.password})
        });
        const json = await response.json();
        if(json.success){
            // console.log(json)
            // save the auth tocken and redirect to home page
            localStorage.setItem('token',json.authToken);
            history("/", { replace: true });
            props.showAlert("Logged in Successfully","success");
        }else{
            props.showAlert("Invelid Details", "danger");
        }
    }
    const onChange= (e) =>{
        setCredentials({...credentials, [e.target.name]:e.target.value})
    }

  return (
    <>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" name="email" onChange={onChange} value={credentials.email} />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" name="password" onChange={onChange} value={credentials.password}/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </>
  )
}

export default Login
