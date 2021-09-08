import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        library: {},
        selectedAlbums: []
    },
    mutations: {
        setLibrary (state, library) {
            state.library = library
        },
        updateSelectedAlbums (state, albumId) {
            if (state.selectedAlbums.includes(albumId)) {
                state.selectedAlbums = state.selectedAlbums.filter(id => id !== albumId)
            } else {
                state.selectedAlbums.push(albumId)
            }
        }
    }
})

export default store