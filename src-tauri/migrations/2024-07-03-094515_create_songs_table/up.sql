CREATE TABLE songs (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  filePath TEXT NOT NULL,
  duration INTEGER NOT NULL,
  playlistID INTEGER,
  orderInPlaylist INTEGER,
  FOREIGN KEY (playlistID) REFERENCES playlists(id)
);

-- Index on playlistID
CREATE INDEX idx_songs_playlistID ON songs(playlistID);

-- Index on orderInPlaylist
CREATE INDEX idx_songs_orderInPlaylist ON songs(orderInPlaylist);

-- Composite Index on playlistID and orderInPlaylist
CREATE INDEX idx_songs_playlistID_orderInPlaylist ON songs(playlistID, orderInPlaylist);