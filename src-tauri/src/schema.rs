// @generated automatically by Diesel CLI.

diesel::table! {
    playlists (id) {
        id -> Integer,
        name -> Text,
        coverImage -> Text,
        parentID -> Nullable<Integer>,
        created_at -> Timestamp,
    }
}
