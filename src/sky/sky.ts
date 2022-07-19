import _ from "lodash";
import { Color } from "p5";
import { Weather } from "../weather/weather";
import { Cloud } from "./cloud";
import { Star } from "./star";
import { Moon } from "./moon";
import { Sun } from "./sun";
import { Vector2D } from "../utils/vector2d";
import { canvasHeight } from "../const";

const getCurrentMinute = () => frameCount % (24 * 600);
const getCurrentHour = () => getCurrentMinute() / 600;

export class Sky {
  color: Color;
  clouds: Cloud[] = [];
  sun: Sun;
  moon: Moon;
  stars: Star[] = [];

  update(currentWeather: Weather, Speed: Vector2D) {
    const difference = Math.abs(currentWeather.cloudiness - this.clouds.length);
    if (this.clouds.length < currentWeather.cloudiness) {
      this.addClouds(difference);
    } else {
      this.startCloudsRemoval(difference);
    }
    this.updateClouds(currentWeather, Speed);
  }

  addClouds(n: number) {
    let previousCloudPosition: number;
    for (let i = 0; i < n; ++i) {
      previousCloudPosition = this.clouds.at(-1)?.rightSideX ?? 0;
      let newCloud = new Cloud(random(previousCloudPosition, 1.1 * previousCloudPosition), random(0.1 * canvasHeight, 0.4 * canvasHeight));
      this.clouds.push(newCloud);
    }
  }

  startCloudsRemoval(n: number) {
    const alreadyFading = this.clouds.filter((c) => c.isFading).length;
    for (let i = alreadyFading; i < n; ++i) {
      this.clouds[i].startFading();
    }
  }

  updateClouds(currentWeather: Weather, Speed: Vector2D) {
    if (currentWeather.precipitation.value > 0) {
      this.clouds.forEach((cloud) => cloud.dropRain());
    }
    this.clouds.forEach((cloud) => cloud.update(currentWeather, Speed));
    this.clouds = this.clouds.filter((cloud) => !cloud.isFaded());
  }

  draw() {
    this.drawSkyBackground();
    this.clouds.forEach((cloud) => cloud.draw());
  }

  drawSkyBackground() {
    const currentHour = getCurrentHour();
    const [fromColor, toColor, fromHour, toHour] = _.find<
      [Color, Color, number, number]
    >(
      [
        [color("LightSalmon"), color("Khaki"), 3, 7],
        [color("Khaki"), color("SkyBlue"), 7, 8],
        [color("SkyBlue"), color("SlateBlue"), 8, 17],
        [color("SlateBlue"), color("LightCoral"), 17, 20],
        [color("LightCoral"), color("MidnightBlue"), 20, 22],
        [color("MidnightBlue"), color("Black"), 22, 24],
        [color("Black"), color("LightSalmon"), 0, 3]
      ],
      ([fromColor, toColor, fromHour, toHour]) =>
        fromHour <= currentHour && currentHour <= toHour
    );

    this.drawSkyBg(fromColor, toColor, fromHour, toHour);
  }

  drawSkyBg(start: Color, end: Color, startHour: number, endHour: number) {
    const proportion = map(
      getCurrentMinute(),
      startHour * 600,
      endHour * 600,
      0,
      1
    );
    const bgColor = lerpColor(start, end, proportion);
    background(bgColor);
  }
}
