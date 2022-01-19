import { useRef, useEffect, useState } from "react";
import 'media-chrome';
import 'media-chrome/dist/extras/media-clip-selector'
import { createClip, getClip } from "./utils"

const ClipSegment = () => {
  const clipSelectorRef = useRef();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();

  useEffect(() => {
    if (!clipSelectorRef.current) return;

    clipSelectorRef.current.addEventListener('update', (evt) => {
      const { startTime, endTime } = evt.detail;
      setStartTime(startTime);
      setEndTime(endTime);
    });
  }, []);

  return (
    <>
      <media-controller>
        <video
          slot="media"
          src="https://stream.mux.com/DS00Spx1CV902MCtPj5WknGlR102V5HFkDe/high.mp4"
        ></video>
        <media-control-bar>
          <media-play-button></media-play-button>
          <media-clip-selector ref={clipSelectorRef}></media-clip-selector>
          <media-mute-button></media-mute-button>
          <media-volume-range></media-volume-range>
        </media-control-bar>
      </media-controller>

      <div>
        <p>Start time: {startTime}</p>
        <p>End time: {endTime}</p>
      </div>
    </>
  );
}

export default ClipSegment;