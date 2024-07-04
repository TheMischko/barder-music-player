import { AppModule } from "./app/app.module";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { Buffer } from "buffer";
import * as prc from "process";

window.Buffer = Buffer;
window.process = prc;

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
