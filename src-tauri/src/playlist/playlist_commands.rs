use tauri::{generate_handler};
use crate::db::establish_db_connection;
use crate::models::Playlist;
use crate::playlist;
use crate::playlist::{NewPlaylist, playlist_manager};
use crate::playlist::playlist_manager::{load_all_playlists};

#[tauri::command]
pub fn get_all_playlists() -> Result<Vec<Playlist>, String> {
    let mut connection = establish_db_connection();
    load_all_playlists(&mut connection).map_err(|err| err.to_string())
}

#[tauri::command]
pub fn create_playlist(new_playlist: NewPlaylist) -> Result<Playlist, String> {
    let mut connection = establish_db_connection();
    playlist_manager::create_playlist(&mut connection, new_playlist)
        .map_err(|err| err.to_string())
}