<template>
    <div>
        <Header />
        <div class="md:flex w-10/12 justify-center pt-4 mx-auto text-gray-900">
            <div class="md:w-1/2">
                <!-- poster img -->
                <img
                    class="w-full lg:h-poster lg:px-4 object-cover object-center"
                    :src="imgUrl != null ? imgUrl : '/default.jpg'"
                    alt="Sunset in the mountains"
                />
            </div>
            <div class="md:w-1/2 p-6">
                <h4 class="font-bold text-xl">{{ movie.title }}</h4>
                <p class="font-medium text-sm">{{ movie.tagline }}</p>
                <div class="mt-1 text-gray-600">
                    <span class="mr-1 text-sm">{{ movie.runtime }}min</span>
                    &bull;
                    <span class="mr-1 text-sm">
                        {{
                        new Date(movie.release_date)
                        .toDateString()
                        .split(" ")[1]
                        }}
                        {{ new Date(movie.release_date).getFullYear() }}
                    </span>
                    &bull;
                    <span
                        class="ml-1 text-sm"
                    >{{ movie.vote_count }} reviews</span>
                </div>
                <div class="flex justify-start items-center mt-2">
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
                    <div class="ml-1 text-xs">
                        <span class="text-teal-500">
                            {{
                            movie.vote_average
                            }}
                        </span>
                        <span class="text-gray-600">/ 10</span>
                    </div>
                </div>
                <div
                    class="flex justify-start items-center text-sm text-gray-600 mr-2 mt-2 tracking-wide"
                >
                    <span>Budget: {{ formattedPrice(movie.budget) }}</span>
                    <span class="ml-2">Revenue: {{ formattedPrice(movie.revenue) }}</span>
                </div>
                <div class="mt-2 flex flex-wrap">
                    <span
                        v-for="genre in movie.genres"
                        :key="genre"
                        class="inline-block px-2 py-1 leading-none bg-teal-100 text-teal-600 rounded-full font-semibold uppercase tracking-wide text-xs"
                    >#{{ genre.name }}</span>
                </div>

                <p class="mt-2 text-gray-600">{{ movie.overview }}</p>

                <div class="flex mt-2">
                    <a
                        :href="movie.homepage"
                        target="_blank"
                        class="mr-2 text-sm text-blue-500 hover:text-blue-600"
                    >Home page</a>
                    <a
                        :href="'https://www.imdb.com/title/' + movie.imdb_id"
                        target="_blank"
                        class="mr-2 text-sm text-blue-500 hover:text-blue-600"
                    >IMDB</a>
                </div>

                <div class="text-sm mt-2">
                    <h4 class="text-gray-700 text-sm">Production Companies</h4>
                    <div class="flex flex-wrap text-gray-700">
                        <span
                            class="px-2 mt-2 rounded-full bg-gray-200"
                            v-for="company in movie.production_companies"
                            :key="company.id"
                        >{{ company.name }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from "../components/Header";

export default {
    name: "Movie",
    components: {
        Header
    },
    data: () => {
        return {
            imgBaseUrl: "https://image.tmdb.org/t/p/",
            movie: {}
        };
    },
    methods: {
        formattedPrice(price) {
            const formatter = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD"
            });

            return formatter.format(price / 100);
        }
    },
    created() {
        this.movie = this.$store.state.movies[this.$route.params.id];
    },
    computed: {
        imgUrl() {
            return this.movie.poster_path
                ? this.imgBaseUrl + "w500" + this.movie.poster_path
                : null;
        }
    }
};
</script>
