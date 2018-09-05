/* globals videojs */
(function() {
  'use strict';

  var player = videojs('main', {
    autoplay: true,
    muted: true,
    preload: 'auto',
    controls: 1
  });

  var imaOptions = {
    id: 'main',
    prerollTimeout: 5000,
    timeout: 5000
  };
  var queryParams = {};

  // types of ads that can be loaded
  var ads = {
    vpaid: 'https://www.vidcpm.com/watch.xml?key=13dfa6312992552d90fa8df33e2d2c60&custom=%7B%27width%27%3A%271024%27%2C%27height%27%3A%27768%27%7D&cb={timestamp}&vastref=almanac.com',
    //vpaid: 'https://bs.serving-sys.com/BurstingPipe/adServer.bs?cn=is&c=23&pl=VAST&pli=14432293&PluID=0&pos=8834&ord=%5Btimestamp%5D&cim=1'
  };

  //var vmapAd = '<vmap:VMAP xmlns:vmap="https://unreel.me/player/main" version="1.0"><vmap:AdBreak timeOffset="00:00:02.000" breakType="linear"><vmap:AdSource id="preroll-1"><vmap:AdTagURI templateType="vast3"><![CDATA[{{AD_URL}}]]></vmap:AdTagURI></vmap:AdSource></vmap:AdBreak></vmap:VMAP>';

  // the video playlist
  var videos = [
    'http://rmcdn.2mdn.net/Demo/vast_inspector/android.mp4',
    'http://rmcdn.2mdn.net/Demo/vast_inspector/android.webm',
    'https://mtc.cdn.vine.co/r/videos/84C4E2C3DD1357938356432023552_574449b2afd.25.1.F040A49F-C8B2-4EC1-8F9F-6525F1365103.mp4?versionId=eweULi8mnxy8zDTuJ4FfkWl4ZeVpOm7r'
    ];
  var videoIndex = 0;
  var activeAd = ads.doubleclick;

  // api
  window.loadNext = loadNext;
  window.loadPrev = loadPrev;

  // init
  _exctractQueryParams();
  _createEventHandlers();
  _init();

  // api fns
  function loadNext() {
    videoIndex++;
    if (videoIndex >= videos.length) { videoIndex = 0; }
    _loadVideo(videos[videoIndex], activeAd);
  }
  function loadPrev() {
    videoIndex--;
    if (videoIndex < 0) { videoIndex = videos.length-1; }
    _loadVideo(videos[videoIndex], activeAd);
  }

  // private
  function _createAdEventHandlers() {
    // TODO
    player.ima.startFromReadyCallback();
  }
  function _createEventHandlers() {
    player.on('ended', function() {
      // auto advance to next video on video end
      loadNext();
    });
  }
  function _exctractQueryParams() {
    var url = window.location.href,
      hashes = url.slice(url.indexOf('?') + 1).split('&');

    hashes.forEach(function(hash) {
      hash = hash.split('=');
      queryParams[hash[0]] = hash[1];
    });
  }
  function _init() {
    if (queryParams.vpaid === '1') { activeAd = ads.vpaid; }

    player.ima(imaOptions, _createAdEventHandlers);
    player.ima.initializeAdDisplayContainer();

    _loadVideo(videos[0], activeAd);
  }
  function _loadVideo(video, ad) {
    if (queryParams.vmap === '1') {
      player.ima.setContentWithAdsResponse(video, vmapAd.replace('{{AD_URL}}', ad));
    } else {
      player.ima.setContentWithAdTag(video, ad, false);
    }
    player.ima.requestAds();
  }
}());
