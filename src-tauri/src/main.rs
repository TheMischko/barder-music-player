// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod db;
mod models;
mod playlist;
mod schema;

use crate::playlist::{load_all_playlists, NewPlaylist};
use crate::db::establish_db_connection;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn get_all_playlists(window: tauri::Window) {
    let mut connection = establish_db_connection();
    let playlists = load_all_playlists(&mut connection).unwrap();
    window.emit("playlists", playlists).unwrap();
}

#[tauri::command]
fn create_playlist(new_playlist: NewPlaylist) -> Result<usize, String> {
    let mut connection = establish_db_connection();
  playlist::create_playlist(&mut connection, new_playlist)
      .map_err(|err| err.to_string()) // Convert the diesel::result::Error to a String
}


fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet])
        .setup(|_app| {
          db::init();
          Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
