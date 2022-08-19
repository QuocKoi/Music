import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getSong } from '../../Redux/Reducers/SongReducers';
export default function Home() {
  const dispatch = useDispatch();
  const { songList,song } = useSelector((state) => state.SongReducers);
  const handleClick = (id) => {
    dispatch(getSong(id))
  }
  const renderList = () => {
    return songList.map((itemSong, index) => {
      const { id, name, image } = itemSong;
      let active='';
      if(song.id===id){
        active='active'
      }
      return <div className={`text-white item-song rounded p-3 d-flex align-items-center ${active}`} key={index} onClick={() => { handleClick(id) }}>
        <span className='icon-music'><i class="fab fa-itunes-note"></i></span>
        <div className='region-image rounded mx-2'>
          <img src={image} alt={name} />
          <div className='overley'></div>
          <span className='icon-play'><i class="fa fa-play"></i></span>
          <img className='sound-wave' src='./image/soundWave.gif'/>
        </div>
        <span className='fw-semibold' >{name}</span>
      </div>
    })
  }
  return (
    <div className='container'>
      <div className='list-song'>
        {renderList()}
      </div>
    </div>
  )
}
