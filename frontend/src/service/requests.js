const api_key = "c83ed017626dc8c9b4eb6575ac03848b";

const requests = {
    fetchTrending  : `trending/all/week?api_key=${api_key}&language=en-US`,
    fetchOrginals :  `discover/tv?api_key=${api_key}&with_networks=213`,
    fetchTopRated :  `movie/top_rated?api_key=${api_key}&language=en-US`,
    fetchActionMovies :  `discover/tv?api_key=${api_key}&with_genres=28`,
    fetchComedyMovies :  `discover/tv?api_key=${api_key}&with_genres=35`,
    fetchHorrorMovies :  `discover/tv?api_key=${api_key}&with_genres=27`,
    fetchRomanceMovies :  `discover/tv?api_key=${api_key}&with_genres=10749`,
    fetchDoccumentaries :  `discover/tv?api_key=${api_key}&with_genres=99`,
}

export default requests;