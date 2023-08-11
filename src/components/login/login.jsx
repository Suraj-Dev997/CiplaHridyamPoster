import React, { useContext, useState } from "react";
import "./login.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASEURL } from "../../constant/constant";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IdContext } from "../../context/AuthContext";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const [showPassword, setShowPassword] = useState(false);

  const [error,setError] = useState("");
  const navigate = useNavigate()
  const {handelLogin} = useContext(IdContext)
  const handleSubmit = (e) => {
    e.preventDefault();
  
  axios.post(`${BASEURL}/login`,{email,password})
  .then((res)=>{
    if(res.status===200){
      toast.success('Login Successful');
      //navigate("/dashboard")
      sessionStorage.setItem('isLoggedIn', 'true');
      handelLogin(true)
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
      setError("")
      
    }
    else{
      //toast.error("Invalid Credential")
      setError("Invalid Credential")
    }
  }).catch((err)=>{
    
    //toast.error('Invalid Credential');
    setError("Invalid Credential")
    
  });
  };

  // const togglePasswordVisibility = () => {
  //   setShowPassword(!showPassword);
  // };

  return (
    <div className="login_container">
	<div className="screen">
		<div className="screen__content">
			<form className="login" onSubmit={handleSubmit}>
				<div className="login__field">
					<i className="login__icon fas fa-user"></i>
					<input type="text" className="login__input" placeholder=" Email"
          onChange={(e)=>{
            setEmail(e.target.value)
          }}
          />
				</div>
				<div className="login__field">
					<i className="login__icon fas fa-lock"></i>
					<input type="password" className="login__input" placeholder="Password"
          onChange={(e)=>{
            setPassword(e.target.value)
          }}
          />
          {error && <p style={{color:"red"}}>😈 { error}</p>}
				</div>
				<button className="button login__submit" type="submit">
					<span className="button__text">Log In </span>
					<i className="button__icon fas fa-chevron-right"></i>
				</button>				
			</form>
			<div className="social-login">
				
			</div>
		</div>
		<div className="screen__background">
			<span className="screen__background__shape screen__background__shape4"></span>
			<span className="screen__background__shape screen__background__shape3"></span>		
			<span className="screen__background__shape screen__background__shape2"></span>
			<span className="screen__background__shape screen__background__shape1"></span>
		</div>		
	</div>
  <ToastContainer/>
</div>
  );
}

export default Login;
