import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        movies: {},
    },
    mutations: {
        addMovie: (state, movie) => (state.movies[movie.id] = movie),
    },
    actions: {},
    modules: {},
});
