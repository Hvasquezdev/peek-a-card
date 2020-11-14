export const shuffleArray = (arr, cb) => {
  const arrToShuffle = Array.from(arr);

  for (let i = arrToShuffle.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    if (j !== i) {
      [arrToShuffle[i], arrToShuffle[j]] = [arrToShuffle[j], arrToShuffle[i]];

      if (cb) {
        cb(arrToShuffle[i], arrToShuffle[j], i, j);
      }
    }
  }

  return arrToShuffle;
};
