import runApplescript from 'run-applescript'

const runCommand = command => runApplescript.sync(command)
export const cmd = command => runCommand(`tell application "iTunes" \n set AppleScript's text item delimiters to "<NEXT>" \n ${command} \n end tell`)
export const getFolderPlaylistsScript = playlist => `
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
