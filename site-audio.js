const siteAudio = document.getElementById("site-audio");

if (siteAudio) {
    const storedTime = localStorage.getItem("love-audio-time");
    const wasPlaying = localStorage.getItem("love-audio-playing") === "true";

    if (storedTime) {
        siteAudio.addEventListener(
            "loadedmetadata",
            function () {
                const safeTime = Number(storedTime);

                if (!Number.isNaN(safeTime) && safeTime >= 0) {
                    siteAudio.currentTime = safeTime;
                }
            },
            { once: true }
        );
    }

    const syncPlaybackState = function () {
        localStorage.setItem("love-audio-time", String(siteAudio.currentTime));
        localStorage.setItem("love-audio-playing", String(!siteAudio.paused));
    };

    ["play", "pause", "timeupdate", "ended"].forEach(function (eventName) {
        siteAudio.addEventListener(eventName, syncPlaybackState);
    });

    if (wasPlaying) {
        siteAudio.play().catch(function () {
            localStorage.setItem("love-audio-playing", "false");
        });
    }
}
