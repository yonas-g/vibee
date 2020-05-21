<template>
    <div class="w-10/12 mx-auto min-h-screen">
        <div>
            <Logo />
        </div>
        <div class="flex items-center justify-center">
            <input
                v-model="searchKey"
                @keyup.enter="searchMovie()"
                class="md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg shadow-lg max-w-full focus:outline-none"
                type="text"
                placeholder="Search"
            />
        </div>
        <div class="flex flex-wrap items-center justify-center mt-4 mx-auto">
            <div
                :class="isLoading ? 'hidden' : 'inline-block'"
                v-for="movie in movies"
                :key="movie.id"
            >
                <MovieItem :movie="movie" />
            </div>
            <div :class="isLoading ? 'inline-block' : 'hidden'">
                <img src="/loading.gif" alt="trending" />
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
        Logo
    },
    data: () => {
        return {
            searchKey: "",
            isLoading: true,
            movies: []
        };
    },
    methods: {
        async searchMovie() {
            this.isLoading = true;

            let res = await api.searchMovie(this.searchKey);

            this.movies = res.results;

            this.isLoading = false;
        }
    },
    async mounted() {
        this.isLoading = true;

        if (this.$store.state.movieTrending.length == 0) {
            const res = (await api.trendingMovies()).results;
            this.$store.commit("addMovieTrending", res);
        }

        this.movies = this.$store.state.movieTrending;

        this.isLoading = false;
    }
};
</script>
