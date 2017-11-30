function randomArrayValue(array) {
  const length = array.length - 1, 
    index = Math.floor(Math.random() * (length + 1));

  return array[index];
}

export {randomArrayValue};