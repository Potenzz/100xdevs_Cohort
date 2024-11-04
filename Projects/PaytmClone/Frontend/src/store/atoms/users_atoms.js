import { atom } from 'recoil';


export const usernameAtom = atom({
    key: 'username', 
    default: '',   
  });
  
  export const passwordAtom = atom({
    key: 'password',
    default: '',
  });


export const firstNameAtom = atom({
    key: 'first_name',
    default: '',
});

export const lastNameAtom = atom({
    key: 'last_name',
    default: '',
});


export const userAtom = atom({
    key: 'user',
    default: {
        first_name: '',
        last_name: '',
        username: '',
    },
});
