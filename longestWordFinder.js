const str = "The quick brown fox jumped over the lazy dog";

function findLongestWordLength(string){
  const words = [];
  const word = string.split(' ');

  let wLength = 0;

  for(let i = 0; i < word.length; i++){
    words.push(word[i].length)

    if(word[i].length > wLength){
      wLength = word[i].length
    }
  }


  return wLength;
}

console.log(findLongestWordLength(str))