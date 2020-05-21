<template>
    <div>
        <div
            v-for="movie in list"
            :key="movie.id"
            class="flex bg-white px-2 py-2 border-b overflow-hidden"
        >
            <img
                class="h-16 w-16 mx-auto md:mx-0 md:mr-6 object-cover object-center"
                :src="imgUrl(movie.poster_path)"
            />
            <div class="text-left">
                <router-link :to="'/movie/' + movie.id">{{movie.title}}</router-link>
                <div class="text-sm text-gray-600 overflow-hidden truncate">{{movie.overview}}</div>
                <div class="flex text-gray-600 text-xs">
                    <span>{{ movie.vote_average }} / 10</span>
                    <span class="mx-2">{{new Date(movie.release_date).getFullYear()}}</span>
                    &bull;
                    <span class="mx-2">{{ movie.vote_count }} reviews</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data: () => {
        return {
            imgBaseUrl: "https://image.tmdb.org/t/p/"
        };
    },
    props: {
        list: {
            type: Array
        }
    },
    methods: {
        imgUrl(path) {
            return path ? this.imgBaseUrl + "w92" + path : "/default.jpg";
        }
    }
};
</script>

<style>
</style>