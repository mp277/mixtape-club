import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import axios from 'axios';
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import Container from "./components/Container.jsx";
import LoginBox from './components/Login.jsx';
import Navigation from './components/Navbar.jsx';
import Search from './components/Search.jsx';
import Hero from './components/Hero.jsx';
import SearchList from './components/SearchList.jsx';
import PlaylistBuilderList from './components/PlaylistBuilderList.jsx';
import PlaylistImageSelector from './components/PlaylistImageSelector.jsx';
import { cpus } from "os";

import LisaFrankenstein from './assets/img/tapes/lisa-frankenstein-tape.gif';
import GreenTape from './assets/img/tapes/green-tape.gif';
import OrangeTape from './assets/img/tapes/orange-tape.gif';
import BlueTape from './assets/img/tapes/blue-tape.gif';
import RedTape from './assets/img/tapes/red-tape.gif';
import PinkTape from './assets/img/tapes/pink-tape.gif';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchResults: [{ snippet: { title: '' }, id: { videoId: '4D2qcbu26gs' } }],
            player: null,
            tapeImages: [{ image: LisaFrankenstein, name: 'Lisa Frankenstein' }, { image: GreenTape, name: 'green' }, { image: OrangeTape, name: 'orange' }, { image: BlueTape, name: 'blue' }, { image: RedTape, name: 'red' }, { image: PinkTape, name: 'pink' }],
            builderImage: { image: BlueTape, name: 'blue' },
            tapeLabel: 'Untitled',
            playing: false,
            recording: false,
            startSong: 0,
            stopSong: null,
            opts: {
                playerVars: {
                    start: 0,
                }
            },
            query: '',
            selectedResult: { snippet: { title: 'Search for a song' }, id: { videoId: '4D2qcbu26gs' } },
            sideA: [],
            sideB: [],
            displayImageSelector: true,
            isAuthenticated: false,
            onDeckSideA: ['Track 1 A', 'Track 2 A', 'Track 3 A', 'Track 4 A', 'Track 5 A'],
            onDeckSideB: ['Track 1 B', 'Track 2 B', 'Track 3 B', 'Track 4 B', 'Track 5 B'],
            googleId: 'FILL_ME_IN',
            tapeBackgroundColor: '#fff',
            queryParam: "",
            isPublic: false,
            recordUser: false,
            userRecording: null,
            kick: null,
            snare: null,
        }

        this.onSearch = this.onSearch.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onGenerate = this.onGenerate.bind(this);
        this.onPlayVideo = this.onPlayVideo.bind(this);
        this.onRecordVideo = this.onRecordVideo.bind(this);
        this.onStopRecordVideo = this.onStopRecordVideo.bind(this);
        this.onPauseVideo = this.onPauseVideo.bind(this);
        this.onReady = this.onReady.bind(this);

        this.onForward = this.onForward.bind(this);
        this.onBackward = this.onBackward.bind(this);
        this.onStopForward = this.onStopForward.bind(this);
        this.onStopBackward = this.onStopBackward.bind(this);
        this.onSelectTapeImage = this.onSelectTapeImage.bind(this);
        this.onTapeLabelChange = this.onTapeLabelChange.bind(this);
        this.onResultClick = this.onResultClick.bind(this);
        this.onPassSongToSideA = this.onPassSongToSideA.bind(this);
        this.onPassSongToSideB = this.onPassSongToSideB.bind(this);
        this.onSaveTapeImage = this.onSaveTapeImage.bind(this);
        this.onSavePlaylist = this.onSavePlaylist.bind(this);
        this.onDeleteSong = this.onDeleteSong.bind(this);
        this.logout = this.logout.bind(this);
        this.onMakePublic = this.onMakePublic.bind(this);
        this.authenticateUser = this.authenticateUser.bind(this);

        this.onUserRecordingEnded = this.onUserRecordingEnded.bind(this);
        this.startRecordUser = this.startRecordUser.bind(this);
        this.stopRecordUser = this.stopRecordUser.bind(this);

        this.onKick = this.onKick.bind(this);
        this.onSnare = this.onSnare.bind(this);
    }


    /**
     * Function makes call to server when the component mounts
     * to check if user is authenticated using passport.js
     * Google Strategy. Maintains record of authentication
     * on the state.
     */
    authenticateUser() {
        axios.get('/user/')
            .then((response) => {
                if (response.data.verified) {
                    this.setState({
                        isAuthenticated: true,
                        googleId: response.data.id
                    })
                }
            })
            .catch((err) => {
                console.error(err);
            })
    }

    /**
     * When component mounts, info about user is retrieved from
     * server using passport.
     */
    componentDidMount() {
        this.authenticateUser();
        const { googleId } = this.state;

        axios.get('/getUser', {
            googleId
        })
            .then((response) => {
                console.log(response);
            })
            .catch((err) => {
                console.error('Error searching:', err)
            })
        console.log('location', location);
    }

    /**
     * Function maintains the query value of the input field from
     * Search.jsx as it changes.
     */
    onChange(event) {
        this.setState({
            query: event.target.value,
        })
    }

    /**
     * Following two functions change the state of playing when the user
     * plays or pauses the song in the  searchPlayer in order to switch
     * between rendering the play and pause button.
     */
    onPlayVideo() {
        const { userRecording } = this.state;
        if (userRecording) {
            document.getElementById('user-recording').play();
        } else {
            this.state.player.playVideo();
        }
        this.setState({
            playing: true,
        })
    }

    onPauseVideo() {
        const { userRecording } = this.state;
        if (userRecording) {
            document.getElementById('user-recording').pause();
        } else {
            this.state.player.pauseVideo();
        }
        this.setState({
            playing: false,
        })
    }

    onUserRecordingEnded() {
        this.setState({
            playing: false,
        });
    }

    onRecordVideo() {
        let time = this.state.player.getCurrentTime();
        console.log('time', time);
        this.setState({
            startSong: time,
            recording: true,
        })
    }

    onStopRecordVideo() {
        let time = this.state.player.getCurrentTime();
        console.log('time', time);
        this.setState({
            stopSong: time,
            recording: false,
            playing: false
        })

        const { startSong } = this.state;
        this.setState({
            opts: {
                playerVars: {
                    start: startSong,
                    end: time,
                }
            },
        })
    }

    /**
     * Function sets the state of the video player in SearchPlayer
     * when the youTube Api Player component has fully loaded.
     * @param {event} event - youTubePlayer API built-in event. 
     */
    onReady(event) {
        this.setState({
            player: event.target,
        });
    }

    /**
     *  Function makes get request to server to log user out of passport on the server-side,
     * and changes the state of the user authentication client-side.
     */

    logout() {

        axios.get('/logout');
        this.setState({
            isAuthenticated: false,
        })
    }

    /**
     * Function makes call to server with the query string. The server
     * then makes a call to the YouTube API and returns the results.
     * Top results are added to the state and the first result is assigned
     * to selectedResult and loaded into the SearchPlayer.
     */

    onSearch() {
        let query = this.state.query;
        axios.post('/search', { query })
            .then((response) => {
                this.setState({
                    userRecording: null,
                    searchResults: response.data.items,
                    selectedResult: response.data.items[0],
                })
            })
            .catch((err) => {
                console.error('Error searching:', err)
            })
    }

    onGenerate() {
        let query = this.state.query;
        axios.post('/search', { query })
            .then((response) => {
                const tracks = response.data.items;
                tracks.forEach(track => {
                    let title = track.snippet.title.replace(/&amp;/g, '&');
                    title = title.replace(/&#39;/g, '\'');
                    title = title.replace(/&quot;/g, '\"');
                    track.snippet.title = title;
                });
                const sideA = tracks.slice(0, 5);
                const sideB = tracks.slice(5);
                this.setState({
                    sideA,
                    sideB,
                });
            })
            .catch((err) => {
                console.error('Error searching:', err);
            });
    }

    /**
     * Function sets the state base on which tape image the user selects
     * from PlaylistImageSelector.jsx.
     * 
     * @param {object} tape - Object containing name and color of selected tape image.
     */
    onSelectTapeImage(event, tape) {
        this.setState({
            builderImage: tape,
        })
    }

    /**
     * Function stores value of the tape label input field on the state
     * as it changes.
     * @param {*} event - Change event that contains the input field's current value.
     */
    onTapeLabelChange(event) {
        this.setState({
            tapeLabel: event.target.value,
        })
    }

    /**
     * Function loads the selected search result into the searchPlayer
     * and changes calls the built-in youTubePlayer playVideo function 
     * to start the song.
     * @param {object} selected - the selected search result object.
     */
    onResultClick(selected) {
        this.setState({
            playing: true,
            selectedResult: selected,
            opts: {
                playerVars: {
                    start: 0,
                },
            }
        })
        setTimeout(() => {
            this.state.player.playVideo();
        }, 0);
    }


    /**
     * Function takes the song loaded in the searchPlayer and adds it to 
     * the array of songs on sideA, so that they appear in the playlistBuilderList
     * and can be stored in the database.
     * @param {object} song - object containing all the youTube data about the song.
     */
    onPassSongToSideA(song) {
        const { sideA } = this.state;

        song.opts = this.state.opts;
        console.log('song', song);
        
        if (sideA.length < 5) {
            this.setState(prevState => {
                return {
                    recording: false,
                    userRecording: null,
                    sideA: prevState.sideA.concat(song),
                    opts: {
                        playerVars: {
                            start: 0,
                        },
                    }
                }
            })
        } else {
            alert('Side A is full, try adding songs to side B or remove songs to make more space.');
        }
    }

    /**
     * Function takes the song loaded in the searchPlayer and adds it to
     * the array of songs on sideB, so that they appear in the playlistBuilderList
     * and can be stored in the database.
     * @param {object} song - object containing all the youTube data about the song.
     */
    onPassSongToSideB(song) {
        const { sideB } = this.state;

        song.opts = this.state.opts;
        if (sideB.length < 5) {
            this.setState(prevState => {
                return {
                    recording: false,
                    userRecording: null,
                    sideB: prevState.sideB.concat(song),
                    opts: {
                        playerVars: {
                            start: 0,
                        },
                    }
                }
            })
        } else {
            alert('Side B is full, try adding songs to side A or remove songs to make more space.');
        }
    }

    /**
     * Function makes the tapeImageSelector disappear from the page
     * when an image is selected and the user clicks the save button.
     */
    onSaveTapeImage() {
        const { displayImageSelector } = this.state;
        this.setState({
            displayImageSelector: !displayImageSelector,
        })
    }

    /**
     * Function takes the information stored on the state about the playlist,
     * and makes a post request to the server which then stores the information
     * on the database. The isPublic value determines whether the playlist will be shared
     * with the community. Upon succesful storage a second post request is made to the 
     * server to retrieve th playlists id number, so that it may be shared and 
     * displayed on the page. If that call is successful, the client is re-routed
     * to the mixtape player where they can listen to their newly created mix and share it
     * with friends.
     */
    onSavePlaylist() {
        const { googleId, sideA, sideB, builderImage, tapeLabel, isPublic } = this.state;
        const { image, name } = builderImage
        axios.post('/store', {
            userId: googleId,
            aSideLinks: sideA,
            bSideLinks: sideB,
            tapeDeck: image,
            tapeLabel,
            isPublic
        })
            .then((response) => {
                // handle success
                // console.warn(response.config.data);
                let newId = JSON.parse(response.config.data);
                // const {userId} = response.config.data;
                let key = JSON.stringify(newId.aSideLinks);

                axios.post('/getlink', {
                    key
                })
                    .then((response) => {


                        this.setState({
                            queryParam: response.data.id
                        })
                        location.assign(`/mixtape-player?id=${response.data.id}`)
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            })
            .catch((error) => {
                // handle error
                console.log(error);
            })
    }


    /**
     * Function that takes the value of a Make Public radio button and sets it to state.
     * The value determines whether or not to share the mixtape with the broader community.
     * @param {*} event - click event that's current target is the value of making a playlist public
     */
    onMakePublic(event) {
        const { value } = event.target;
        const isPublic = value === 'true' || value === true;
        this.setState({
            isPublic: !isPublic,
        });
    }


    /**
     * Function that removes song from playlistBuilderList.
     * @param {*} event - click event that's currentTarge.id is the song selected for removal from the playlist.
     */
    onDeleteSong(event) {
        const index = event.currentTarget.id[1];
        const side = event.currentTarget.id[0];

        if (side === 'A') {
            this.state.sideA.splice(index, 1);
            const newSideA = this.state.sideA;
            this.setState({
                sideA: newSideA,
            })
        } else if (side === 'B') {
            this.state.sideB.splice(index, 1);
            const newSideB = this.state.sideB;
            this.setState({
                sideB: newSideB,
            })
        }

    }

    /**
    * Function triggered by the fast-forward button. Mimics fast-forward by changing the playback
    * rate and lowering the volume while the button is held-down.
    */
    onForward() {
        this.state.player.setPlaybackRate(2);
        this.state.player.setVolume(50);
    }

    /**
     * Function that restores the volume and speed of the player when the fast-forward
     * button is released.
     */
    onStopForward() {
        this.state.player.setPlaybackRate(1.0);
        this.state.player.setVolume(100);
    }

    /**
     * Function triggered by the rewind button mouseDown event that mimics rewind functionality.
     * When the button is held-down the function retrieves the current time of the video then
     * subtracts from that value to seek backwards on the player on an interval.
     */
    onBackward() {
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
    onStopBackward() {
        clearInterval(this.state.interval);
        this.state.player.playVideo();
        this.state.player.setVolume(100);
    }


    startRecordUser() {
        this.setState({
            recordUser: true,
        });
    }

    stopRecordUser(blob) {
        this.setState({
            recordUser: false,
        });
        const formData = new FormData();
        formData.append('name', 'recording');
        formData.append('recording', blob);
        axios.post('/upload', formData, {
            'Content-Type': 'multipart/form-data',
        })
            .then(({ data }) => {
                this.setState({
                    userRecording: data,
                    selectedResult: {
                        snippet: {
                            title: 'My recording',
                        },
                        id: {
                            videoId: data,
                        },
                        userRecording: true,
                    }
                });
            })
            .catch(err => console.log(err));
    }

    onKick() {
        function noise (){
            var context = new AudioContext;
            function Kick(context) {
                this.context = context;
            };
            Kick.prototype.setup = function () {
                this.osc = this.context.createOscillator();
                // this.osc.frequency.value = 300;
                this.gain = this.context.createGain();
                this.osc.connect(this.gain);
                this.gain.connect(this.context.destination)
            };

            Kick.prototype.trigger = function (time) {
                this.setup();

                this.osc.frequency.setValueAtTime(150, time);
                this.gain.gain.setValueAtTime(1, time);

                this.osc.frequency.exponentialRampToValueAtTime(0.01, time + 0.5);
                this.gain.gain.exponentialRampToValueAtTime(0.01, time + 0.5);

                this.osc.start(time);

                this.osc.stop(time + 0.5);
            };
            var kick = new Kick(context);
            var now = context.currentTime;
            kick.trigger(now);
            kick.trigger(now + 0.5);
            kick.trigger(now + 1);
        }
        this.setState({
            kick: noise(),
        })
    }

    onSnare() {
        function noise() {
            var context = new AudioContext;

            function Snare(context) {
                this.context = context;
            };

        Snare.prototype.noiseBuffer = function () {
            var bufferSize = this.context.sampleRate;
            var buffer = this.context.createBuffer(1, bufferSize, this.context.sampleRate);
            var output = buffer.getChannelData(0);

            for (var i = 0; i < bufferSize; i++) {
                output[i] = Math.random() * 2 - 1;
            }

            return buffer;
        };

        Snare.prototype.setup = function () {
            this.noise = this.context.createBufferSource();
            this.noise.buffer = this.noiseBuffer();
            var noiseFilter = this.context.createBiquadFilter();
            noiseFilter.type = 'highpass';
            noiseFilter.frequency.value = 1000;
            this.noise.connect(noiseFilter);

            this.noiseEnvelope = this.context.createGain();
            noiseFilter.connect(this.noiseEnvelope);

            this.noiseEnvelope.connect(this.context.destination);

            this.osc = this.context.createOscillator();
            this.osc.type = 'triangle';

            this.oscEnvelope = this.context.createGain();
            this.osc.connect(this.oscEnvelope);
            this.oscEnvelope.connect(this.context.destination);
        };

        Snare.prototype.trigger = function (time) {
            this.setup();

            this.noiseEnvelope.gain.setValueAtTime(1, time);
            this.noiseEnvelope.gain.exponentialRampToValueAtTime(0.01, time + 0.2);
            this.noise.start(time)

            this.osc.frequency.setValueAtTime(100, time);
            this.oscEnvelope.gain.setValueAtTime(0.7, time);
            this.oscEnvelope.gain.exponentialRampToValueAtTime(0.01, time + 0.1);
            this.osc.start(time)

            this.osc.stop(time + 0.2);
            this.noise.stop(time + 0.2);
        };
            var snare = new Snare(context);
            var now = context.currentTime;
            snare.trigger(now);
            snare.trigger(now + 0.5);
            snare.trigger(now + 1);
    }
    this.setState({
        snare: noise(),
    })
    }


    render() {
        const { isAuthenticated, searchResults, playing, recording, selectedResult, tapeImages, builderImage, tapeLabel, sideA, sideB, displayImageSelector, onDeckSideA, onDeckSideB, tapeBackgroundColor, queryParam, googleId, userName, isPublic, opts, recordUser } = this.state;
        return (
            <Router>
                <div className="App">
                    <Navigation logout={this.logout} isAuthenticated={isAuthenticated} userName={userName} />
                <Container opts={opts} onForward={this.onForward} onBackward={this.onBackward} onStopBackward={this.onStopBackward} onStopForward={this.onStopForward} authenticateUser={this.authenticateUser} isAuthenticated={isAuthenticated} onReady={this.onReady} onPauseVideo={this.onPauseVideo} onPlayVideo={this.onPlayVideo} onUserRecordingEnded={this.onUserRecordingEnded} onStopRecordVideo={this.onStopRecordVideo} onRecordVideo={this.onRecordVideo} onChange={this.onChange} onSearch={this.onSearch} onGenerate={this.onGenerate} onResultClick={this.onResultClick} playing={playing} recording={recording} searchResults={searchResults} tapeImages={tapeImages} builderImage={builderImage} selectImage={this.onSelectTapeImage} tapeLabel={tapeLabel} onLabelChange={this.onTapeLabelChange} selectedResult={selectedResult} onPassToSideA={this.onPassSongToSideA} sideA={sideA} onPassToSideB={this.onPassSongToSideB} sideB={sideB} displayImageSelector={displayImageSelector} onSaveImage={this.onSaveTapeImage} onDeckSideA={onDeckSideA} onDeckSideB={onDeckSideB} onSavePlaylist={this.onSavePlaylist} onMakePublic={this.onMakePublic} tapeBackgroundColor={tapeBackgroundColor} onDelete={this.onDeleteSong} isPublic={isPublic} queryParam={queryParam} googleId={googleId} startRecordUser={this.startRecordUser} stopRecordUser={this.stopRecordUser} recordUser={recordUser} onKick={this.onKick} onSnare={this.onSnare}/>

                </div>
            </Router>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("app"));