use diesel::prelude::*;
use serde::Deserialize;

pub mod playlist_commands;
mod playlist_manager;

#[derive(Insertable, Deserialize)]
#[diesel(table_name = crate::schema::playlists)]
pub struct NewPlaylist {
    pub name: String,
    pub coverImage: String,
    pub parentID: Option<i32>,
}

