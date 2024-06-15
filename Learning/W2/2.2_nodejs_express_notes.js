// Learning about Express, Nodejs



// NOTES


// ---- nodejs and its runtime ------

// ECMAScript (ES) : like it is the rulebook that ensures JavaScript works the same way in various web browsers. (doesn't allow DOM(document object model))

// Javascript (JS) : simply programming language.  It runs on browser engines(engine means compiler here of js), Chrome engine name is V-8. 
// Firefox name is spider-monkey.


// Story behind nodejs. - Javascript was meant to be written for browser engines, not for backend. but some smart people added function like DOM and etc for backend language, then it needed a compiler for it, known as runtime as well. which is node.js . 

// Node.js : An open-source, cross-platform JavaScript runtime environment. It allows developers to use JavaScript to write server-side applications and tools, not just for web browsers.
// Runtime Environment : A software environment that provides the necessary resources and tools to execute a program. It's where your code comes to life.

//Bun : A relatively new, experimental JavaScript runtime environment designed for speed and developer experience. It aims to be faster than Node.js while offering similar functionality.  It is wriiten in zig.



// ------- Main focus will be on Nodejs here for learning ------

// What can be done with nodejs
// backend things, create clis (commandline interface), videoplayer, game.. and HTTP SERVER.








// -- HTTP server --

    // HTTP - HyperText Transfer Protocol (protocol means rules for machines)

    // HTTP lets frontend and backend comminuate, but only if it follows protocols which is in most of the cases are HTTProtocols.
    // protocol includes authentication. 



    // Before that, understand the part of below line. 
    // "https://www.chat.com/conversation/history"
    // https:// is a protocol
    // www.chat.com  - it is url
    // whatever after the url comes is known as Route. i.e conversation/history here.

    // When a client sends request via HTTP protocol, they need to take care below things.
    // Protocol(HTTP, HTTPS), 
    // Address ( url, ip, port)
    // Route
    // Headers, body, queryParams
    // Method

    // Methods- POST, GET, PUT , DELETE

    // When a server responds to client. it needs to take care below things.
    // Response Headers, Body
    // Status Code

    // Status Codes - 200 (sucess), 404(page/route not found), 403(Authentication error), 500(internal server error)



// IMP - Q - WHAT happens at your Browser when we hit enter on google.com 

    // Browser firslty parse the URL.
    // Does a DNS Lookup (Converts google.com to an IP)
    // Establishes an connection to the IP (does handshakes ... )


    // What is DNS (Domain Name Service ) resolution :  URls are like contacts in your phone, in the end, they map on an IP, If you ever buy a url on your own, you will need to point to the IP of your server. 

// Q - What Happens at your server when a request is received. 

    // You'll get the inputs, (Route, body, headers)
    // Do things with inputs, return output, 
    // You return the output body, headers, and Status Code. 





// Creating HTTP Server - 
// The most famous library which provides functionally here to help with creating HTTP Server is EXPRESS.
// but we can write all this all by own too, prefer C/C++ to code for scratch. 

// See the "nodejs_express_usage "folder, which has HTTP Basic code. 