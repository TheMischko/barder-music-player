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
    pub created_at: NaiveDateTime
}
