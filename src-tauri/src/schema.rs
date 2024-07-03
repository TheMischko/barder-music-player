// @generated automatically by Diesel CLI.

diesel::table! {
    playlists (id) {
        id -> Integer,
        name -> Text,
        coverImage -> Text,
        parentID -> Nullable<Integer>,
        created_at -> Timestamp,
        orderPosition -> Nullable<Integer>,
    }
}

diesel::table! {
    songs (id) {
        id -> Integer,
        name -> Text,
        filePath -> Text,
        duration -> Integer,
        playlistID -> Nullable<Integer>,
        orderInPlaylist -> Nullable<Integer>,
    }
}

diesel::joinable!(songs -> playlists (playlistID));

diesel::allow_tables_to_appear_in_same_query!(
    playlists,
    songs,
);
