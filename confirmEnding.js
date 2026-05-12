function confirmEnding(str, end) {
  const bb = str.substring(str.length -end.length)
  if (bb.includes(end)){
    return true
  } else {
    return false
  }
}

console.log(confirmEnding("Congratulation", "on"));