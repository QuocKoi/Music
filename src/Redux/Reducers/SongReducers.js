import { createSlice } from '@reduxjs/toolkit'
import { data } from '../../Data/Song.js'
const initialState = {
    songList: data.list,
    song: {},
    index: 0,
    playRandom: false
}
const SongReducers = createSlice({
    name: 'songReducers',
    initialState,
    reducers: {
        getSong: (state, action) => {
            state.song = state.songList.find(song => song.id == action.payload)
            state.index = state.songList.findIndex(song => song.id == action.payload)
        },
        nextSong: (state, action) => {
            if (state.index < state.songList.length - 1) {
                state.index += 1;
            } else {
                state.index += 0;
            }
            state.song = state.songList[state.index]
        },
        prevSong: (state, action) => {
            if (state.index > 0) {
                state.index -= 1;
            } else {
                state.index = state.songList.length - 1;
            }
            state.song = state.songList[state.index]
        },
        endSong: (state, action) => {
            if (!state.playRandom) {
                if (state.index < state.songList.length - 1) {
                    state.index += 1;
                } else {
                    state.index = 0;
                }
            } else {
                const random = Math.floor(Math.random() * (state.songList.length - 1 - 0 + 1) + 0);
                state.index =random
            }
            state.song = state.songList[state.index];
        },
        randomSong:(state,action)=>{
            if(state.playRandom){
                state.playRandom=false
            }else{
                state.playRandom=true
            }
        }
    }
})
export const { getSong, nextSong, prevSong, endSong,randomSong } = SongReducers.actions;
export default SongReducers.reducer