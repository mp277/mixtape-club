import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons'

/** PlaylistBuilderList component renders the cassette image, title, and song selections of the user
 * at the create-mixtapes route and is a child component of CreateMixtapes.
 */

const PlaylistBuilderList = (props) => {
    const { builderImage, tapeLabel, sideA , sideB, onSaveImage, onSavePlaylist, onMakePublic, onDelete, isPublic } = props;

    const shareCommunityLabel = "Share with the community";

    return (
        <div className="border border-info playlist-builder shadow-sm p-3 mb-5 bg-white rounded">
        <div className="row">
                <div className="col-md-4" style={{ margin: ".2rem 0" }}>
                    <h5 style={{ textAlign: "center" }}>{tapeLabel} Mixtape:</h5>
                    <img className="col-md-12" src={builderImage.image} style={{ margin: ".4rem 0" }}/>
                    <button className="btn btn-outline-info col-6 col-md-12 mx-auto" type="submit" style={{ margin: ".4rem 0" }} onClick={onSaveImage}>Edit Cassette</button>
                    <button className="btn btn-info col-6 col-md-12 mx-auto" type="submit" onClick={onSavePlaylist}>Save Mixtape</button>   
                    <label>
                        <input type="checkbox" name={shareCommunityLabel} value={isPublic} checked={isPublic} onChange={onMakePublic} />
                    </label>
                    { shareCommunityLabel }
                 </div>
                <div className="col-sm-4 col-md-2" style={{marginTop: "1rem"}}>
                    <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                        <a className="nav-link active" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">Side A</a>
                        <a className="nav-link" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">Side B</a>
                    </div>
                </div>
                <div className="col-sm-4 col-md-5">
                    <div className="tab-content" id="v-pills-tabContent">
                        <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
                            <ul className="list-group list-group-flush builder-tracks">
                                <li className="list-group-item track-li">{sideA[0] ? sideA[0].snippet.title : 'Track 1 A'} <FontAwesomeIcon icon={faMinusCircle} style={{ float: 'right', color: '#17a2b8' }} id={'A0'} onClick={onDelete} /></li>
                                <li className="list-group-item track-li">{sideA[1] ? sideA[1].snippet.title : 'Track 2 A'} <FontAwesomeIcon icon={faMinusCircle} style={{ float: 'right', color: '#17a2b8' }} id={'A1'} onClick={onDelete} /></li>
                                <li className="list-group-item track-li">{sideA[2] ? sideA[2].snippet.title : 'Track 3 A'} <FontAwesomeIcon icon={faMinusCircle} style={{ float: 'right', color: '#17a2b8' }} id={'A2'} onClick={onDelete} /></li>
                                <li className="list-group-item track-li">{sideA[3] ? sideA[3].snippet.title : 'Track 4 A'} <FontAwesomeIcon icon={faMinusCircle} style={{ float: 'right', color: '#17a2b8' }} id={'A3'} onClick={onDelete} /></li>
                                <li className="list-group-item track-li">{sideA[4] ? sideA[4].snippet.title : 'Track 5 A'} <FontAwesomeIcon icon={faMinusCircle} style={{ float: 'right', color: '#17a2b8' }} id={'A4'} onClick={onDelete} /></li>
                            </ul>
                        </div>
                        <div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                            <ul className="list-group list-group-flush builder-tracks">
                                <li className="list-group-item track-li">{sideB[0] ? sideB[0].snippet.title : 'Track 1 B'} <FontAwesomeIcon icon={faMinusCircle} style={{ float: 'right', color: '#17a2b8' }} id={'B0'} onClick={onDelete} /></li>
                                <li className="list-group-item track-li">{sideB[1] ? sideB[1].snippet.title : 'Track 2 B'} <FontAwesomeIcon icon={faMinusCircle} style={{ float: 'right', color: '#17a2b8' }} id={'B1'} onClick={onDelete} /></li>
                                <li className="list-group-item track-li">{sideB[2] ? sideB[2].snippet.title : 'Track 3 B'} <FontAwesomeIcon icon={faMinusCircle} style={{ float: 'right', color: '#17a2b8' }} id={'B2'} onClick={onDelete} /></li>
                                <li className="list-group-item track-li">{sideB[3] ? sideB[3].snippet.title : 'Track 4 B'} <FontAwesomeIcon icon={faMinusCircle} style={{ float: 'right', color: '#17a2b8' }} id={'B3'} onClick={onDelete} /></li>
                                <li className="list-group-item track-li">{sideB[4] ? sideB[4].snippet.title : 'Track 5 B'} <FontAwesomeIcon icon={faMinusCircle} style={{ float: 'right', color: '#17a2b8' }} id={'B4'} onClick={onDelete} /></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
    </div>
    )
}

export default PlaylistBuilderList;