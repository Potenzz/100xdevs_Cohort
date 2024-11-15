// Need of Ts, Ts, Installtion, Baics of Ts, tsconfig.json


// ----------------- BackStory ---------------------
// There are two types of Programming langages, either 
// Loosly typed - Python, JavaScript, Perl, php, 
// or Strongly Typesd - Java, C, C++, Rust

// Benifits of each:
// Loosly typed - Easy to write code, Fast to bootstrap,
// Strongly Typed - Lesser Runtime Error, Stricter Codebase, Easy to catch error at compile time.

// In real world, Strongly Typed Languages is Preferred, Which Javascript isn't, Henced TypeScript was introduced,
// to add Types top of Javascript. 

// This Below wil work in JavaScrit, as it doesn't ask the type of it, but in TypeScript it will ask, 
// function main(){
//     let num = 10;
//     num = "hell";
//     return num;
// }


//  -----------------------------------------------------------------------

// TypeScript - Prog Lang develoed and maintained by Microsoft. 
// It is a strict Syntactical Superset of JavaScript, and adds optional static typing to the language.


// Where and How the TypeScript code run?
// TypeScript code never runs in your browser, the Browser can only understand javaScript. 

// 1. JavaScript is a runtime language( the thing which actually runs in your browser/nodejs runtime.)
// 2. TypeScript is something which compiles down to the JavaScript. 
// 3. When TypeScript is compiled down to JavaScript, you get type Checking (similar to C++). If there comes an error,
// the conversion to javascript fails.


// ------------------------------------------------------------------------
// Installtion :
// npm install -g typescript

// mkdir node-app (node-app is just for example)
// cd node-app
// npm init -y
// npx tsc --init

// create any .ts file inside that folder, 
// and in terminal(inside node-app), run: tsc -b
// you'll get a js file, run that.



// ---------- Basics with Code --------

// 1. agruments of functions needs to have type defined types.
function greet(first_name: string, age: number){
    console.log("Hello", first_name, "Your age", age);
}


// 2. you can expliditly give the type of the returned value of each function like this.
function sum(a:number, b:number):number{
    return a+b
}


// 3. the compiler is smart enough, that even here it knows that the type of 'value' will be boolean, because the func 
// isLegal returns only boolean values, so in this case we can skip to define type, as the compiler understands that. 

function isLegal(age:number){
    if(age>18){
        return true
    }else{
        return false
    }
}
let value = isLegal(19)


// 4 - During Callback function:

// 4.1 - Need to give the type of value the callback func will return. 
function runAfter1s(fn:()=>void){
    setTimeout(fn, 1000);
}

runAfter1s(()=>{
    console.log("nothing")
})


// 4.2 - Need to give the type of Argument the Callback func takes.
function runAfter2s(fn: (arg: string) => void, arg: string) {
    setTimeout(() => fn(arg), 1000);
}

function printhere(message: string) {
    console.log(message);
}

runAfter2s(printhere, "vishnu");



// ----------------- About tsconfig.json file --------------------------

// 1. target - here, we can change the type of ECMAscript standard, like versions of ECMA. i.e es2016, es5

// To organise our codebase well, we can separate our source code in one folder, with the tranformed code by tsc to another.
// 2. rootDir - we can create a folder named 'src', and give the path to rootDir,
// 2. outDir - we can create a folder named 'dist' or 'build', and give the path to outDir,
// now, all the transformed code will come to dist folder, and we can only care for src folder.

// 4. noImplicitAny : keep it false, if you're beginner in Ts, compilier won't give error if you forget to give type.
// 4. removeComments : keep it true, as in generated js files, it will not contain the comments of ts files.


