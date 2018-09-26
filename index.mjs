import {addAlbumToPlaylist, getPlaylistAlbums, getAlbumTrackCount, getAlbumTracks, getPlaylistsInFolder, setPlaylistGenre} from './music.mjs'

const dealWithTrackCounts = (count, album) => {
  if (count == 0) {
    addAlbumToPlaylist(album, 'No Track Count')
    return
  }

  if (totalTracks > count) {
    addAlbumToPlaylist(album, 'Too Many Tracks')
    return
  }
}

function main() {
  const albums = getPlaylistAlbums('Incomplete Albums')
  albums.forEach(album => {
    const count = getAlbumTrackCount(album)
    const totalTracks = getAlbumTracks(album).length


    if (totalTracks == count) {
      addAlbumToPlaylist(album, 'Full Albums')
    }
  })

  const genrePlaylists = getPlaylistsInFolder('1. Genres')
  genrePlaylists.forEach(setPlaylistGenre)
  setPlaylistGenre('Uncategorized')
  setPlaylistGenre('Undetermined')
}

main()
