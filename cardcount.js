let count = 0;

function cardCounter(card) {
  if (card >= 2 && card <= 6) {
    count++
  } switch (card) {
    case 10:
      count--
      break;
    case "J":
    case "Q":
    case "K":
    case "A":
      count--
      break;
  
  }

  if (count > 0) {
    return `${count} Bet`
  } else {
    return `${count} Hold`
  }
  
  
}

cardCounter(2)
cardCounter(10)
cardCounter("A")