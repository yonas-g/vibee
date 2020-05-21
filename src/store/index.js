import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        movies: {},
        tv: {},
        movieTrending: [],
        tvTrending: [],
    },
    mutations: {
        addMovie: (state, movie) => (state.movies[movie.id] = movie),
        addTv: (state, tv) => (state.tv[tv.id] = tv),
        addMovieTrending: (state, trending) => (state.movieTrending = trending),
        addTvTrending: (state, trending) => (state.tvTrending = trending),
    },

    actions: {},
    modules: {},
});
