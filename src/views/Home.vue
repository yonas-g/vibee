<template>
    <div class="w-10/12 mx-auto min-h-screen">
        <div>
            <Logo />
        </div>
        <div class="flex items-center justify-center">
            <input
                v-model="searchKey"
                @keyup.enter="searchMovie()"
                class="px-4 py-2 border border-gray-300  rounded-lg shadow-lg max-w-full focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Search"
            />
        </div>
        <div class="flex flex-wrap items-center justify-center mt-4 mx-auto">
            <div v-for="movie in movies" :key="movie.id">
                <MovieItem :movie="movie" />
            </div>
        </div>
    </div>
</template>

<script>
import api from "../api/Search";

import Logo from "../components/Logo";
import MovieItem from "../components/MovieItem";

export default {
    name: "Home",
    components: {
        MovieItem,
        Logo,
    },
    data: () => {
        return {
            searchKey: "",
            movies: [],
        };
    },
    methods: {
        async searchMovie() {
            let res = await api.searchMovie(this.searchKey);
            this.movies = res.results;
        },
    },
};
</script>
