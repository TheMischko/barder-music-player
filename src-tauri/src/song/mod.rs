use diesel::prelude::*;
use crate::models::Song;
use crate::schema::songs::dsl::{songs, id, orderInPlaylist, playlistID};
use serde::Deserialize;

pub mod song_commands;
mod song_manager;

#[derive(Insertable, Deserialize)]
#[diesel(table_name = crate::schema::songs)]
pub struct NewSong {
    pub name: String,
    pub filePath: String,
    pub duration: i32,
    pub playlistID: Option<i32>,
    pub orderInPlaylist: Option<i32>,
}

