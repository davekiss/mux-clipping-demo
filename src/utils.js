export const getClip = async (clipId) => {
  const rawResponse = await fetch(`/my-api/video/v1/assets/${clipId}`);
  const response = await rawResponse.json();
  console.log(response);
  return response;
}

export const createClip = async (assetId, startTime, endTime) => {
  console.log(`Creating a clip from ${startTime} to ${endTime}`);

  const rawResponse = await fetch('/my-api/video/v1/assets', {
    method: 'POST',
    body: JSON.stringify({
      "input": [{
        "url": `mux://assets/${assetId}`,
        "start_time": startTime,
        "end_time": endTime
      }],
      "playback_policy": ["public"]
    })
  });

  const response = await rawResponse.json();
  return response
}