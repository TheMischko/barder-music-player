import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "songTime",
  standalone: true,
})
export class SongTimePipe implements PipeTransform {
  transform(value: number, type: "sec" | "millis" = "sec"): string {
    const totalSeconds = Math.max(0, type === "millis" ? value / 1000 : value);
    const seconds = Math.floor(totalSeconds % 60);
    const minutes = Math.floor(totalSeconds / 60);
    if (minutes > 60) {
      const hours = Math.min(99, Math.floor(minutes / 60));
      return `${hours.toString().padStart(2, "0")}:${(minutes % 60).toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    }
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }
}
