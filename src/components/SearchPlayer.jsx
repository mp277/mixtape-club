import React from 'react';
import YouTube from 'react-youtube';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faPlus, faForward, faBackward, faDotCircle, faStopCircle } from '@fortawesome/free-solid-svg-icons'

/** Search Player component renders the player interface connected with the Search component 
 * at the create-mixtapes route and is a child component of CreateMixtapes.
 */

const SearchPlayer = (props) => {
    const { onReady, onPlayVideo, onPauseVideo, playing, recording, onStopRecordVideo, onRecordVideo, selectedResult, onPassToSideA, onPassToSideB } = props;

    let title = selectedResult.snippet.title.replace(/&amp;/g, '&');
    title = title.replace(/&#39;/g, '\'');
    title = title.replace(/&quot;/g, '\"');

     /**
     * Function triggered by the fast-forward button. Mimics fast-forward by changing the playback
     * rate and lowering the volume while the button is held-down.
     */
    const onForward = () => {
        this.state.player.setPlaybackRate(2);
        this.state.player.setVolume(50);
    }
    
    /**
     * Function that restores the volume and speed of the player when the fast-forward
     * button is released.
     */
    const onStopForward = () => {
        this.state.player.setPlaybackRate(1.0);
        this.state.player.setVolume(100);
    }

    /**
     * Function triggered by the rewind button mouseDown event that mimics rewind functionality.
     * When the button is held-down the function retrieves the current time of the video then
     * subtracts from that value to seek backwards on the player on an interval.
     */
    const onBackward = () => {
        
        let time = this.state.player.getCurrentTime();
        this.state.player.setVolume(50);
        this.state.interval = setInterval(() => {
            time -= 2;
            this.state.player.seekTo(time);
        }, 90)
    }

    /**
     * Function triggered by the mouseUp event of the rewind button that clears the interval, triggers 
     * the video to play again, and restores the volume of the player.
     */
    const onStopBackward = () => {
        clearInterval(this.state.interval);
        this.state.player.playVideo();
        this.state.player.setVolume(100);
    }

    const iconStyle = {
        fontSize: '2.5rem',
        marginTop: '20%',
        marginLeft: '10%',
        marginRight: '10%',
        color: '#fff',
    }

    const iconStyleRecord = {
        fontSize: '2.5rem',
        marginTop: '20%',
        marginLeft: '10%',
        marginRight: '10%',
        color: 'red',
    }

    const divStyle = {
        borderRadius: '5px',
        marginTop: '-370px'
    }

    const titleStyle = {
        verticalAlign: 'middle',
        display: 'inline-block',
        color: '#fff',
        marginTop: '7%',
        fontSize: '1rem',
    }
    
    const vidStyle = {
        opacity: '0%',
        marginLeft: '-2000px',
        marginTop: '0.5rem',
    }
    
    return (
        <div>
            <div style={vidStyle}>
                <YouTube videoId={selectedResult.id.videoId} onReady={onReady} />
            </div>
            <div className="row col-12 bg-info d-flex mx-auto" style={divStyle}>
                <div className="col-2 col-md-1" >       
                    <FontAwesomeIcon style={iconStyle} icon={faBackward} onMouseDown={onBackward} onMouseUp={onStopBackward} />
                    {
                        playing ? 
                            <FontAwesomeIcon style={iconStyle} icon={faPause} onClick={onPauseVideo}/>
                        :
                            <FontAwesomeIcon style={iconStyle} icon={faPlay} onClick={onPlayVideo}/> 
                    }
                    {
                        recording ? 
                            <FontAwesomeIcon style={iconStyleRecord} icon={faStopCircle} onClick={onStopRecordVideo}/>
                        :
                            <FontAwesomeIcon style={iconStyle} icon={faDotCircle} onClick={onRecordVideo}/>
                    }
                    <FontAwesomeIcon style={iconStyle} icon={faForward} onMouseDown={onForward} onMouseUp={onStopForward} />
                </div>
                <div className="col-10 col-md-8"> 
                    <h4 style={titleStyle}>{title}</h4> 
                </div>
                <div className="row col-11 col-md-3 player-button-row mx-auto">
                    <button className="btn btn-light col-4 col-md-7" style={{ margin: '0.4rem 0.2rem', fontSize: '0.8rem', color: '#17a2b8' }} onClick={() => onPassToSideA(selectedResult)}><FontAwesomeIcon style={{ color: '#17a2b8' }} icon={faPlus} /> Side A</button>
                    <button className="btn btn-light col-4 col-md-7" style={{ margin: '0.4rem 0.2rem', fontSize: '0.8rem', color: '#17a2b8' }} onClick={() => onPassToSideB(selectedResult)}><FontAwesomeIcon style={{ color: '#17a2b8'}} icon={faPlus}/> Side B</button>
                </div>
            </div>
        </div>
    )
};

export default SearchPlayer;