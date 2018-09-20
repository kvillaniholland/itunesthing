const exec = require('child_process').exec
const runApplescript = require('run-applescript');
const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x)
const split = (string, token) => string.split(token)
const uniq = array => array.filter((el, i, a) => i === a.indexOf(el))
const runCommand = command => runApplescript.sync(command)
const commaSplit = string => split(string, ', ')


const getFolderPlaylistsScript = playlist => `
tell application "iTunes"
  set myList to {}
	set myFolder to folder playlist "${playlist}"

	set myPlaylists to playlists
	repeat with aPlaylist in myPlaylists
		try
			if aPlaylist's parent = myFolder then set end of myList to aPlaylist's name
		end try
	end repeat
end tell
return myList
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
  runCommand
)(getFolderPlaylistsScript(folder))

const getSongsInPlaylist = playlist => pipe()

const setAlbumGenre = (album, genre) => runCommand(`tell application "iTunes" to set genre of every track where album is equal to "${album}" to "${genre}"`)

function main() {
  console.log(getPlaylistsInFolder('1. Genres'))
}

main()
