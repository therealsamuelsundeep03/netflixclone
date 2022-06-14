import { Redirect } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';

import "../css/intro.css";
import netflixLogo from "../pngkey.com-spacex-logo-png-1407852.png";

function Intro () {
    const [emailID,setEmailId] = useState ({
        email : "",
        errors:{
            email : "",
        }
    })

    const handleChange =({target:{name,value}}) => {
        const errors = emailID.errors;

        // if email an password feilds are empty then send an error message..
        switch(name){
            case "email":
            errors.email = !value ?  "email is required" : "";
            break;
            default : break;
        }
        setEmailId({...emailID,[name]:value},errors)
    }


    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            const errors = Object.values(emailID.errors.email);
            if(!errors.length && emailID.email.length){
                  // store the email and password in an obj and send it to the backend for further validations...
                  const credential = {
                    email:emailID.email,
                }
    
                let response = await axios.post("https://dennetflixclone.herokuapp.com/login",credential);
                console.log(response.data)
    
                // if email doesn't exists then send a error message...
                if(response.data == "Email doesnt exists"){
                    localStorage.setItem('email',emailID.email)
                    window.location.href="/password/:newuser"
                }else if(response.data.status == "User exists"){
    
                    // if all the validations are true save the email and login status in local storage and 
                    // redirect the user to the user exist page...
    
                    const email = response.data.email;
                    localStorage.setItem('email',email);
                    window.location.href="/password/:userexist"
                }         
            }
        }catch(err){
            console.log("Error in retrieving the user email::", err);
        }
    }


    return(
        <>
            <div className="intro">
                <div className="introBackground">
                    <img src = {netflixLogo}/>

                    <button className="signIn" onClick={()=>{window.location.href="/login"}}>sign In</button>

                    <div className="introFade" />

                    <div className="introBody">
                        <>
                            <h1>Unlimited movies, TV shows and more.</h1>
                            <h2>Watch anywhere. Cancel at any time.</h2>
                            <h3>Ready to watch? Enter your email to create or restart your membership.</h3>
                            <div className="introInp">
                                <form onSubmit={handleSubmit}>
                                    <input type="email"
                                    placeholder="Email Address"
                                    value={emailID.email}
                                    onChange={handleChange}
                                    name="email"
                                    // required
                                    />
                                    <button className="getStarted">GET STARTED</button>
                                    <div className="introerror">{emailID.errors.email}</div>
                                </form>
                            </div>
                        </>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Intro;
