<template>
    <div class="lg:w-10/12 mx-auto min-h-screen">
        <div>
            <Logo />
        </div>
        <div class="relative inline-block flex flex-col items-center justify-center">
            <input
                v-model="searchKey"
                @keyup="quickSearch"
                @keyup.enter="searchMovie()"
                class="search md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg shadow-lg max-w-full focus:outline-none focus:shadow-2xl"
                type="text"
                placeholder="Search"
            />
            <div
                class="dropdown w-11/12 md:w-1/2 my-2 overflow-y-scroll rounded-md absolute z-10"
                style="top: 40px; margin-top: 5px; max-height:18rem;"
            >
                <Dropdown :list="dropdownItems" />
            </div>
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
import Dropdown from "../components/Dropdown";

export default {
    name: "Home",
    components: {
        MovieItem,
        Logo,
        Dropdown
    },
    data: () => {
        return {
            searchKey: "",
            isLoading: true,
            movies: [],
            dropdownItems: []
        };
    },
    methods: {
        async searchMovie() {
            this.isLoading = true;

            let res = await api.searchMovie(this.searchKey);

            this.movies = res.results;

            this.isLoading = false;
        },
        async quickSearch(e) {
            if (
                e.key.length == 1 ||
                (e.key == "Backspace" && this.searchKey.length != 0)
            ) {
                let res = (await api.searchMovie(this.searchKey)).results;

                this.dropdownItems = res;
            }
            if (this.searchKey.length == 0) {
                this.dropdownItems = [];
            }
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
