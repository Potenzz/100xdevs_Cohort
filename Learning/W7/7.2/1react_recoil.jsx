
// The ContextAPI main focus is on to get rid of propdrilling, not to make re-rendering more efficient. 
// Instead, the ContextAPI re-renders those component as well, which does not use contextAPI variable, 
// Hence, use ContextAPI accordingly to it. 


// Recoil -  It is a state management library for React that enables efficient, flexible state sharing among 
// components using atoms (units of state) and selectors (derived state). It simplifies state management by 
// integrating seamlessly with React’s hooks, promoting fine-grained updates without unnecessary re-renders.


// usecase:

// Create folder named store, then atoms, then file-name.jsx --- Conventional way, else just create file-name.jsx
// in count.jsx file:

import { atom } from "recoil";

export const countAtom = atom({
    key:"countAtom",
    default:0
});



