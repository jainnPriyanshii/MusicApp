const BASE = "https://saavn.sumit.co/api";

export const searchAll = async (query) => {
  const res = await fetch(`${BASE}/search?query=${query}`);
  const json = await res.json();
  return json.data;
};




export const getTrendingSongs = async (lang = "hindi") => {

  const res = await fetch(`${BASE}/search/songs?query=trending ${lang}&limit=15`);
  const json = await res.json();
  console.log("getTrendingSongs response:", JSON.stringify(json, null, 2));
  return json.data;
};

export const getTrendingArtists = async () => {
  const res = await fetch(`${BASE}/search/artists?query=popular&limit=10`);
  const json = await res.json();
  console.log("getTrendingArtists response:", JSON.stringify(json, null, 2));
  return json.data;
};

export const getSongDetails = async (id) => {
  const res = await fetch(`${BASE}/songs/${id}`);
  return res.json();
};

export const getAlbumDetails = async (id) => {
  const res = await fetch(`${BASE}/albums/${id}`);
  return res.json();
};

export const getPlaylistDetails = async (id) => {
  const res = await fetch(`${BASE}/playlists/${id}`);
  return res.json();
};
