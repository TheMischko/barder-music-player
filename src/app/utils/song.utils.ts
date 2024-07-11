import { Observable } from "rxjs";
import { FileService } from "@services/file.service";
import { path as Path } from "@tauri-apps/api";

export class SongUtils {
  public static getNameFromPath(
    filepath: string,
    fileService: FileService,
  ): Observable<string> {
    return new Observable<string>((subscriber) => {
      const metadataSub = fileService.readMP3Data(filepath).subscribe((metadata) => {
        if (metadata?.title?.length > 0) {
          subscriber.next(metadata.title);
        }
        subscriber.complete();
        metadataSub.unsubscribe();
      });
      Path.basename(filepath).then((filename) => {
        subscriber.next(SongUtils.parseNameFromFileName(filename));
      });
    });
  }

  public static parseNameFromFileName(filename: string) {
    const parts = filename.split(/[^a-zA-Z0-9]+/);
    if (parts.length < 1) {
      return "";
    }
    return parts
      .slice(0, parts.length - 1)
      .map((part) => [part[0].toUpperCase(), part.substring(1)].join(""))
      .join(" ");
  }
}
