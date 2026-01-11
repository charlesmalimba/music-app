const search = document.getElementById("search");
const results = document.getElementById("results");
const audio = document.getElementById("audio");
const cover = document.getElementById("cover");
const title = document.getElementById("title");
const artist = document.getElementById("artist");

search.addEventListener("keyup", () => {
  if (search.value.length > 2) {

    const jamendoURL = "https://api.jamendo.com/v3.0/tracks/?client_id=709fa152&format=json&limit=30&namesearch=" + encodeURIComponent(search.value);

    const proxy = "https://cors.isomorphic-git.org/";

    fetch(proxy + jamendoURL)
      .then(res => res.json())
      .then(data => {
        results.innerHTML = "";

        if (!data.results) {
          results.innerHTML = "<p>No songs found</p>";
          return;
        }

        data.results.forEach(song => {
          const div = document.createElement("div");
          div.innerHTML = `
            <img src="${song.album_image}" width="150">
            <h4>${song.name}</h4>
            <p>${song.artist_name}</p>
          `;
          div.onclick = () => {
            audio.src = song.audio;
            audio.play();
            cover.src = song.album_image;
            title.innerText = song.name;
            artist.innerText = song.artist_name;
          };
          results.appendChild(div);
        });
      })
      .catch(err => {
        results.innerHTML = "<p>API blocked — try refreshing</p>";
        console.error(err);
      });
  }
});
