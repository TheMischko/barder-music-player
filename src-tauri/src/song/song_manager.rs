use diesel::prelude::*;
use diesel::{QueryResult, SqliteConnection};
use crate::models::Song;
use crate::schema::songs::dsl::{songs, id, orderInPlaylist, playlistID};
use serde::Deserialize;
use crate::song::NewSong;

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