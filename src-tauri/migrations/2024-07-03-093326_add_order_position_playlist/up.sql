-- Step 1: Add the new column
ALTER TABLE playlists ADD COLUMN orderPosition INTEGER;

-- Step 2: Create a temporary table with orderPosition calculated
CREATE TEMPORARY TABLE temp_playlist AS
SELECT id, ROW_NUMBER() OVER(PARTITION BY parentID ORDER BY id) as orderPosition
FROM playlists;

-- Step 3: Update the original table using data from the temporary table
UPDATE playlists
SET orderPosition = (SELECT orderPosition FROM temp_playlist WHERE temp_playlist.id = playlists.id);

-- Step 4: Drop the temporary table
DROP TABLE temp_playlist;
