import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Song } from "../../../models/music";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: "app-song-form",
  templateUrl: "./song-form.component.html",
  styleUrl: "./song-form.component.scss",
})
export class SongFormComponent implements OnInit {
  @Input() song: Song | undefined;
  @Input() playlistId: number;
  @Output() submit = new EventEmitter<Song>();
  songForm: FormGroup;
  ngOnInit() {
    this.songForm = new FormGroup({
      songId: new FormControl(this.song?.id ?? undefined),
      name: new FormControl(this.song?.name ?? ""),
      filePath: new FormControl(this.song?.filePath ?? ""),
      playlistId: new FormControl(this.playlistId),
    });
  }

  onSubmit() {
    this.submit.emit();
  }

  private get songFromData(): Song {
    const formData = this.songForm.value;

    return {
      id: formData.songId,
      name: formData.name,
      filePath: formData.filePath,
      playlistID: formData.playlistId,
      duration: 0,
    };
  }
}
