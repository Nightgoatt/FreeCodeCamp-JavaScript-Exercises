const arr = ["hello", "Hello"];

function mutation(array){
  let check = array[0].toLowerCase();
   
  //itera en cada array
  for(let i = 0; i < array.length; i++){

      //ignora el primer string/entrada
      if(i === 0 ){
        continue;
      }
      const words = array[i].toLowerCase();

      //itera en cada letra del array
      for(let j = 0; j < words.length; j++){
        const word = words[j];
        
        //revisa si check no incluye cada letra
        if(!check.includes(word)){
          return false;
        }
      }
    }
  return true;

};

console.log(mutation(arr));