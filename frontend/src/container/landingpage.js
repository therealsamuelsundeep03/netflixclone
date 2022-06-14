import Navbar from "../component/nav";
import Banner from "../component/Banner";
import Row from "../component/row"
import requests from "../service/requests";

function Landingpage () {

    const isloggedin = localStorage.getItem('isloggedin');

    return(
    <>
    {isloggedin ? 
        <div className="homeScreen">
            {/* navbar */}
            <Navbar />

            {/* banner */}
            <Banner />

            {/* row */}
            <Row title = "NETFLIX ORIGINALS" isLarge={true} fetchUrl = {requests.fetchOrginals}/>
            <Row title = "TRENDING NOW" fetchUrl = {requests.fetchTrending}/>
            <Row title = "TOP RATED" fetchUrl = {requests.fetchTopRated}/>
            <Row title = "ACTION MOVIES" fetchUrl = {requests.fetchActionMovies}/>
            <Row title = "COMEDY MOVIES" fetchUrl = {requests.fetchComedyMovies}/>
            <Row title = "DOCCUMENTARIES" fetchUrl = {requests.fetchDoccumentaries}/>
            <Row title = "HORROR MOVIES" fetchUrl = {requests.fetchHorrorMovies}/>
            <Row title = "ROMANTIC MOVIES" fetchUrl = {requests.fetchRomanceMovies}/>
        </div> 
         : window.location.replace("/in")
         } 
    </>
)
         
}

export default Landingpage;