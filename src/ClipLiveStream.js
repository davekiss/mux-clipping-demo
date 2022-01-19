import MuxVideo from "@mux-elements/mux-video-react";
import { useEffect, useRef, useState } from "react";
import { createClip, getClip } from "./utils"

const ClipLiveStream = () => {
  const videoRef = useRef();
  const [clipId, setClipId] = useState();
  const [clipPlaybackId, setClipPlaybackId] = useState();

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
    if (!videoRef.current) return;
    const assetId = "vMgreC02g4RSGg1kU6nceV1YMuQkK3bEHLdqkoFRwaTU"

    let clipLength = 10;
    let startTime = Math.max(0, videoRef.current.currentTime - clipLength);
    let endTime = videoRef.current.currentTime;

    const response = await createClip(assetId, startTime, endTime)
    setClipId(response.data.id);
  }

  return (
    <>
      <h1>Clip Live Stream demo</h1>
      <MuxVideo
        style={{ height: "100%", maxWidth: "100%" }}
        ref={videoRef}
        playbackId="DS00Spx1CV902MCtPj5WknGlR102V5HFkDe"
        metadata={{
          video_id: "video-id-123456",
          video_title: "Super Interesting Video",
          viewer_user_id: "user-id-bc-789",
        }}
        envKey="YOUR_MUX_DATA_ENV_KEY"
        streamType="on-demand"
        controls
        autoPlay
        muted
      />

      <button onClick={clipVideo}>Clip it!</button>
      {
        clipPlaybackId && (
          <>
            <h1>Sick replay!!!</h1>
            <MuxVideo
              style={{ height: "100%", maxWidth: "100%" }}
              ref={videoRef}
              playbackId={clipPlaybackId}
              streamType="on-demand"
              controls
              autoPlay
              muted
            />
          </>
        )
      }
    </>
  );
}

export default ClipLiveStream;
