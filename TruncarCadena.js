function truncateString(str, num) {
  if (str.length > num) {
    return `${str.slice(0, num)}...`;
  } else if (str.length <= num) {
    return str;
  }
}

console.log(truncateString("A-tisket a-tasket A green and yellow basket", 8));

console.log(truncateString("A-tisket a-tasket A green and yellow basket", "A-tisket a-tasket A green and yellow basket".length));

console.log(truncateString("A-tisket a-tasket A green and yellow basket", "A-tisket a-tasket A green and yellow basket".length + 2));