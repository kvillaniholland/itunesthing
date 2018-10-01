import {addAlbumToPlaylist, getPlaylistAlbums, getAlbumTrackCount, getAlbumTracks, getPlaylistsInFolder, setPlaylistGenre, getPlaylistTracks} from './music'

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

const findGenreDoubles = folder => {
  const allPlaylists = getPlaylistsInFolder(folder)
  const seenTracks = []
  const doubled = []
  allPlaylists.map(playlist => {
    const tracks = getPlaylistTracks(playlist)
    tracks.map(track => seenTracks.find(seen => seen.name == track.name && seen.artist == track.artist) ? doubled.push(track) : seenTracks.push(track))
    console.log(doubled)
  })
  return doubled
}

function main() {
  console.log(findGenreDoubles("1. Genres"))
  // const albums = getPlaylistAlbums('Incomplete Albums')
  // albums.forEach(album => {
  //   const count = getAlbumTrackCount(album)
  //   const totalTracks = getAlbumTracks(album).length

  //   if (totalTracks == count) {
  //     addAlbumToPlaylist(album, 'Full Albums')
  //   }
  // })

  // const genrePlaylists = getPlaylistsInFolder('1. Genres')
  // genrePlaylists.forEach(setPlaylistGenre)
  // setPlaylistGenre('Uncategorized')
  // setPlaylistGenre('Undetermined')

}

main()
