import { canvasHeight, canvasWidth } from "const";
import { result } from "lodash";
import "p5";
import { ratios } from "utils/ratios";
import { Vector2D } from "utils/vector2d";
import { Hero } from "./hero";
import { Cars } from "./cars";

export class Road {
    currentRoad = 0;
    roads: Road[];
    obstacle: Cars;

    constructor(public x: number, public y: number, private hero: Hero) {
    }

    update(currentRoad: Road) {
        if (keyIsDown(DOWN_ARROW)) {
            this.currentRoad -= 1;
            this.hero.y = this.roads[this.currentRoad].y;
        }
        if (keyIsDown(UP_ARROW)) {
            this.currentRoad += 1;
            this.hero.y = this.roads[this.currentRoad].y;
        }
    }

    getVerticies() {
    }

    checkForCollisions() {
        const verticies = this.hero.getVerticies()
        let isCollisions = false;
        return verticies(v => {
            const [x, y] = v
            const isInX = x > this.obstacle.x && x < this.obstacle.x + this.obstacle.width;
            const isInY = y > this.obstacle.y && y < this.obstacle.y + this.obstacle.height;
            return isInX && isInY;
        })
    }

    calculateRoadY() {
        let roadY = [window.innerHeight - 40, window.innerHeight - 60, window.innerHeight - 80];
    }
}