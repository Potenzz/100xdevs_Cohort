/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  transactions is an array where each
  Transaction - an object like 
        {
		id: 1,
		timestamp: 1656076800000,
		price: 10,
		category: 'Food',
		itemName: 'Pizza',
	}
  Output - [{ category: 'Food', totalSpent: 10 }] // Can have multiple categories, only one example is mentioned here
*/

function calculateTotalSpentByCategory(transactions) {
  let Categories = [];

  for (let item of transactions) {
      let price = item.price;
      let eachCategory = item.category;

      let found = false;
      for (let index = 0; index < Categories.length; index++) {
          if (Categories[index].category === eachCategory) {
              // Update the existing category with new values
              let totalPrice = Categories[index].totalSpent + price;
              Categories[index] = { category: eachCategory, totalSpent: totalPrice };
              found = true;
              break; 
          }
      }

      if (!found) {
          let Value = {
              category: eachCategory,
              totalSpent: price
          };
          Categories.push(Value);
      }
  }

  return Categories;
}
module.exports = calculateTotalSpentByCategory;
