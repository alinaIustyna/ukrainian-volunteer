import { ratios } from "../utils/ratios";
import _ from "lodash";
import { dayTime } from "../const";
import { Vector2D } from "../utils/vector2d";

export class Ground {
  offset: number = 1;
  private initialY: number;
  private initialX: number;
  constructor(private x: number, private y: number) {
  this.initialY = this.y;
  this.initialX = this.x;
  }

  update(currentWeather, speed: Vector2D) {
    this.y -=  0.5 * speed.y;
    this.offset -= 2 * speed.x;
    if (this.y > this.initialY) {
      this.y = this.initialY;
    }
 
      if (this.x < this.initialX) {
        this.x += this.initialX;
      }
  }

  drawBuildings() {
    const heights = ratios([0.3, 0.47, 0.3, 0.5, 0.6, 0.4, 0.46, 0.38], this.y);
    const widths = ratios([0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1], this.x);
    let offset = 0.1 * this.x;
    _.zip(widths, heights).forEach(([w, h]) => {
      this.drawBuilding(
        offset,
        this.y - h + Math.abs(this.y - this.initialY),
        w,
        h
      );
      offset += w;
    });

    offset = 0;
    _.zip(widths, heights).forEach(([w, h]) => {
      w = 0.8 * w;
      h = 1.2 * h;
      this.drawBuilding(
        offset,
        this.y - h + Math.abs(this.y - this.initialY),
        w,
        h
      );
      offset += w;
    });
         }

  drawBuilding(x: number, y: number, width: number, height: number) {
    noStroke();
    rect(x, y, width, height);
    const [windowW, windowH] = [width * 0.07, height * 0.02];
    const windowRowPadding = 5;
    const windowColPadding = 5;
    for (let row = 0; row < 30; ++row) {
      for (let col = 0; col < 5; ++col) {
        this.drawWindow(x + col * (windowW + windowColPadding), y + row * (windowH + windowRowPadding), windowW, windowH);
      }
    }
    if (dayTime() <= 18) {
      fill(31, 46, 37);
    } else {
      fill("black");
    }
    }

  drawWindow(x: number, y: number, width: number, height: number) {
    noStroke();
    const col = color(random(160, 250));
    fill(col);
    rect(x, y, width, height);
  }

  draw() {
    for (let i = 0; i < 1000; ++i) {
      this.drawBuilding(this.x * i + this.offset, this.y + 20 * (i % 1.5), width, height);
    }
  }
}
