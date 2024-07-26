// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod db;
mod models;
mod schema;
mod song;
mod playlist;

use tauri::generate_handler;
use crate::playlist::playlist_commands::{get_all_playlists, create_playlist};
use crate::song::song_commands::{get_songs, create_song};

fn main() {
    tauri::Builder::default()
        .invoke_handler(all_handlers())
        .setup(|_app| {
          db::init();
          Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

fn all_handlers() -> impl Fn(tauri::Invoke) + Clone {
    generate_handler![
        get_all_playlists,
        create_playlist,
        get_songs,
        create_song
    ]
}