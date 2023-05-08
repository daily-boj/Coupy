let fs = require("fs");
let [size, ...map] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
let [m, n, h] = size.split(" ").map(Number);
let d = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
  [0, n],
  [0, -1 * n],
];
let tomato = 0;
let willVisit = [];

for (let y = 0; y < n * h; y++) {
  map[y] = map[y].split(" ");
  for (let x = 0; x < m; x++) {
    if (map[y][x] == 0) tomato++;
    else if (map[y][x] == 1) willVisit.push([x, y]);
  }
}

if (tomato == 0) return console.log(0);

let nowLevel = willVisit.length;
let nextLevel = 0;
let level = 0;
let index = 0;
while (willVisit.length != index && tomato != 0) {
  if (nowLevel) nowLevel--;
  else {
    level++;
    nowLevel = nextLevel - 1;
    nextLevel = 0;
  }
  if (level > 0) tomato--;
  let [x, y] = willVisit[index];
  let multiplier = Math.floor(y / n);
  let len = 0;
  for (let i = 0; i <= 3; i++) {
    let dx = x + d[i][0];
    let dy = y + d[i][1];
    if (dx >= 0 && dx < m && dy >= n * multiplier && dy < n * (multiplier + 1)) {
      let target = [dx, dy];
      if (map[dy][dx] == 0) {
        map[dy][dx] = 1;
        willVisit.push(target);
        len++;
      }
    }
  }
  for (let i = 4; i <= 5; i++) {
    let dx = x + d[i][0];
    let dy = y + d[i][1];
    if (dy >= 0 && dy < map.length) {
      let target = [dx, dy];
      if (map[dy][dx] == 0) {
        map[dy][dx] = 1;
        willVisit.push(target);
        len++;
      }
    }
  }
  nextLevel += len;
  index++;
}

if (tomato == 0) console.log(level);
else console.log(-1);
