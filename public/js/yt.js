
        var tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        var player;
        var vid_id = "u-C3FUbSi4E";

        function onYouTubeIframeAPIReady() {
            player = new YT.Player('player', {
                height: (9 / 16) * ($(window).width() - 400) + ''
                , width: $(window).width() - 400 + ''
                , videoId: vid_id
                , playerVars: {
                    controls: 0
                    , disablekb: 1
                    , showinfo: 0
                }
                , events: {
                    'onReady': onPlayerReady
                    , 'onStateChange': onPlayerStateChange
                }
            });
        }

        function onPlayerReady(event) {
            event.target.playVideo();
            event.target.setPlaybackQuality("small");
            setInterval(seek, 1000);
            setInterval(updateTime, 200);
        }
        var done = false;

        function onPlayerStateChange(event) {}

        function stopVideo() {
            player.stopVideo();
        }
    var player;
        function seek() {
            $.get("/seek", {
                website: "youtube"
                , videoid: "Z5ezsReZcxU"
            }).done(function (data) {
                var ret = JSON.parse(data);
                var serverTime = parseInt(ret.date);
                var clientTime = new Date().getTime();
                var delay = clientTime - serverTime;
                var seek = parseInt(ret.currentTime) - delay;
                if (Math.abs(player.getCurrentTime() - seek / 1000) > .2) {
                    player.seekTo(seek / 1000);
                }
            });
        }
        var apiKey = "AIzaSyDSm23IlFZInjpmtauRNi_tz-z0Pf1ygd0";
        try {
            request = new XMLHttpRequest();
        }
        catch (e) {
            try {
                request = new ActiveXObject("Microsoft.XMLHTTP");
            }
            catch (e) {}
        }
        var apiKey = "AIzaSyDSm23IlFZInjpmtauRNi_tz-z0Pf1ygd0";
        request.open("GET", "https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=" + vid_id + "&key=" + apiKey, true);
        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                var vidInfo = JSON.parse(request.responseText);
                document.getElementById("title").innerHTML = vidInfo.items[0].snippet.title;
                videolength = convertISO8601ToSeconds(vidInfo.items[0].contentDetails.duration);
                document.querySelector('#time').value = "00:00 / 00:00";
            }
        };

        function updateTime() {
            time = player.getCurrentTime();
            document.getElementById('time').innerText = doubledigit(Math.floor(time / 60)) + ":" + doubledigit(Math.floor(time % 60)) + " / " + doubledigit(Math.floor(videolength / 60)) + ":" + doubledigit(videolength % 60);
        }

        function convertISO8601ToSeconds(input) {
            var reptms = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/;
            var hours = 0
                , minutes = 0
                , seconds = 0
                , totalseconds;
            if (reptms.test(input)) {
                var matches = reptms.exec(input);
                if (matches[1]) hours = Number(matches[1]);
                if (matches[2]) minutes = Number(matches[2]);
                if (matches[3]) seconds = Number(matches[3]);
                totalseconds = hours * 3600 + minutes * 60 + seconds;
            }
            return (totalseconds);
        }
        var doubledigit = function n(n) {
            return n > 9 ? "" + n : "0" + n;
        }
        request.send();