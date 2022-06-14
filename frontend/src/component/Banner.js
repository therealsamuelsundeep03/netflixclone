import { useEffect, useState } from "react";
import axios from "axios";

import requests from "../service/requests";
// import axios from "../service/getMovies";

function Banner () {
    const [banner,setBanner] = useState([]);

    const baseURL = "https://api.themoviedb.org/3";
    useEffect(() => {
        async function fetchData () {
            const request = await axios.get(`${baseURL}/${requests.fetchOrginals}`);
            setBanner(request.data.results[Math.floor(Math.random() * request.data.results.length-1)])
        }
        fetchData();
    },[])

    return (
    <>
        <div className="banner">
            <header className="banner"
            style={{
                backgroundImage : `url("https://image.tmdb.org/t/p/original/${banner.backdrop_path}")`,
                backgroundSize : "cover",
                }}>
                    <div className="bannerContents">
                        <h1 className="bannerTitle">
                            {banner.title || banner.name || banner.original_name}
                        </h1>
                        <div className="bannerButtons">
                            <button className="bannerButton">Play</button>
                            <button className="bannerButton">List</button>
                        </div>
                        <h1 className="bannerdDesc">
                            {banner.overview}
                        </h1>
                    </div>
                    <div className="bannerFade" />
            </header>
        </div>
    </>) 
}

export default Banner;