import axios from "axios";
import { useEffect, useState } from "react";

function Row ({title,fetchUrl,isLarge = false}) {
    const [movies,setMovies] = useState([]);

    const baseURL = "https://api.themoviedb.org/3";
    useEffect(async() => {
        let request = await axios.get(`${baseURL}/${fetchUrl}`);
        setMovies(request.data.results)
    },[])

    return (
        <>
            <div className="row">
                <h2 className="netTitle">{!movies.length ? "" : title}</h2>
                <div className="posters">
                   {movies.map(
                       (movie) => 
                        ((isLarge && movie.poster_path) ||
                            (!isLarge && movie.backdrop_path)) && (
                                <img 
                                className={`posterimage ${isLarge && "posterimageLarge"}`}
                                src= {`https://image.tmdb.org/t/p/original/${isLarge ? movie.poster_path : movie.backdrop_path}`} 
                                alt = {`${title} Image`}
                                key={movie.id} /> 
                            ))}
                </div>
            </div>
        </>
    )
}
export default Row;
    