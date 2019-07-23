import React from "react";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";

import Landing from "./Landing.jsx";
import Login from "./Login.jsx";
import CreateMixtapes from "./CreateMixtapes.jsx";
import MixtapePlayer from "./MixtapePlayer.jsx";

/** Container component handles the front-end routing/rendering of the app and renders the Login,
 * CreateMixtapes, and MixtapePlayer components at their respective routes. Container is a child 
 * component of App.
 */

function Container(props) {

    const { isAuthenticated, authenticateUser, location, searchResults, onChange, onSearch, onPlayVideo, onReady, onPauseVideo, onResultClick, playing, selectedResult, tapeImages, builderImage, selectImage, tapeLabel, onLabelChange, onPassToSideA, sideA, onPassToSideB, sideB, displayImageSelector, onSaveImage, onDeckSideA, onDeckSideB, onSavePlaylist, onMakePublic, tapeBackgroundColor, onDelete, isPublic, queryParam, googleId } = props;
   
    return (
            <section className="route-section">
                <Switch location={location}>
                console.log(location);
                    <Route exact path="/" component={Login} />
                    
                    <Route path='/create-mixtapes'
                    render={(props) => isAuthenticated ? (<CreateMixtapes {...props} searchResults={searchResults} authenticateUser={authenticateUser} onReady={onReady} onSearch={onSearch} onChange={onChange} onPauseVideo={onPauseVideo} onPlayVideo={onPlayVideo} onResultClick={onResultClick} playing={playing} selectedResult={selectedResult} tapeImages={tapeImages} builderImage={builderImage} selectImage={selectImage} tapeLabel={tapeLabel} onLabelChange={onLabelChange} onPassToSideA={onPassToSideA} sideA={sideA} onPassToSideB={onPassToSideB} sideB={sideB} displayImageSelector={displayImageSelector} onSaveImage={onSaveImage} onSavePlaylist={onSavePlaylist} onMakePublic={onMakePublic} tapeBackgroundColor={tapeBackgroundColor} onDelete={onDelete} isPublic={isPublic} />) : (<Login {...props} />) } />

                    <Route path='/mixtape-player'
                    render={(props) => <MixtapePlayer {...props} isPublic={false} onDeckSideA={onDeckSideA} onDeckSideB={onDeckSideB} queryParam={queryParam} googleId={googleId}/>} />

                    <Route path='/mixtape-player/:id' component={MixtapePlayer}
                    render={(props) => <MixtapePlayer {...props} isPublic={false} onDeckSideA={onDeckSideA} onDeckSideB={onDeckSideB} queryParam={queryParam}/>} />

                    <Route path='/login'
                    render={(props) => <Login {...props} />} />

                    <Route path='/mixtape-player/public'
                    render={(props) => <MixtapePlayer {...props} isPublic={true} onDeckSideA={onDeckSideA} onDeckSideB={onDeckSideB} queryParam={queryParam} googleId={googleId}/>} />
                </Switch>
            </section>
    );
}

// <Route path="/create-mixtapes" component={CreateMixtapes} searchResults={searchResults} />

export default withRouter(Container);