# videojs-demo

Hosted at <https://sivitas.github.io/videojs-demo/>

Autoplay and muted video demo with preroll ad using Google IMA SDK
Muted so it support mobile autoplay

## Current Issues
1. Clicking the `next` button while ad is playing will load next video but break the ad. Ad will not play on second video and will throw an error on third video ([ticket 354](https://github.com/googleads/videojs-ima/issues/354))
    * If you pause then play on the second video, the ad plays
    * Eventually the ad will 'fix' itself after 2-3 videos from the first 'skip'
2. Adding the query param `?vpaid=1` will load a vpaid ad which does not autoplay on mobile phones ([ticket 341](https://github.com/googleads/videojs-ima/issues/341))
3. Adding the query param '?vmap=1' will load the ad as a VMAP with a time offset of 2s, thus creating a midroll ad
    * Wait for the ad to finish playing, then go to next video, the ad should still be a midroll on the next video, however it turns into a preroll
    * Something else I noticed is: I have `prerollTimeout: 5000` and `timeout: 5000` set as suggested in [ticket 167](https://github.com/googleads/videojs-ima/issues/167) to prevent content from appearing before the preroll ad starts. However, in this case of only midroll and no preroll, the video is delayed from autostarting by the full `prerollTimeout` time
