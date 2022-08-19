import React, { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Slider } from 'antd'
import './Play.css'
import { endSong, nextSong, prevSong, randomSong } from '../../Redux/Reducers/SongReducers';
export default function Play() {
    const [visible, setVisible] = useState(false);
    const [mute, setMute] = useState(false);
    const [loop, setLoop] = useState(false);
    const [actionRandom, setActionRandom] = useState(false);
    const [audioTime, setAudioTime] = useState({ length: {}, currentTime: {}, progress: 0, initialTime: 0 });
    const audioRef = useRef(null);
    const dispatch = useDispatch();
    const { song, index, songList } = useSelector(state => state.SongReducers);
    useEffect(() => {
        audioRef.current.src = song.link;
        audioRef.current.load();
        audioRef.current.play();
        setVisible(true)
    }, [index])
    const handleClickPlayAndPause = () => {
        if (visible) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setVisible(!visible)
    }
    const handleClickLoop = () => {
        if (loop) {
            audioRef.current.loop = false;
        } else {
            audioRef.current.loop = true;
        }
        setLoop(!loop)
    }
    const handleEnded = () => {
        dispatch(endSong())
    }
    const handleNext = () => {
        dispatch(nextSong())
    }
    const handlePrev = () => {
        dispatch(prevSong())
    }
    const handleTimeUpdate = (e) => {
        let persent = 0;
        const duration = e.target.duration;
        const time = e.target.currentTime;
        persent = (time / duration) * 100;
        setAudioTime({ ...audioTime, progress: persent, currentTime: handleTimer(parseInt(time, 10)) })
    }
    const handlChange = (value) => {
        audioRef.current.currentTime = value / 100 * audioTime.initialTime;
        setAudioTime({ ...audioTime, progress: value })
    }
    const handleTimer = (time) => {
        let hours = Math.floor(time / 3600); // get hours
        let minutes = Math.floor((time - (hours * 3600)) / 60);
        let seconds = time - (hours * 3600) - (minutes * 60); //  get seconds
        if (minutes < 10) {
            minutes = `0${minutes}`
        }
        if (seconds < 10) {
            seconds = `0${seconds}`
        }
        return { hours, minutes, seconds }
    }
    const getDuration = (e) => {
        const { duration } = e.target;
        const sec = parseInt(duration, 10);
        setAudioTime({ ...audioTime, length: handleTimer(sec), initialTime: sec })
    }
    const handleClickVolume = () => {
        if (mute) {
            audioRef.current.muted = false
        } else {
            audioRef.current.muted = true;
        }
        setMute(!mute)
    }
    const handleChangeVolume = (value) => {
        audioRef.current.volume = value
    }
    const handleRandomSong = () => {
        dispatch(randomSong());
        setActionRandom(!actionRandom)
    }
    const truncate=(text='',num)=>{
        if(text.length>num){
            return text.slice(0,num)
        }
        return text
    }
    return (
        <div className='text-center fixed-bottom'>
            <div className='control'>
                <audio ref={audioRef} onEnded={handleEnded} onTimeUpdate={handleTimeUpdate} onDurationChange={getDuration}  >
                </audio>
                <div className=' py-3'>
                    <div className='d-flex align-items-center justify-content-around'>
                        <div className='text-white control-left'>
                            <img className=' rounded me-2' src={song.image} alt={song.name} />
                            <span className='fw-bold d-none d-md-inline'>{truncate(song?.name,25)}</span>
                        </div>
                        <div className='control-middle'>
                            <div className='d-flex align-items-center justify-content-center'>
                                <div className='me-2 '>
                                    <button className={`repeat ${loop ? 'd-none' : 'd-block'}`} onClick={handleClickLoop}><i className="bi bi-repeat"></i></button>
                                    <button className={`repeat ${loop ? 'd-block active' : 'd-none'}`} onClick={handleClickLoop}><i className="bi bi-repeat-1"></i></button>
                                </div>
                                <button className='prev' onClick={handlePrev}>
                                    <i className="fa-solid fa-backward-step"></i>
                                </button>
                                <div className={`play border rounded-circle ${visible ? 'd-none' : 'd-block'}`} onClick={handleClickPlayAndPause} >
                                    <i className="fa fa-play " ></i>
                                </div>
                                <div className={`pause border rounded-circle ${visible ? 'd-block' : 'd-none'}`} onClick={handleClickPlayAndPause} >
                                    <i className="fa fa-pause"></i>
                                </div>
                                <button className='next' onClick={handleNext}>
                                    <i className="fa-solid fa-forward-step"></i>
                                </button>
                                <button className={` random ${actionRandom ? 'active' : ''} `} onClick={handleRandomSong}>
                                    <i class="fa fa-random"></i>
                                </button>

                            </div>
                            <div className='d-flex align-items-center'>
                                <span className='text-white'>{audioTime.currentTime.hours > 0 ? `${audioTime.currentTime.hours}:` : ''}{audioTime.currentTime.minutes}:{audioTime.currentTime.seconds}</span>
                                <Slider className='w-100 ' value={audioTime.progress} tooltipVisible={false} handleStyle={{ border: 'none' }} trackStyle={{ background: '#fff' }} step={0.001} onChange={handlChange} />
                                <span className='text-white'>{audioTime.length.hours > 0 ? `${audioTime.length.hours}:` : ''}{audioTime.length.minutes}:{audioTime.length.seconds}</span>
                            </div>
                        </div>
                        <div className='control-right'>
                            <div className='group-volume ms-2 d-flex justify-content-end' >
                                <button className={`volume ${mute ? 'd-none' : 'd-block'}`} onClick={handleClickVolume}><i className="fa fa-volume-up"></i></button>
                                <button className={`volume ${mute ? 'd-block' : 'd-none'}`} onClick={handleClickVolume}><i className="fa fa-volume-mute"></i></button>
                                <Slider defaultValue={30} tooltipVisible={false} handleStyle={{ border: 'none' }} trackStyle={{ background: '#fff' }} min={0} max={1} step={0.01} onChange={handleChangeVolume}></Slider>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
