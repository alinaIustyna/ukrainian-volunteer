import _ from "lodash";
import "p5";
import { Color, Vector } from "p5";
import { Vector2D } from "../utils/vector2d";
import { Weather } from "../weather/weather";
import { canvasWidth } from "../const";
import { Raindrop } from "./raindrop";

export class Cloud {
  public diameter: number;
  private segmentWidth: number[]
  public droplets: Raindrop[] = [];
  private alpha: number = 255;
  public isFading: boolean;
  private color: Color;
  private readonly viscousForce: Vector2D = new Vector2D(0, 5);
  private readonly initialY: number;
  private readonly initialX: number;


  get rightSideX() {
    return this.x + this.diameter;
  }

  constructor(public x, public y) {
    this.diameter = 38;
    this.color = color(209, 204, 255);
    this.initialY = this.y;
    this.diameter = .2 * canvasWidth;
    this.segmentWidth = _.range(0, 4).map(_ => random(this.diameter / 4, this.diameter / 3));
  }

  draw() {
    this.drawCloud();
    this.droplets.forEach((droplet) => droplet.draw());
  }

  drawCloud() {
    fill(this.color);
    circle(this.x + 3 / 25 * this.segmentWidth[0], this.y + 20 / 25 * this.segmentWidth[0], this.segmentWidth[0]); //ліве
    circle(this.x + 27 / 25 * this.segmentWidth[1], this.y + 20 / 25 * this.segmentWidth[1], this.segmentWidth[1]); //праве
    circle(this.x + 15 / 25 * this.segmentWidth[2], this.y + 10 / 25 * this.segmentWidth[2], this.segmentWidth[2]); //верхнє
    circle(this.x + 15 / 25 * this.segmentWidth[3], this.y + 25 / 25 * this.segmentWidth[3], this.segmentWidth[3]); //нижнє
  }

  startFading() {
    this.isFading = true;
  }

  isFaded() {
    return this.alpha < 2;
  }

  update(currentWeather: Weather, speed: Vector2D) {
    if (this.isFading) {
      this.alpha -= 1;
      this.color = color(209, 204, 255, this.alpha);
    }
    this.y += 1.5 * speed.y;
    this.x -= speed.x;
    if (this.y < this.initialY) {
      this.y = this.initialY;
    }
  }

  dropRain() {
    if (this.droplets.length < 1000) {
      for (let i = 0; i < 8; ++i) {
        const x = random(this.x, this.x + this.diameter / 2);
        const y = random(this.y + this.diameter / 2, this.y + this.diameter);
        const raindrop = new Raindrop(x, y, this);
        this.droplets.push(raindrop);
      }
    }
    this.droplets.forEach((droplet) => droplet.move());
  }
}
