<template>
    <div class="max-w-xs rounded overflow-hidden shadow-lg mx-4 mt-4 hover:shadow-2xl">
        <div class="img-container">
            <img
                class="w-full h-100 object-cover object-center"
                :src="imgUrl != null ? imgUrl : '/default.jpg'"
                alt="Sunset in the mountains"
            />
            <p class="overlay text-white text-sm">{{ movie.overview }}</p>
        </div>
        <div class="px-6 py-2 md:h-40 text-gray-600">
            <div class="mt-2 flex items-center">
                <svg
                    v-for="i in 10"
                    :key="i"
                    :class="
                        i <= movie.vote_average
                            ? 'text-teal-500'
                            : 'text-gray-400'
                    "
                    class="h-4 w-4 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                >
                    <path
                        d="M6.1 21.98a1 1 0 0 1-1.45-1.06l1.03-6.03-4.38-4.26a1 1 0 0 1 .56-1.71l6.05-.88 2.7-5.48a1 1 0 0 1 1.8 0l2.7 5.48 6.06.88a1 1 0 0 1 .55 1.7l-4.38 4.27 1.04 6.03a1 1 0 0 1-1.46 1.06l-5.4-2.85-5.42 2.85zm4.95-4.87a1 1 0 0 1 .93 0l4.08 2.15-.78-4.55a1 1 0 0 1 .29-.88l3.3-3.22-4.56-.67a1 1 0 0 1-.76-.54l-2.04-4.14L9.47 9.4a1 1 0 0 1-.75.54l-4.57.67 3.3 3.22a1 1 0 0 1 .3.88l-.79 4.55 4.09-2.15z"
                    />
                </svg>
                <div class="ml-1 mt-1 text-xs">
                    <span class="text-teal-500">{{ movie.vote_average }}</span>
                    / 10
                </div>
            </div>
            <div class="flex justify-start items-center">
                <span class="mr-1 text-sm">
                    {{
                    new Date(movie.release_date).getFullYear()
                    }}
                </span>
                &bull;
                <span class="ml-1 text-sm">{{ movie.vote_count }} reviews</span>
            </div>
            <div class="mt-2">
                <router-link
                    :to="'/movie/' + movie.id"
                    class="font-semibold text-lg leading-tight truncate hover:text-gray-700"
                >{{ movie.title }}</router-link>
            </div>
            <div class="mt-3 flex flex-wrap">
                <span
                    v-for="genre in genres"
                    :key="genre"
                    class="inline-block bg-gray-200 rounded-full px-3 my-1 text-xs font-semibold text-gray-600 mr-2 tracking-wide"
                >#{{ genre }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import api from "../api/Search";

export default {
    name: "MovieItem",
    props: ["movie"],
    data: () => {
        return {
            imgBaseUrl: "https://image.tmdb.org/t/p/",
            genres: []
        };
    },
    methods: {
        async getGenres() {
            let movieDetail;
            if (!this.$store.state.movies[this.movie.id]) {
                movieDetail = await api.getMovie(this.movie.id);
                this.$store.commit("addMovie", movieDetail);
            } else {
                movieDetail = this.$store.state.movies[this.movie.id];
            }
            this.genres = movieDetail.genres.map(genre => genre.name);
        }
    },
    computed: {
        imgUrl() {
            this.getGenres();

            return this.movie.poster_path
                ? this.imgBaseUrl + "w500" + this.movie.poster_path
                : null;
        }
    }
};
</script>
