import React, { useEffect } from 'react';
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import { useRecoilState } from 'recoil';
import axios from 'axios';
import { balanceAtom } from "../store/atoms/balance_atoms";
import { userAtom } from '../store/atoms/users_atoms';

export const Dashboard = () => {
    const [balance, setBalance] = useRecoilState(balanceAtom);
    const [user, setUser] = useRecoilState(userAtom);
    

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

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/user/me', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [setUser]);

    

    return (
        <div>
            <Appbar value={user && user.first_name ? user.first_name.charAt(0).toUpperCase() : ''} />
            <div className="m-8">
                <Balance value={balance} />
                <Users />
            </div>
        </div>
    );
};

