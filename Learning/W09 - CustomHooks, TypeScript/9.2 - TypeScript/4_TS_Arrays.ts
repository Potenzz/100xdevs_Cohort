
// 1:
// need to define the type of array here. 
function anyfunc(arr: number[]){
    return 0
}

anyfunc([1,2,3])

// can also use type here.
type arrayType = number[];
function anyfunc2(arr: arrayType){
    return 0
}

// 2. 

interface Users {
    name: string, 
    age: number, 
}

function filterUsers(users: Users[]){
    return 0
}

filterUsers([{
    name:"Vishn",
    age:18
},{
    name:"noone",
    age:10
}])