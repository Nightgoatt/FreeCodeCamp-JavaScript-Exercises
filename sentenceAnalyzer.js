//Get Vowel Count
function getVowelCount(sentence) {
  const vowels = "aeiou";
  let count = 0;

  for (const char of sentence.toLowerCase()) {
    if (vowels.includes(char)) {
      count++;
    }
  }
  return count;
}

const vowelCount = getVowelCount("Apples are tasty fruits");
console.log(`Vowel Count: ${vowelCount}`);

//Get Consonant Count
function getConsonantCount(sentence) {
  const vowels = 'aeiou';
  const signs = ' ,?@#%^&*()-=+!:;'
  let count = 0;

  for (const char of sentence.toLowerCase()) {
    if(!vowels.includes(char) && !signs.includes(char)) {
      count++
    }
  }
  return count
};

const consonantCount = getConsonantCount("Coding is fun")
console.log(`Consonant Count: ${consonantCount}`)

//Get Punctuation Count
function getPunctuationCount(sentence) {
  const stringPunctuation = ".,;:...¿?¡!\"'«»()[]—-";
  let count = 0;

  for (const char of sentence) {
    if(stringPunctuation.includes(char)) {
      count++
    }
  }
  return count;
};

const punctuationCount = getPunctuationCount("WHAT?!?!?!?!?");
console.log(`Punctuation Count: ${punctuationCount}`);

//Get Words Count
function getWordCount(sentence) {
  let count = 0;
  const check = " ";

  for (const char of sentence.split(" ")) {
    if(!check.includes(char)) {
      count++
    }
    
  }
  return count
};

const wordCount = getWordCount("I love freeCodeCamp");
console.log(`Word Count: ${wordCount}`);