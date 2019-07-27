import React from 'react';
import YouTube from 'react-youtube';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faPlus, faForward, faBackward, faDotCircle, faStopCircle, faDrum, faCircle } from '@fortawesome/free-solid-svg-icons'

/** Search Player component renders the player interface connected with the Search component 
 * at the create-mixtapes route and is a child component of CreateMixtapes.
 */

const SearchPlayer = (props) => {
    const { onReady, onPlayVideo, onPauseVideo, onUserRecordingEnded, playing, recording, onBackward, onForward, onStopBackward, onStopForward, onStopRecordVideo, onRecordVideo, selectedResult, onPassToSideA, onPassToSideB, opts, recordUser, startRecordUser, stopRecordUser, onKick, onSnare} = props;

    let title = selectedResult.snippet.title.replace(/&amp;/g, '&');
    title = title.replace(/&#39;/g, '\'');
    title = title.replace(/&quot;/g, '\"');

    const iconStyle = {
        fontSize: '2.5rem',
        marginTop: '20%',
        marginLeft: '10%',
        marginRight: '10%',
        color: '#fff',
    }

    const drumStyle = {
        verticalAlign: 'middle',
        // display: 'inline-block',
        fontSize: '2.5rem',
        marginTop: '20%',
        marginLeft: '10%',
        // marginRight: '10%',
        color: '#fff',
    }

    const snareStyle = {
        verticalAlign: 'middle',
        // display: 'inline-block',
        fontSize: '2.5rem',
        marginTop: '20%',
        marginLeft: '2%',
        // marginRight: '10%',
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

    const initiateStopRecordUser = (chunks, mediaRecord) => {
        mediaRecord.onstop = () => {
            const blob = new Blob(chunks, { 'type' : 'audio/ogg; codecs=opus' });
            stopRecordUser(blob);
            const audio = document.getElementById('user-recording');
            const audioURL = window.URL.createObjectURL(blob);
            audio.setAttribute('controls', '');
            audio.addEventListener('ended', () => {
                onUserRecordingEnded();
            });
            audio.src = audioURL;
        }
        mediaRecord.stop();
    }

    const initiateRecordUser = () => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            console.log('getUserMedia supported.');
            navigator.mediaDevices.getUserMedia({ audio: true })
            .then((stream) => {
                startRecordUser();
                const mediaRecord = new MediaRecorder(stream);
                mediaRecord.start();

                const chunks = [];
                mediaRecord.ondataavailable = (event) => {
                    chunks.push(event.data);
                }

                const stop = document.querySelector('#stop-record-user');
                stop.onclick = initiateStopRecordUser.bind(stop, chunks, mediaRecord);
            })
            .catch((err) => {
                console.log('The following getUserMedia error occured: ' + err);
            });
        } else {
            console.log('getUserMedia not supported on your browser!');
        }
    }
    
    
    return (
        <div>
            <div style={vidStyle}>
                <audio id="user-recording" controls></audio>
                <YouTube videoId={selectedResult.id.videoId} onReady={onReady} opts={opts} />
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
                    <div className="row">
                    <FontAwesomeIcon  style={drumStyle} icon={faDrum} onClick={onKick} />
                    <FontAwesomeIcon  style={snareStyle} icon={faCircle} onClick={onSnare} />
                    </div>
                </div>
                <div className="row col-11 col-md-3 player-button-row mx-auto">
                    {
                        recordUser ?
                            <button className="btn btn-light col-4 col-md-7" id="stop-record-user" style={{ margin: '0.4rem 0.2rem', fontSize: '0.8rem', color: 'red' }}><FontAwesomeIcon style={{ color: 'red' }} icon={faPlus} /> Record Audio</button>
                        :
                            <button className="btn btn-light col-4 col-md-7" style={{ margin: '0.4rem 0.2rem', fontSize: '0.8rem', color: '#17a2b8' }} onClick={initiateRecordUser}><FontAwesomeIcon style={{ color: '#17a2b8' }} icon={faPlus} /> Record Audio</button>
                    }
                    <button className="btn btn-light col-4 col-md-7" style={{ margin: '0.4rem 0.2rem', fontSize: '0.8rem', color: '#17a2b8' }} onClick={() => onPassToSideA(selectedResult)}><FontAwesomeIcon style={{ color: '#17a2b8' }} icon={faPlus} /> Side A</button>
                    <button className="btn btn-light col-4 col-md-7" style={{ margin: '0.4rem 0.2rem', fontSize: '0.8rem', color: '#17a2b8' }} onClick={() => onPassToSideB(selectedResult)}><FontAwesomeIcon style={{ color: '#17a2b8'}} icon={faPlus}/> Side B</button>
                </div>
            </div>
        </div>
    )
};

export default SearchPlayer;