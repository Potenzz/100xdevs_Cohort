/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

function isAnagram(string1, string2) {
  if (string1.length !== string2.length) {
    return false;
  } else {
    // Converting the strings to lowercase, split into arrays, sort, and join back into strings
    const sortedString1 = string1.toLowerCase().split('').sort().join('');
    const sortedString2 = string2.toLowerCase().split('').sort().join('');


    // Comparing the sorted strings
    return sortedString1 === sortedString2;
  }
}

module.exports = isAnagram;
