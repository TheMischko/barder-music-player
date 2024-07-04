import { Song } from "../models/music";
import { Playlist } from "../models/playlist";

const song1: Song = {
  id: 1,
  name: "Cobblestone Village",
  duration: 258000,
  filePath: "assets/playlist/Cobblestone_Village.mp3",
};
const song2: Song = {
  id: 1,
  name: "Market Town",
  duration: 217000,
  filePath: "assets/playlist/Market_Town.mp3",
};
const song3: Song = {
  id: 1,
  name: "Timber Town",
  duration: 214000,
  filePath: "assets/playlist/Timber_Town.mp3",
};
const song4: Song = {
  id: 1,
  name: "Village Atmo KCD",
  duration: 80000,
  filePath: "assets/playlist/Village_Atmo_KCD.mp3",
};
export const PlaylistMock: Playlist[] = [
  {
    coverImage: "assets/playlist-covers/coastal-village.jpg",
    id: 1,
    name: "Village music",
    parentID: null,
    songs: [song1, song2],
  },
  {
    coverImage: "assets/playlist-covers/knight-moon-mountains.jpg",
    id: 2,
    name: "Snow village music",
    parentID: 1,
    songs: [song3, song4],
  },
  {
    coverImage: "assets/playlist-covers/knight-moon-mountains.jpg",
    id: 3,
    name: "Dark music",
    parentID: null,
    songs: [song1, song2, song3, song4],
  },
];
