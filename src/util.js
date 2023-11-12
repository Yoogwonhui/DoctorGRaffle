export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

export function addZero(num) {
  if (num < 10) return '00' + num;
  else if (num < 100) return '0' + num;
  else return num + '';
}
