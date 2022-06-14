import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

import "../css/password.css";
import netflixLogo from "../pngkey.com-spacex-logo-png-1407852.png";


function Password ({match}) {
    const [email,setEmail] = useState("");
    const [userexist,setUserExist] = useState(false);
    const [err,setErr] = useState("");
    const [newUser,setNew] = useState(false)
    const [password,setPassword] = useState({
        pass : "",
        errors:{
            pass : "",
        }
    });

    useEffect(() => {
        const emailID =localStorage.getItem('email');
        setEmail(emailID);

        const url = match.url;
        if(url === "/password/:newuser"){
            setNew(true)
        }else if(url === "/password/:userexist"){
            setUserExist(true)
        }

    })

    const handleChange =({target:{name,value}}) => {
        let errors = password.errors;
         if(!value){
            errors.pass = "password is required!"; 
         }else if(value.length < 6 || value.length > 60){
             errors.pass = "Password should be between 6 and 60 characters long.";
         }else{
             errors.pass=""
         }
         setPassword({...password,[name]:value},errors);
    }

    const userExistFrom = async(e) => {
        e.preventDefault();

        try{
            const credential = {
                email:email,
                password:password.pass
            }

            let response = await axios.post("https://dennetflixclone.herokuapp.com/login/userexist",credential);

            // if password doesn't match then send a error message...
            if(response.data.status == "password correct"){

                // if all the validations are true save the email and login status in local storage and 
                // redirect the user to the user exist page...

                const id = response.data.id;
                localStorage.setItem('id',id);
                localStorage.setItem('isloggedin',true)
                window.location.href="/home"
            }else if(response.data = "password is incorrect"){
                setErr("Incorrect password");            
            }     
        }
        catch(err){
            console.log("Error in retrieving the password::", err);
        }
    }

    const newUserForm = async (e) => {
        e.preventDefault()
        try{
            const credential = {
                email:email,
                password:password.pass
            }

            if(credential.password.length == 0){
                alert("please enter the password")
            }else{
                let response = await axios.post("https://dennetflixclone.herokuapp.com/login/newuser",credential);
                console.log(response.data)
                // create new user
                if(response.data == "user created"){

                    // if user is created then redirect him to the intro page...
                    alert('user created. For access, please login again...')
                    window.location.href="/in"
                }     
            }
        }
        catch(err){
            console.log("Error in retrieving the password::", err);
        }
    }


    return(
        <div className="passBody">
            <div className="passNav">
                <img src={netflixLogo}/>
                <hr />
            </div>
            {newUser && (
                <div className="passintro">
                <h1>Create a password to start your membership</h1>
                <div>Just a few more steps and you're done! We hate paperwork, too.</div>
                    <form className="passform" onSubmit={newUserForm}>
                        <input type="email" value={email} name="email" className="passInp"/>
                        <input type="password" value={password.pass} name="pass" 
                        className="passInp" onChange={handleChange}  placeholder="Enter your password"/>
                        <div className="passerr">{password.errors.pass}</div>
                        <button type="submit" className="passsub">submit</button>
                    </form> 
                 </div>
            )} 
            {userexist && (
                <div className="passintro">
                {err && <div className="passbackerr">{err}</div>}
                <h1 className="existuserwlcm">Welcome back! Joining Netflix is easy.</h1>
                <div>Enter your password and you'll be watching in no time.</div>
                    <form className="passform" onSubmit={userExistFrom}>
                        <input  value={email} name="email" className="passInp"/>
                        <input type="password" value={password.pass} name="pass" 
                        className="passInp" onChange={handleChange} placeholder="Enter your password"/>
                        <div className="passerr">{password.errors.pass}</div>
                        <button type="submit" className="passsub">submit</button>
                    </form> 
                 </div>
            )}
            
        </div>
    )
}

export default Password;