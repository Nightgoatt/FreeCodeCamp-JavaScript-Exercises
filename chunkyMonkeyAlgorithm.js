const array = ["a", "b", "c", "d"];

function chunkArrayInGroups(arr, size){
  const chunkArray = [];

  //salta cada dos bloques "size"
  for(let i = 0; i < arr.length; i += size){
      chunkArray.push(arr.slice(i, i + size));
  }
  return chunkArray;
}

console.log(chunkArrayInGroups(array, 2))