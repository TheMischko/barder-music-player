use diesel::prelude::*;
use crate::models::Song;
use crate::schema::songs::dsl::{songs, id, orderInPlaylist, playlistID};
use serde::Deserialize;

#[derive(Insertable, Deserialize)]
#[diesel(table_name = crate::schema::songs)]
pub struct NewSong {
    pub name: String,
    pub filePath: String,
    pub duration: i32,
    pub playlistID: Option<i32>,
    pub orderInPlaylist: Option<i32>,
}

pub fn create_song(connection: &mut SqliteConnection, new_song: NewSong) -> QueryResult<Song> {
    use crate::schema::songs::dsl::*;
    diesel::insert_into(songs)
        .values(new_song)
        .execute(connection)?;
    songs.order(id.desc()).first(connection)
}

pub fn load_all_songs(connection: &mut SqliteConnection) -> QueryResult<Vec<Song>> {
    songs.select(songs::all_columns()).load(connection)
}

pub fn load_all_songs_for_playlist(connection: &mut SqliteConnection, playlist_id: i32) -> QueryResult<Vec<Song>> {
    songs.filter(playlistID.eq(playlist_id)).order_by(orderInPlaylist.asc()).load(connection)
}