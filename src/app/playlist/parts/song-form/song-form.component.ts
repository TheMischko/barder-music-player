import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";
import { Song } from "../../../models/music";
import { FormControl, FormGroup } from "@angular/forms";
import { debounceTime, firstValueFrom, Observable, Subscription } from "rxjs";
import { FileService } from "@services/file.service";
import { SongService } from "@services/song.service";
import { SongUtils } from "../../../utils/song.utils";

@Component({
  selector: "app-song-form",
  templateUrl: "./song-form.component.html",
  styleUrl: "./song-form.component.scss",
})
export class SongFormComponent implements OnInit, OnDestroy, OnChanges {
  @Input() song: Song | undefined;
  @Input() playlistId: number;
  @Output() submit = new EventEmitter<Song>();
  songForm: FormGroup;

  subscriptions: Subscription[] = [];
  mp3ExistsSubscription: Subscription;
  mp3ReadSubscription: Subscription;

  constructor(private fileService: FileService) {}
  ngOnInit() {
    this.songForm = new FormGroup({
      songId: new FormControl(this.song?.id.toString() ?? ""),
      name: new FormControl(this.song?.name ?? ""),
      filePath: new FormControl(this.song?.filePath ?? ""),
      playlistId: new FormControl(this.playlistId ? this.playlistId.toString() : ""),
    });

    const pathChangeSub = this.songForm
      .get("filePath")
      .valueChanges.pipe(debounceTime(1000))
      .subscribe((filePath) => {
        if (this.mp3ExistsSubscription) {
          this.mp3ExistsSubscription.unsubscribe();
        }
        this.mp3ExistsSubscription = this.fileService
          .fileExists(filePath)
          .subscribe((exists) => {
            if (!exists) {
              this.songForm.get("filePath").setErrors({ invalidFilePath: true });
            }
            if (this.songForm.get("name").value === "") {
              if (this.mp3ReadSubscription) {
                this.mp3ReadSubscription.unsubscribe();
              }

              this.mp3ReadSubscription = SongUtils.getNameFromPath(
                filePath,
                this.fileService,
              ).subscribe({
                next: (title) => {
                  if (
                    title &&
                    title.length > 0 &&
                    title !== FileService.UNKNOWN_SONG_TITLE
                  ) {
                    this.songForm.get("name").setValue(title);
                  }
                },
                error: (err) => {
                  this.songForm.get("filePath").setErrors(err);
                },
                complete: () => {
                  this.mp3ExistsSubscription.unsubscribe();
                },
              });
            }
          });
      });
    this.subscriptions.push(pathChangeSub);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.playlistId) {
      this.songForm?.get("playlistId").setValue(changes.playlistId.currentValue);
    }
    if (changes.song) {
      this.songForm?.get("songId").setValue(changes.song.currentValue.id);
      this.songForm?.get("name").setValue(changes.song.currentValue.name);
      this.songForm?.get("filePath").setValue(changes.song.currentValue.filePath);
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    if (this.mp3ExistsSubscription) {
      this.mp3ExistsSubscription.unsubscribe();
    }
    if (this.mp3ReadSubscription) {
      this.mp3ReadSubscription.unsubscribe();
    }
  }

  onSubmit(): void {
    firstValueFrom(this.songFromData$).then((song) => {
      this.submit.emit(song);
    });
  }

  private get songFromData$(): Observable<Song> {
    return new Observable((observer) => {
      const formData = this.songForm.value;
      this.fileService.readMP3Data(formData.filePath).subscribe((metaData) => {
        observer.next({
          id: formData.songId,
          name: formData.name,
          filePath: formData.filePath,
          playlistID: formData.playlistId,
          duration: SongService.convertSecondsToMillis(metaData.duration),
        });
      });
    });
  }
}
