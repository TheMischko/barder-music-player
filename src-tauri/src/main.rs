// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod db;
mod models;
mod playlist;
mod schema;
mod song;

use crate::playlist::{load_all_playlists, NewPlaylist};
use crate::db::establish_db_connection;
use crate::models::{Playlist, Song};
use crate::song::NewSong;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn get_all_playlists() -> Result<Vec<Playlist>, String> {
    let mut connection = establish_db_connection();
    load_all_playlists(&mut connection).map_err(|err| err.to_string())
}

#[tauri::command]
fn create_playlist(new_playlist: NewPlaylist) -> Result<Playlist, String> {
    let mut connection = establish_db_connection();
    playlist::create_playlist(&mut connection, new_playlist)
      .map_err(|err| err.to_string())
}

#[tauri::command]
fn get_songs(playlist_id: Option<i32>) -> Result<Vec<Song>, String>{
    let mut connection = establish_db_connection();
    if playlist_id.is_none(){
        return song::load_all_songs(&mut connection)
            .map_err(|err| err.to_string())
    }
    song::load_all_songs_for_playlist(&mut connection, playlist_id.unwrap())
        .map_err(|err| err.to_string())
}

#[tauri::command]
fn create_song(new_song: NewSong) -> Result<Song, String>{
    let mut connection = establish_db_connection();
    song::create_song(&mut connection, new_song)
        .map_err(|err| err.to_string())
}


fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_all_playlists, create_playlist, get_songs, create_song])
        .setup(|_app| {
          db::init();
          Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
