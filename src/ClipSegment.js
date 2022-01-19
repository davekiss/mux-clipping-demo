import { useRef, useEffect, useState } from "react";
import 'media-chrome';
import 'media-chrome/dist/extras/media-clip-selector'
import { createClip, getClip } from "./utils"

const ClipSegment = () => {
  const clipSelectorRef = useRef();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [clipId, setClipId] = useState();
  const [clipPlaybackId, setClipPlaybackId] = useState();

  useEffect(() => {
    if (!clipSelectorRef.current) return;

    clipSelectorRef.current.addEventListener('update', (evt) => {
      const { startTime, endTime } = evt.detail;
      setStartTime(startTime);
      setEndTime(endTime);
    });
  }, []);

  useEffect(() => {
    if (!clipId) return;

    const job = setInterval(async () => {
      // check status
      const clip = await getClip(clipId);

      if (clip.data.status === "ready") {
        const playbackId = clip.data.playback_ids[0].id;
        console.log(`Playback ID is ready! ${playbackId}`)
        setClipPlaybackId(playbackId);
        clearInterval(job)
      }
    }, 1000);

    return () => clearInterval(job);
  }, [clipId]);

  const clipVideo = async () => {
    const assetId = "vMgreC02g4RSGg1kU6nceV1YMuQkK3bEHLdqkoFRwaTU"
    const response = await createClip(assetId, startTime, endTime)
    setClipId(response.data.id);
  }

  return (
    <>
      <h1>Clip Segment</h1>
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
        <button onClick={clipVideo}>Clip it!</button>
      </div>

      {
        clipPlaybackId && (
          <>
            <h1>Sick replay!!!</h1>

            <media-controller>
              <video
                slot="media"
                src={`https://stream.mux.com/${clipPlaybackId}/high.mp4`}
              ></video>
              <media-control-bar>
                <media-play-button></media-play-button>
                <media-mute-button></media-mute-button>
                <media-volume-range></media-volume-range>
              </media-control-bar>
            </media-controller>
          </>
        )
      }
    </>
  );
}

export default ClipSegment;