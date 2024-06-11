import { createStore } from "vuex";

export default createStore({
  state: {
    data: {},
  },
  getters: {
    getMovies(state) {
      return state.data.movies;
    },
  },
  mutations: {
    SET_MOVIES(state, data) {
      state.data = data;
    },
  },
  actions: {
    // for get data form local storage
    loadMoviesFromLocalStorage({ commit }) {
      const data = localStorage.getItem("movies");
      if (data) {
        commit("SET_MOVIES", JSON.parse(data));
      }
    },

    // for Update data in local storage
    updateMoviesInLocalStorage(context, payload) {
      localStorage.setItem("movies", JSON.stringify(payload));
    },

    //add new movie
    addMovie({ dispatch, state }, payload) {
      state.data.movies.push(payload);
      dispatch("updateMoviesInLocalStorage", state.data);
    },

    //edit movie
    editMovie({ dispatch, state }, { movie, actorsIds }) {
      let index = state.data.movies.findIndex((item) => item.id == movie.id);
      state.data.movies[index] = movie;
      dispatch("updateMoviesInLocalStorage", state.data);
      actorsIds.forEach((id) => {
        dispatch("removeActorFromMovie", { movieId: movie.id, actorId: id });
      });
    },

    //assign movie to actor when add new actor to this movie
    addMovieToActor({ dispatch, state }, payload) {
      payload.actors.forEach((item) => {
        let actor = state.data.actors.find((data) => data.id == item.id);
        actor.movies.push({ id: payload.id, role_id: item.role_id });
      });
      dispatch("updateMoviesInLocalStorage", state.data);
    },

    //add actor
    addActor({ dispatch, state }, payload) {
      state.data.actors.push(payload);
      dispatch("updateMoviesInLocalStorage", state.data);
    },

    //edit actor
    editActor({ dispatch, state }, payload) {
      let index = state.data.actors.findIndex((item) => item.id == payload.id);
      state.data.actors[index].name = payload.name;
      state.data.actors[index].age = payload.age;
      dispatch("updateMoviesInLocalStorage", state.data);
    },

    //delete actor
    deleteActor({ dispatch, state }, payload) {
      state.data.actors = state.data.actors.filter(
        (item) => item.id !== payload.id
      );
      state.data.movies.forEach((movie) => {
        movie.actors = movie.actors.filter((actor) => actor.id !== payload.id);
      });
      dispatch("updateMoviesInLocalStorage", state.data);
    },

    //when i delete actor from movie i will update this in actors list
    removeActorFromMovie({ dispatch, state }, { movieId, actorId }) {
      // Find the movie
      const movie = state.data.movies.find((m) => m.id === movieId);
      if (!movie) {
        console.error("Movie not found");
        return;
      }

      // Remove actor from movie's actor list
      movie.actors = movie.actors.filter((actor) => actor.id !== actorId);

      // Find the actor
      const actor = state.data.actors.find((a) => a.id === actorId);
      if (!actor) {
        console.error("Actor not found");
        return;
      }

      // Remove movie from actor's movie list
      actor.movies = actor.movies.filter((m) => m.id !== movieId);

      dispatch("updateMoviesInLocalStorage", state.data);
    },
  },
  modules: {},
});
