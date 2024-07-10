// This is where you can fetch data from your YouTube channel using YouTube API
// Example of how to fetch and display latest videos
document.addEventListener('DOMContentLoaded', function() {
    const apiKey = 'YOUR_YOUTUBE_API_KEY';
    const channelId = 'YOUR_CHANNEL_ID';
    const latestVideosSection = document.querySelector('#latest-videos .video-grid');
    const popularContentSection = document.querySelector('#popular-content .video-grid');

    // Fetch latest videos
    fetch(`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=6`)
        .then(response => response.json())
        .then(data => {
            data.items.forEach(item => {
                const videoId = item.id.videoId;
                const videoTitle = item.snippet.title;
                const videoThumbnail = item.snippet.thumbnails.high.url;

                const videoElement = document.createElement('div');
                videoElement.classList.add('video');
                videoElement.innerHTML = `
                    <img src="${videoThumbnail}" alt="${videoTitle}">
                    <h3>${videoTitle}</h3>
                `;
                latestVideosSection.appendChild(videoElement);
            });
        })
        .catch(error => console.error('Error fetching latest videos:', error));

    // Fetch popular videos (you can customize this endpoint)
    fetch(`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=viewCount&maxResults=6`)
        .then(response => response.json())
        .then(data => {
            data.items.forEach(item => {
                const videoId = item.id.videoId;
                const videoTitle = item.snippet.title;
                const videoThumbnail = item.snippet.thumbnails.high.url;

                const videoElement = document.createElement('div');
                videoElement.classList.add('video');
                videoElement.innerHTML = `
                    <img src="${videoThumbnail}" alt="${videoTitle}">
                    <h3>${videoTitle}</h3>
                `;
                popularContentSection.appendChild(videoElement);
            });
        })
        .catch(error => console.error('Error fetching popular videos:', error));
});
