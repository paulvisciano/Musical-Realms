import { useEffect, useState } from "react";
import tracks, { Track } from "./tracks";
import { useDispatch, useSelector } from "react-redux";

import TrackPicker from "components/musicalCube/trackPicker/TrackPicker";
import TrackCubes from "components/musicalCube/trackCubes/TrackCubes";

import "./MusicalCubesRealm.css";
import { trackSlice } from "components/musicalCube/TrackSlice";
import { AppState } from "store/store";

const MusicalCubesRealm = () => {
  const dispatch = useDispatch();

  const initializeTrack = (track: Track) => trackSlice.actions.init(track);
  const resetState = () => trackSlice.actions.resetState();

  const selectedTrack = useSelector((state: AppState) => state.track);

  useEffect(() => {
    dispatch(initializeTrack(tracks[0]))
  }, []);

  return (
    <div className="musical-realm">
      <div className="track-cubes-container">
        {selectedTrack && <TrackCubes track={selectedTrack} />}
      </div>

      <div className="track-picker-container">
        <TrackPicker initialTrack={selectedTrack} onTrackSelected={(newTrack: Track) => {
          dispatch(resetState());
          dispatch(initializeTrack(newTrack))
        }
        } />
      </div>
    </div>
  )
};

export default MusicalCubesRealm;
