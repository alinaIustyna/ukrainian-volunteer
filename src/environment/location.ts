import { Weather } from "../weather/weather";
import { Sky } from "../sky/sky";
import { Cars } from "../game/cars";
import { Ground } from "../ground/buildings";
import { canvasWidth, canvasHeight } from "../const";
import { Vector2D } from "../utils/vector2d";
import { random } from "lodash";

export class Location {
  private sky: Sky;
  private ground: Ground;
  private cars: Cars;
  private readonly gravity: Vector2D = new Vector2D(0, -5);

  constructor() {
    this.sky = new Sky();
    this.ground = new Ground(canvasWidth, canvasHeight);
    this.cars = new Cars(random(10, canvasWidth), random(0.85 * canvasHeight, 0.9 * canvasHeight));
  }

  public update(currentWeather: Weather, speed: Vector2D) {
    this.sky.update(currentWeather, speed.add(this.gravity));
    this.ground.update(currentWeather, speed.add(this.gravity));
    this.cars.update(currentWeather, speed.add(this.gravity));
  }

  public draw() {
    this.sky.draw();
    this.ground.drawBuildings();
    this.cars.draw();
  }
}
