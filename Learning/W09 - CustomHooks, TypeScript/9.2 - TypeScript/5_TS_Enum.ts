// Enum , stands for enumeration, it is just for better readability for human, while writing code. 

enum Direction {
    up, 
    down, 
    left, 
    right
}

function showDirection(key: Direction){
    if(key==Direction.up){
        console.log("yes it is up")
    }
}

showDirection(Direction.up)

// --------------------- without enum case ============

// that's it, however it can also be done with below code, like:
type Direction2 = "up" | "down" | "right" | "left"

function showDirection2(key: Direction2){
    if(key="up"){
        console.log("yes it is up")
    }
}

showDirection2("up")

// but, as i said for better readability and writability , we can use enums.


// ------------------------------------------------------------------------------------

// now, for below enum, when it gets converted to js, these values gets changed to 0,1,2,3,
enum Direction3 {
    up, 
    down, 
    left, 
    right
}
console.log(Direction3.up) // this will log 0

// so, if you need to log exact value, you can explitidly give those values name.like:
enum Direction4 {
    up = "up", 
    down  = "down", 
    left = "left", 
    right = "right"
}
console.log(Direction4.up) // this will log up


// another way of giving value 
enum Direction5 {
    up = 1, // rest will automaticlly get 2,3,4
    down , 
    left ,
    right,
}


// ------------------------------------- Common usage of enums are in express like -----------------

enum ResponseStatus {
    Success =  200,
    NotFound = 404,
    Error = 500
}

// app.get("/", (req, res) =>{
//     if(!req.query.userID){
//         res.status(ResponseStatus.Error).json({msg:"Eroor"})
//     }
// })