import React from 'react';
import { Link } from "react-router-dom";

/** UserMixtapesList component renders list of mixtapes created by the currently logged in user
 * at the mixtape-player route and is a child component of MixtapePlayer
 */

const UserMixtapesList = (props) => {
    const { searchResults, userPlaylists, userName, tapeRefresh, isPublic } = props;
    
    return (
        <ul className="list-group col-12 mx-auto my-mixtape-list">
            <li className="list-group-item active  border border-info bg-info"> {isPublic ? 'Public Mixtapes:' : 'My Mixtapes:'} </li>
            {userPlaylists.map((playlist, i) => {
                return (<li className="list-group-item" key={i} id={playlist._id} onClick={tapeRefresh} >
                    <Link to={`/mixtape-player?id=${playlist._id}`} className="navbar-brand  user-mixes" >{playlist.tapeLabel} {userName !== '' ? `by ${userName}` : null}</Link>
                </li>) 
            })}
        </ul>
    )
}


export default UserMixtapesList;