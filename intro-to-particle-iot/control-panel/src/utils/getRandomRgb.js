const { round, random } = Math;
const MAX = 255;
export default function getRandomRgb() {
  return [round(random() * MAX), round(random() * MAX), round(random() * MAX)];
}
