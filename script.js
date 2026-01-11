const search = document.getElementById("search");
const results = document.getElementById("results");
const audio = document.getElementById("audio");
const cover = document.getElementById("cover");
const title = document.getElementById("title");
const artist = document.getElementById("artist");

function searchMusic(q) {
  const url = `https://api.jamendo.com/v3.0/tracks/?client_id=709fa152&format=jsonp&limit=30&namesearch=${encodeURIComponent(q)}&callback=showResults`;

  const old = document.getElementById("jsonp");
  if (old) old.remove();

  const script = document.createElement("script");
  script.src = url;
  script.id = "jsonp";
  document.body.appendChild(script);
}

function showResults(data) {
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
}

search.addEventListener("keyup", () => {
  if (search.value.length > 2) {
    searchMusic(search.value);
  }
});
