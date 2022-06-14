import { useState } from "react";
import axios from "axios";

import "../css/login.css";
import netflixLogo from "../pngkey.com-spacex-logo-png-1407852.png"


function Login () {
    const [credentials,setCredentials] = useState ({
        email : "",
        password : "",
        errors:{
            email : "",
            password : ""
        }
    })

    const [error,setError] = useState("")

    const handleChange = ({target : {name,value}}) => {
        const errors = credentials.errors;

        // if email an password feilds are empty then send an error message..
        switch(name){
            case "email":
            errors.email = !value ?  "Please enter a valid email address." : "";
            break;
            case "password": {
                if(!value || value.length < 4 || value.length > 80){
                    errors.password = "Your password must contain between 4 and 60 characters.";
                }else{
                    errors.password = "";
                }
            }
            break;
            default : break;
        }
        setCredentials({...credentials,[name]:value},errors)
    }
    console.log(credentials.password)

    const handleSubmit = async(e) => {
        try{
            e.preventDefault();

            // store the email and password in an obj and send it to the backend for further validations...
            const credential = {
                email:credentials.email,
                password:credentials.password
            }

            const errors = credentials.errors;
            let response = await axios.post("http://localhost:3000/login",credential);
            // if email doesn't exists then send a error message...
            if(response.data == "Email doesnt exists"){
                setError("Sorry, we can't find an account with this email address.")
            }else if(response.data.status == "password is incorrect"){

                // if the password is not same as stored in the database then send an error message... 
                setError("Incorrect password. Please try again.");
            }else if(Object.keys(response.data).includes("UserExists")){

                // if all the validations are true save the user object id and login status in local storage and 
                // redirect the user to the home page...

                const id = response.data.id;
                localStorage.setItem('isloggedin',true);
                localStorage.setItem('id',id);
                window.location.href="/home";
            }
            setCredentials({...credentials,errors})
        }
        catch(err){
            console.log(err)
        }
    }

    console.log(error);

    return (
        <>
        <div className="intro">

                {/*background of the page...*/}

                <div className="introBackground">
                    <img src = {netflixLogo}/>
                    <button className="signIn" onClick={()=>{window.location.href="/login"}}>sign In</button>
                    <div className="introFade" />
                    <div className="login">

                {/* form  */}
                <form onSubmit={handleSubmit}>
                    <h1>Sign In</h1>

                    {/* backend error message */}
                    {error && <span className="signinerror">{error}</span>}

                    {/* email */}
                    <input type={"email"} 
                        placeholder="Email"
                        className="loginInp" name="email"
                        value={credentials.email}  
                        onChange={handleChange}/>

                    {/* email error message */}
                    <span className="errmessg" >{credentials.errors.email}</span>

                    {/* password */}
                    <input type="password"
                    placeholder="Password"
                    className="loginInp"
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}/>

                    {/* password error message */}
                    <span className="errmessg" >{credentials.errors.password}</span>

                    <button type="submit">Sign In</button>

                    {/* sign up info */}
                    <div className="signupbutton">
                        <span style={{color:'grey'}}>New to Netflix? </span>
                        <span  className="reg" onClick={()=>{window.location.href="/in"}}>Sign Up Now.</span>
                    </div>
                </form>
            </div>
                    
                </div>
            </div>
           
        </>
    )
}

export default Login;