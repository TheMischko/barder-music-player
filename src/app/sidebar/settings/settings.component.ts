import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { SettingsService } from "@services/settings.service";
import { debounceTime, firstValueFrom, Subscription } from "rxjs";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrl: "./settings.component.scss",
})
export class SettingsComponent implements OnInit, OnDestroy {
  tokenControl = new FormControl<string>("");

  private subscriptions: Subscription[] = [];
  constructor(private settings: SettingsService) {}

  ngOnInit() {
    this.subscriptions.push(
      this.settings.getDiscordToken().subscribe((token) => {
        this.tokenControl.setValue(token, {
          emitEvent: false,
        });
      }),
    );

    this.tokenControl.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(async (tokenVal) => {
        const newVal = firstValueFrom(this.settings.setDiscordToken(tokenVal));
      });
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
