let num = 5;

function factorialCalculator(number){
  let result = 1;

  for (let i = result; i <= number; i++){
    result*=i;
  }
  return result;
}

const factorial = factorialCalculator(num);
const resultMsg = `Factorial of ${num} is ${factorial}`;
console.log(resultMsg);