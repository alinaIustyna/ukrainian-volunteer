import { canvasHeight, canvasWidth } from "const";
import "p5";
import { Vector2D } from "utils/vector2d";

export class Cars {
  offset: number = 1;
  private readonly initialyY: number;
  private readonly initialyX: number;

  constructor(public x, public y, public width, public height) {
    this.initialyY = this.y;
  }

  update(currentWether, speed: Vector2D) {
    this.y += 4 * speed.y;
    this.offset -= 2 * speed.x;
    if (this.y < this.initialyY) {
      this.y = this.initialyY;
    }
    if (this.x > this.initialyX) {
      this.x += this.initialyX;
    }
  }

  drawCar(x: number, y: number) {
    fill("red");
    rect(x, y, 22, 15);
  }

  draw() {
    for (let i = 0; i < 1000; ++i) {
      this.drawCar(this.x * i + this.offset, this.y + 20 * (i % 1.5));
    }
  }
}
