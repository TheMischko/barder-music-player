use diesel::prelude::*;
use serde::Serialize;
use chrono::NaiveDateTime;
use diesel::Identifiable;

#[derive(Identifiable, Queryable, Selectable, Clone, Serialize)]
#[diesel(table_name = crate::schema::playlists)]
pub struct Playlist {
    pub id: i32,
    pub name: String,
    pub coverImage: String,
    pub parentID: Option<i32>,
    pub created_at: NaiveDateTime,
    pub orderPosition: Option<i32>
}

#[derive(Identifiable, Queryable, Selectable, Clone, Serialize)]
#[diesel(table_name = crate::schema::songs)]
pub struct Song {
    pub id: i32,
    pub name: String,
    pub filePath: String,
    pub duration: i32,
    pub playlistID: Option<i32>,
    pub orderInPlaylist: Option<i32>,
}