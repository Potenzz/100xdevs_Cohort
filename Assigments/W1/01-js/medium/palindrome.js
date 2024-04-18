/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
  
  flag = true;
  let pattern = /[^a-zA-Z0-9]/g;

  str=str.replace(pattern, '');
  strlen = str.length;

  reverse_str = str.split('').reverse().join('');

  for (let i=0; i < strlen/2; i++){
      if (str[i].toLowerCase()!=reverse_str[i].toLowerCase()){
        flag = false;
      }
  }
  return flag;
}

module.exports = isPalindrome;
