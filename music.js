import {pipe, zip} from 'fandy'
import {cmd, getFolderPlaylistsScript} from './itunes'
import {splitUniq, splitResponse} from './utils'
import escape from 'escape-string-applescript';

const getGenres = () => pipe(
  cmd,
  splitUniq,
)('get genre of every track of playlist "Library"')

const getAlbumsByGenre = genre => pipe(
  cmd,
  splitUniq,
)(`get album of every track of playlist "Library" where genre is equal to "${genre}"`)

export const getPlaylistsInFolder = folder => pipe(
  getFolderPlaylistsScript,
  cmd,
  splitResponse
)(folder)

export const setPlaylistGenre = playlist => cmd(`set genre of every track in playlist "${playlist}" to "${playlist}"`)

const setAlbumGenre = (album, genre) => cmd(`set genre of every track where album is equal to "${album}" to "${genre}"`)

export const getPlaylistAlbums = playlist => pipe(
  cmd,
  splitUniq
)(`set theAlbums to get album of every track of user playlist "${playlist}" as text`)

export const getAlbumTracks = album => pipe(
  album => `set theTracks to get name of (every track of playlist "Library" where album is equal to "${album}") as text`,
  cmd,
  splitUniq
)(escape(album))

export const getAlbumTrackCount = album => cmd(`get track count of first track where album is equal to "${escape(album)}"`)

export const addAlbumToPlaylist = (album, playlist) => cmd(`duplicate (every track where album is equal to "${escape(album)}") to user playlist "${playlist}"`)

export const emptyPlaylist = playlist => cmd(`delete tracks of playlist "${playlist}"`)

export const getPlaylistTracks = playlist => {
  const names = splitResponse(cmd(`set theTracks to get name of (every track of playlist "${playlist}") as text`))
  const artists = splitResponse(cmd(`set theTracks to get artist of (every track of playlist "${playlist}") as text`))
  const albums = splitResponse(cmd(`set theTracks to get album of (every track of playlist "${playlist}") as text`))
  const times = splitResponse(cmd(`set theTracks to get time of (every track of playlist "${playlist}") as text`))
  const objects = zip(['name', 'artist', 'album', 'time'], names, artists, albums, times)
  return objects
}

export const getDetailedAlbumTracks = album => {
  const names = splitResponse(cmd(`set theTracks to get name of (every track of playlist "Library" where album is equal to "${album}") as text`))
  const artists = splitResponse(cmd(`set theTracks to get artist of (every track of playlist "Library" where album is equal to "${album}") as text`))
  const albums = splitResponse(cmd(`set theTracks to get album of (every track of playlist "Library" where album is equal to "${album}") as text`))
  const times = splitResponse(cmd(`set theTracks to get time of (every track of playlist "Library" where album is equal to "${album}") as text`))
  const loved = splitResponse(cmd(`set theTracks to get loved of (every track of playlist "Library" where album is equal to "${album}") as text`))
  const objects = zip(['name', 'artist', 'album', 'time', 'loved'], names, artists, albums, times, loved)
  return objects
}
