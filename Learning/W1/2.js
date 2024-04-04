// arrays, and Functions.

const personArray = ["Vishnu" ,"Rohit", "Hero"];
console.log(personArray[0]);


const agesArray = [12,13,16,17,19];

for (let i=0; i < agesArray.length; i++){
    if (agesArray[i]%2==0){
        console.log(agesArray[i])
    }
}


// now using objects in array.

const objectsArray = [
    {
        person : "Vishnu",
        gender : "male"
    },{
        person : "Rohit",
        gender : "male"
    },{
        person : "Hero",
        gender : "male"
    }
]

console.log(objectsArray[1].person)



// FUNCTIONS

function giveSum(a,b){
    const value = a+b;
    return value;
}

const value = giveSum(2,3);
console.log(value);


// Givning function to a function as a argument, 

function giveSum2(a,b, fnToCall){
    const value = a+b;
    return fnToCall(value);
}

function displayResult(data){
    console.log("Result it : "+data);
}

const ans = giveSum2(1,2,displayResult);