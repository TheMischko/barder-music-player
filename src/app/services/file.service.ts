import { Injectable } from "@angular/core";
import { exists, FsOptions, readBinaryFile, readTextFile } from "@tauri-apps/api/fs";
import { Observable } from "rxjs";
import * as musicMetadata from "music-metadata-browser";
import { MP3Data } from "../models/music";

@Injectable({
  providedIn: "root",
})
export class FileService {
  public static UNKNOWN_SONG_TITLE = "Unknown song";
  constructor() {}

  public fileExists(path: string): Observable<boolean> {
    return new Observable((observer) => {
      exists(path).then((exists) => {
        observer.next(exists);
        observer.complete();
      });
    });
  }

  public readBinaryFile(path: string, options?: FsOptions): Observable<Uint8Array> {
    return new Observable((observer) => {
      readBinaryFile(path, options).then((data) => {
        observer.next(data);
        observer.complete();
      });
    });
  }

  public readTextFile(path: string, options?: FsOptions): Observable<string> {
    return new Observable((observer) => {
      readTextFile(path, options).then((data) => {
        observer.next(data);
        observer.complete();
      });
    });
  }

  public readMP3Data(path: string, options?: FsOptions): Observable<MP3Data> {
    return new Observable((observer) => {
      this.readBinaryFile(path, options).subscribe(async (data) => {
        const metaData = await musicMetadata.parseBlob(new Blob([data]));
        observer.next({
          title: metaData.common.title || FileService.UNKNOWN_SONG_TITLE,
          duration: metaData.format.duration || 0,
          artist: metaData.common.artist || null,
        });
      });
    });
  }

  public readMP3ToBase64(path: string, options?: FsOptions): Observable<string> {
    return new Observable((observer) => {
      const readSub = this.readBinaryFile(path, options).subscribe(async (data) => {
        const extension = path.split(".").pop();
        const base64Str = Buffer.from(data).toString("base64");
        const contentType = `audio/${extension}`;
        observer.next(`data:${contentType};base64,${base64Str}`);
        observer.complete();
        readSub.unsubscribe();
      });
    });
  }
}
