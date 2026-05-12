//Solucion 1
function maskEmail(email) {
  if (email.includes("@")) {
    const aEmail = email.indexOf("@");
    const domain = email.slice(aEmail);
    const user = email.slice(email, aEmail);
    const mask = user.slice(1, -1);
    const encrypt = "*".repeat(mask.length);
    const userFirstChar = user[0];
    const userLastChar = user[user.length-1];
    const finalEncryption = `${userFirstChar}${encrypt}${userLastChar}${domain}`;
    
    return finalEncryption;
  };

}
const email = "info@test.dev";
console.log(maskEmail(email));

//Solucion 2
function maskEmail(email) {
  if (email.includes("@")) {
    const aEmail = email.indexOf("@");
    const domain = email.slice(aEmail +1)
    const user = email.slice(0, aEmail)
    const mask = user.slice(1, -1);
    const encrypt = "*".repeat(mask.length);
    const userFirstChar = user[0];
    const userLastChar = user[user.length-1];
    const finalEncryption = `${userFirstChar}${encrypt}${userLastChar}@${domain}`;
    
    return finalEncryption
  };

}

const email = "apple.pie@example.com";

console.log(maskEmail(email));