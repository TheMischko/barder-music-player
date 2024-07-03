-- Your SQL goes here
CREATE INDEX idx_playlist_parentID ON playlists(parentID);
CREATE INDEX idx_playlist_order_position ON playlists(orderPosition);