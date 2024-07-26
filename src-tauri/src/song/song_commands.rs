use crate::db::establish_db_connection;
use crate::models::Song;
use crate::song::{NewSong, song_manager};
use crate::song::song_manager::{load_all_songs, load_all_songs_for_playlist};

#[tauri::command]
pub fn get_songs(playlist_id: Option<i32>) -> Result<Vec<Song>, String>{
    let mut connection = establish_db_connection();
    if playlist_id.is_none(){
        return load_all_songs(&mut connection)
            .map_err(|err| err.to_string())
    }
    load_all_songs_for_playlist(&mut connection, playlist_id.unwrap())
        .map_err(|err| err.to_string())
}

#[tauri::command]
pub fn create_song(new_song: NewSong) -> Result<Song, String>{
    let mut connection = establish_db_connection();
    song_manager::create_song(&mut connection, new_song)
        .map_err(|err| err.to_string())
}