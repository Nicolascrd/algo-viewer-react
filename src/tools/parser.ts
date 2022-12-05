export const parseRawStringArray = function (str: string): Array<number> {
  let arr = str.split(/(-?\d+)/);
  const res = [];
  for (let i = 0; i < arr.length; i++) {
    let n = Number(arr[i]);
    if (arr[i].length > 0 && !isNaN(n)) {
      res.push(n);
    }
  }
  return res;
};
