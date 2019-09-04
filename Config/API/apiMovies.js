const API_TOKEN = "2fae416c150ee4b2e2c62a138bf9b3ea"

export const searchMovieByQuery = (query, page) => {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_TOKEN}&language=fr&query=${query}&page=${page}`;

    return fetch(url).then(
        response => response.json(),
        error => console.log(error)
    )
}

export const moviesDiscover = () => {
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_TOKEN}&language=fr&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`;

    return fetch(url).then(
        response => response.json(),
        error => console.log(error)
    )
}