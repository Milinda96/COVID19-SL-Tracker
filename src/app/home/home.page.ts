import { Component, OnInit } from "@angular/core";
import { HttpService } from "../http.service";
import * as particleConfig from "./../../assets/data/particles.json";
import { Container } from "tsparticles/dist/Core/Container";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit {
  mediData: Object;
  state = {
    local_active_cases: null,
    update_date_time: null,
    local_deaths: null,
    local_new_cases: null,
    local_recovered: null,
  };
  constructor(private http: HttpService) { }
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
