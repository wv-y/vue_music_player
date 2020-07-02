import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    audioRef: {},
    musicList: [],
    musicIndex: ''
  },
  mutations: {
    saveAudioRef(state,audioRef){
      state.audioRef = audioRef;
    },
    saveMusicList(state,musicList){
      state.musicList = musicList;
    },
    saveMusicIndex(state,musicIndex){
      state.musicIndex = musicIndex;
    }
  },
  actions: {
    async playGetMusic(){
      
    }
  },
  modules: {
  }
})
