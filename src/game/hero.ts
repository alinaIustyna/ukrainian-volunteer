import { result } from "lodash";
import "p5";
import { Vector } from "p5";
import { Vector2D } from "../utils/vector2d";
import { Weather } from "../weather/weather";

export class Hero {
  speed: Vector2D = new Vector2D(0, 0);
  constructor(public x: number, public y: number) { }

  update(currentWeather: Weather): Vector2D {
    const speed = this.calculateSpeed();
    return speed;
  }

  calculateSpeed(): Vector2D {
    let speed = this.speed;
    if (keyIsDown(UP_ARROW)) {
      this.speed = speed.add(new Vector2D(0, 2));
      if (keyIsDown(RIGHT_ARROW)) {
        this.speed = speed.add(new Vector2D(2, 0));
      }
      if (keyIsDown(LEFT_ARROW)) {
        this.speed = speed.add(new Vector2D(-2, 0));
      } return this.speed;
    }
  }

  getVerticies() {
  }

  draw() {
    fill("white");
    rect(this.x, this.y, 30, 30);
  }
}
