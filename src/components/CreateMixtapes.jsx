import React from 'react';

import PlaylistImageSelector from './PlaylistImageSelector.jsx';
import Search from './Search.jsx';
import SearchList from './SearchList.jsx';
import PlaylistBuilderList from './PlaylistBuilderList.jsx';
import SearchPlayer from './SearchPlayer.jsx';

/** CreateMixtapes component renders all components associated with creation of a mixtape, including
 * PlaylistImageSelector, Search, SearchPlayer, SearchList, and SearchBuilderList at the 
 * create-mixtapes route and is a child component of Container.
 */

const CreateMixtapes = (props) => {

    const { authenticateUser, searchResults, onSearch, onChange, onPlayVideo, onPauseVideo, onBackward, onForward, onStopBackward, onStopForward, onReady, onResultClick, playing, selectedResult, tapeImages, builderImage, selectImage, tapeLabel, onLabelChange, onPassToSideA, sideA, onPassToSideB, sideB, displayImageSelector, onSaveImage, onSavePlaylist, onMakePublic, recording, onStopRecordVideo, onRecordVideo, tapeBackgroundColor, onDelete, isPublic, queryParam } = props;
  
    return (
        <div style={{marginTop: '4rem'}}>
            {
                displayImageSelector ? 
                    <PlaylistImageSelector tapeImages={tapeImages} selectImage={selectImage} tapeLabel={tapeLabel} onLabelChange={onLabelChange} onSaveImage={onSaveImage} builderImage={builderImage} tapeBackgroundColor={tapeBackgroundColor}/> 
                    :
                    <div className="mx-auto" style={{maxWidth: '860px'}}>
                        <Search onSearch={onSearch} onChange={onChange} />
                        <SearchPlayer onPlayVideo={onPlayVideo} onReady={onReady} onPauseVideo={onPauseVideo} onBackward={onBackward} onForward={onForward} onStopBackward={onStopBackward} onStopForward={onStopForward} playing={playing} recording={recording} onStopRecordVideo={onStopRecordVideo} onRecordVideo={onRecordVideo} searchResults={searchResults} selectedResult={selectedResult} onPassToSideA={onPassToSideA} onPassToSideB={onPassToSideB} />
                        <SearchList searchResults={searchResults} onResultClick={onResultClick}/>
                        <PlaylistBuilderList builderImage={builderImage} tapeLabel={tapeLabel} sideA={sideA} sideB={sideB} onSaveImage={onSaveImage} onSavePlaylist={onSavePlaylist} onMakePublic={onMakePublic} onDelete={onDelete} queryParam={queryParam} isPublic={isPublic} />
                    </div>
            }
        </div>
    )
}

// <SearchList searchResults={searchResults} onPlayVideo={onPlayVideo} onReady={onReady} />

export default CreateMixtapes;