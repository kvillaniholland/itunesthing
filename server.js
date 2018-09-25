const exec = require('child_process').exec
const runApplescript = require('run-applescript');
const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x)
const split = (string, token) => string.split(token)
const uniq = array => array.filter((el, i, a) => i === a.indexOf(el))
const runCommand = command => runApplescript.sync(command)
const cmd = command => runCommand(`tell application "iTunes" \n set AppleScript's text item delimiters to "<NEXT>" \n ${command} \n end tell`)
const commaSplit = string => split(string, '<NEXT>')
const splitUniq = pipe(commaSplit, uniq)

const getFolderPlaylistsScript = playlist => `
  set myList to {}
	set myFolder to folder playlist "${playlist}"

	set myPlaylists to playlists
	repeat with aPlaylist in myPlaylists
		try
			if aPlaylist's parent = myFolder then set end of myList to aPlaylist's name
		end try
	end repeat
return myList as text
`

const getGenres = () => pipe(
  runCommand,
  commaSplit,
  uniq
)('tell application "iTunes" to get genre of every track of playlist "Library"')

const getAlbumsByGenre = genre => pipe(
  runCommand,
  commaSplit,
  uniq,
)(`tell application "iTunes" to get album of every track of playlist "Library" where genre is equal to "${genre}"`)

const getPlaylistsInFolder = folder => pipe(
  cmd,
  commaSplit
)(getFolderPlaylistsScript(folder))

const setPlaylistGenre = playlist => runCommand(`tell application "iTunes" to set genre of every track in playlist "${playlist}" to "${playlist}"`)

const setAlbumGenre = (album, genre) => runCommand(`tell application "iTunes" to set genre of every track where album is equal to "${album}" to "${genre}"`)

const getPlaylistAlbums = playlist => pipe(
  cmd,
  splitUniq
)(`set theAlbums to get album of every track of user playlist "${playlist}" as text`)

const getAlbumTracks = album => pipe(
  cmd,
  splitUniq
)(`set theTracks to get name of (every track of playlist "Library" where album is equal to "${album}") as text`)

const getAlbumTrackCount = album => runCommand(`tell application "iTunes" to get track count of first track where album is equal to "${album}"`)

const addAlbumToPlaylist = (album, playlist) => runCommand(`tell application "iTunes" to duplicate (every track where album is equal to "${album}") to user playlist "${playlist}"`)


function main() {
  const albums = getPlaylistAlbums('Incomplete Albums')
  albums.forEach(album => {
    const count = getAlbumTrackCount(album)
    const totalTracks = getAlbumTracks(album).length

    // console.log(`Album: ${album}.\tCount: ${count}.\tActual: ${totalTracks}.`)

    if (count == 0) {
      // addAlbumToPlaylist(album, 'No Track Count')
      return
    }

    if (totalTracks > count) {
      // addAlbumToPlaylist(album, 'Too Many Tracks')
      return
    }

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
