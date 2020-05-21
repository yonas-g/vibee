import axios from "axios";

const api_key = process.env.VUE_APP_MOVIEDB_APIKEY;
const URL = process.env.URL;

let apiConfigCache = null;

const trendingMovies = async () => {
    let path = `${URL}/trending/movie/day?api_key=${api_key}`;

    const response = await axios.get(path);

    return response.data;
};

const searchMovie = async (text) => {
    let path = `${URL}/search/movie?api_key=${api_key}&query=${text}`;

    const response = await axios.get(path);

    return response.data;
};

const getMovie = async (id) => {
    let path = `${URL}/movie/${id}?api_key=${api_key}`;

    const response = await axios.get(path);

    return response.data;
};

const apiConfig = async () => {
    if (!apiConfigCache) {
        apiConfigCache = (
            await axios.get(
                `https://api.themoviedb.org/3/configuration?api_key=${api_key}`
            )
        ).data;
    }

    return apiConfigCache;
};

export default { searchMovie, apiConfig, getMovie, trendingMovies };
