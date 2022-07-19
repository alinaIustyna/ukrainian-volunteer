export const canvasWidth = Math.min(700, window.innerWidth - 10);
export const canvasHeight = window.innerHeight - 20;
export const MoonRadius = 50;
export const starRadius = 0.04 * MoonRadius;
export var currDay = new Date();
export var dayTime = () => currDay.getHours();
