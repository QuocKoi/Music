import {configureStore} from '@reduxjs/toolkit'
import SongReducers from './Reducers/SongReducers'
export const store=configureStore({
    reducer:{
        SongReducers
    },
})