// Interfaces,


// ---------------- InterFaces -----------------

// without interfaces :

function isLegal2(user : {
    first_name : string,
    age : number,
}) {
    if (user.age>18){
        return true
    }else{
        return false
    }
}

function greet2(user: {
    first_name : string, 
    age : number, 
}) {
    console.log("hello ", user.first_name)
}

greet2({
    first_name : "Visnu",
    age : 19
})


// with InterFaces, 

interface User {
    first_name : string, 
    age : number,
    email? : string, // this is now optional field, compiler wont' give error over this, if it is given or not.
}

function isLegal3(user : User) {
    if (user.age>18){
        return true
    }else{
        return false
    }
}

function greet3(user: User) {
    console.log("hello ", user.first_name)
}

greet3({
    first_name : "Visnu",
    age : 19
})


// Interfaces usage in React 


// function App() {
//     return <div> <Todo title="First one" description="What nothing" done={true}/> </div>
//   }
  
// interface TodoProps{
// title : string, 
// description : string, 
// done : boolean
// }

// function Todo(props: TodoProps) {
// return <div>
//     <h1>{props.title}</h1>
//     <h2>{props.description}</h2>
// </div>
// }


// Implementing Interfaces in Classes:

interface Person {
    name : string, 
    age : number, 
    greet (phrase: string) : void,
}

// with implementing person, any class using this, will have to have greet function there, name and age there, 
// this is the benifit of implementing interfaces in classes.s
class Employee implements Person {
    name : string; // this needs to be given type as this class object will use them.  both name and age.
    age : number;

    constructor(n:string, a:number){
        this.name = n;
        this.age = a;
    }

    greet(phrase : string){
        console.log(`${phrase} ${this.name}`);
    }
}

const e = new Employee("Vishnu", 10);
e.greet("Hello ")