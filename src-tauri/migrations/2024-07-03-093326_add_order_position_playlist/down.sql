-- Step 1: Disable foreign key constraints
PRAGMA foreign_keys = OFF;

-- Step 2: Create a new table without the orderPosition column
CREATE TEMPORARY TABLE backup_playlist(
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  coverImage TEXT NOT NULL,
  parentID INTEGER,
  created_at TIMESTAMP NOT NULL
);

-- Step 3: Copy data from the original table to the new table
INSERT INTO backup_playlist(id, name, coverImage, parentID, created_at)
SELECT id, name, coverImage, parentID, created_at FROM playlists;

-- Step 4: Drop the original table
DROP TABLE playlists;

-- Step 5: Rename the new table to the original table's name
ALTER TABLE backup_playlist RENAME TO playlists;

-- Step 6: Recreate indexes and constraints if necessary (example)
-- CREATE INDEX idx_playlist_parentID ON playlists(parentID);

-- Step 7: Re-enable foreign key constraints
PRAGMA foreign_keys = ON;
