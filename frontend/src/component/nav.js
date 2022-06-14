import { useEffect,useState } from "react";

// import netflixLogo from "../netflixlogo.png.crdownload"
import netflixLogo from "../pngkey.com-spacex-logo-png-1407852.png"

function Navbar () {
    const [show,setShow] = useState(false);

    // change the background color to black if the scroling is greater than 100...
    const transitionOfScrollBar = () => {
        if(window.scrollY > 100) {
            setShow(true)
        }else{
            setShow(false)
        } 
    }
    useEffect(() => {
        window.addEventListener("scroll",transitionOfScrollBar);
    },[]);

    return(
        <>
            <div className={`nav ${show && "navBlack"}`}>
                <div className="navContents">
                    <img 
                    src={netflixLogo} 
                    alt = "netflix logo" 
                    className="netflixLogo"/>

                    <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png?20201013161117" 
                    alt = "Avatar" 
                    className="avatar"/>
                </div>
            </div>
        </>
    )
}

export default Navbar;