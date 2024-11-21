// map, filter, arrows


// --- Arrows ---

function sum(a,b){
    return a+b
}

//using arrows defining function here..
const minus = (a,b) => {
    return a-b
}
    
const ans = minus(30,4)
console.log(ans)


// --- Map --- 


// method 1 without using map:
var input = [1,2,3,4,5];
var newArray = [];
for(let i=0; i<input.length; i++){
    newArray.push(input[i]*2)
};
console.log(newArray);

// method 2 with map:
var input = [1,2,3,4,5];
function transform(a){
    return a*2;
}
const ans2 = input.map(transform);
console.log(ans2)




// --- Filter ---

// Method 1:
const arr = [12,33,4,5,5,6];
var newArray2 = [];
for(let i=0; i<arr.length; i++){
    if(arr[i]%2==0){
        newArray2.push(arr[i])
    }
}
console.log(newArray2)

// Method 2:

function filtering(n){
    if(n%2==0){
        return true;
    }else{
        return false
    };
}
const newArray3  = arr.filter(filtering);
console.log("here with filtering : ", newArray3)


// another way of wrinting the same :

const newArray4 = arr.filter(function (n){
    if(n%2==0){
        return true;
    }else{
        return false;
    };
})
console.log("With filtering 2 : ", newArray4)