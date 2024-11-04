import React, { useEffect } from 'react';
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance"; 
import { Users } from "../components/Users";
import { useRecoilState, useRecoilValue} from 'recoil';
import axios from 'axios';
import { balanceAtom } from "../store/atoms/balance_atoms";
import { userAtom } from '../store/atoms/users_atoms';

export const Dashboard = () => {
    const [balance, setBalance] = useRecoilState(balanceAtom);
    const user = useRecoilValue(userAtom); 


    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/account/balance', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`, 
                    },
                });

                setBalance(response.data.balance);
            } catch (error) {
                console.error('Error fetching balance:', error);
            }
        };

        fetchBalance();
    }, [setBalance]);

    return (
        <div>
            <Appbar value={user.first_name}/>
            <div className="m-8">
                <Balance value={balance} /> 
                <Users />
            </div>
        </div>
    );
};

