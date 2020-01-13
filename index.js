import {
  addAlbumToPlaylist,
  getPlaylistAlbums,
  getAlbumTrackCount,
  getAlbumTracks,
  getPlaylistsInFolder,
  emptyPlaylist,
  setPlaylistGenre,
  getPlaylistTracks,
  getDetailedAlbumTracks
} from "./music";

const dealWithTrackCounts = (count, album) => {
  if (count == 0) {
    addAlbumToPlaylist(album, "No Track Count");
    return;
  }

  if (totalTracks > count) {
    addAlbumToPlaylist(album, "Too Many Tracks");
    return;
  }
};

const findGenreDoubles = folder => {
  const allPlaylists = getPlaylistsInFolder(folder);
  const seenTracks = [];
  const doubled = [];
  allPlaylists.forEach(playlist => {
    const tracks = getPlaylistTracks(playlist);
    tracks.forEach(track =>
      seenTracks.find(
        seen =>
          seen.name == track.name && seen.artist == track.artist && seen.album == track.album && seen.time == track.time
      )
        ? doubled.push(track)
        : seenTracks.push(track)
    );
  });
  return doubled;
};

function makeNoLove() {
  emptyPlaylist("No Love");
  const albums = getPlaylistAlbums("Unloved").sort();
  const alreadyInPlaylist = [];

  albums
    .filter(album => !alreadyInPlaylist.includes(album))
    .forEach(album => {
      const albumTracks = getDetailedAlbumTracks(album);
      if (albumTracks.length < 2) {
        return; // TODO - what is this?
      }
      const anyLoved = albumTracks.some(track => track.loved === "true");
      console.log(`${album} has ${!anyLoved ? "no " : ""}loved tracks.`);
      addAlbumToPlaylist(album, anyLoved ? "Love" : "No Love");
    });
}

function makeIncomplete(fromScratch = false) {
  if (fromScratch) {
    emptyPlaylist("Full Albums");
  }
  const albums = getPlaylistAlbums("Incomplete Albums");
  albums.forEach(album => {
    const count = getAlbumTrackCount(album);
    const totalTracks = getAlbumTracks(album).length;
    if (totalTracks == count) {
      addAlbumToPlaylist(album, "Full Albums");
    }
  });
}

function setGenres() {
  const genrePlaylists = getPlaylistsInFolder("1. Genres");
  genrePlaylists.forEach(setPlaylistGenre);
  setPlaylistGenre("Uncategorized");
  setPlaylistGenre("Undetermined");
}

function main() {
  makeIncomplete();
}

main();
