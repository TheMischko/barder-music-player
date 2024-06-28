import { Song } from "../models/music";
import { Playlist } from "../models/playlist";

const song1: Song = {
  id: "1",
  title: "Cobblestone Village",
  duration: 258000,
  src: "assets/playlist/Cobblestone_Village.mp3",
};
const song2: Song = {
  id: "1",
  title: "Market Town",
  duration: 217000,
  src: "assets/playlist/Market_Town.mp3",
};
const song3: Song = {
  id: "1",
  title: "Timber Town",
  duration: 214000,
  src: "assets/playlist/Timber_Town.mp3",
};
const song4: Song = {
  id: "1",
  title: "Village Atmo KCD",
  duration: 80000,
  src: "assets/playlist/Village_Atmo_KCD.mp3",
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
