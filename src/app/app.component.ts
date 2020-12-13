import { Component, OnInit } from "@angular/core";
import { HttpService } from "./http.service";
import * as particleConfig from "./../assets/data/particles.json";
import { Container } from "tsparticles/dist/Core/Container";

import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent implements OnInit {
  mediData: Object;
  state = {
    local_active_cases: null,
    update_date_time: null,
    local_deaths: null,
    local_new_cases: null,
    local_recovered: null,
  };
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private http: HttpService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  ngOnInit(): void {
    this.http.getMediData().subscribe((data) => {
      this.mediData = data;
      for (const i in this.mediData) {
        if (Object.prototype.hasOwnProperty.call(this.mediData, i)) {
          const element = this.mediData[i];
          this.state = element;
        }
      }
      console.log(this.state);
    });
  }
  id = "tsparticles";
  particlesOptions = particleConfig["default"];

  particlesLoaded(container: Container): void {
    setTimeout(async () => {
      const canvas = container.canvas.element;
      if (!canvas) {
        console.log("no canvas");
        return;
      }

      const pxRatio = container.retina.pixelRatio;
      container.canvas.size.width = canvas.offsetWidth * pxRatio;
      container.canvas.size.height = canvas.offsetHeight * pxRatio;
      canvas.width = container.canvas.size.width;
      canvas.height = container.canvas.size.height;

      console.log(canvas);
      /* density particles enabled */
      container.densityAutoParticles();
      for (const [, plugin] of container.plugins) {
        if (plugin.resize !== undefined) {
          plugin.resize();
        }
      }

      await container.refresh();
    }, 50);
  }
}
