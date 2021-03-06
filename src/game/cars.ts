import { canvasWidth } from "const";
import "p5";
import { Vector2D } from "utils/vector2d";

export class Cars {
  offset: number = 0;

  constructor(public x, public y) { }

  update(currentWether, Speed: Vector2D) {
    this.offset -= Speed.x;
    if (keyIsDown(UP_ARROW)) {
      this.y -= -5 * Speed.y;
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
