use diesel::prelude::*;
use diesel::RunQueryDsl;
use crate::models::Playlist;
use crate::schema::playlists::dsl::{id, playlists};
use crate::playlist::{NewPlaylist};

pub fn create_playlist(connection: &mut SqliteConnection, new_playlist: NewPlaylist) -> QueryResult<Playlist> {
    use crate::schema::playlists::dsl::*;
    diesel::insert_into(playlists)
        .values(new_playlist)
        .execute(connection)?;
    playlists.order(id.desc()).first(connection)
}

pub fn load_all_playlists(connection: &mut SqliteConnection) -> QueryResult<Vec<Playlist>> {
    playlists.select(playlists::all_columns()).load(connection)
}