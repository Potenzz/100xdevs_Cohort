import { useEffect, useState } from "react"
import { Button } from "./Button"
import axios from "axios";
import { useNavigate } from "react-router-dom";


export const Users = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");
    const [debouncedFilter, setDebouncedFilter] = useState(filter); 
    const [isTyping, setIsTyping] = useState(false); 


    // Debounce logic
    useEffect(() => {
        const debounceTimeout = setTimeout(() => {
        setDebouncedFilter(filter);  
        }, 1000); 

        return () => {
        clearTimeout(debounceTimeout); // Clear the previous timeout on each filter change
        };
    }, [filter]);

     // Fetch users when the debounced filter changes
    useEffect(() => {
        
        axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + debouncedFilter)
            .then(response => {
            setUsers(response.data.user);
            })
            .catch((error) => {
            console.error("Error fetching users:", error);
            });
        
        }
    , [debouncedFilter]); // Runs when the debouncedFilter value changes



    return (
        <>
          <div className="font-bold mt-6 text-lg">Users</div>
          <div className="my-2">
            <input
              onChange={(e) => {
                setFilter(e.target.value);  // Update the filter as the user types
                setIsTyping(true);
              }}
              value={filter}
              type="text"
              placeholder="Search users..."
              className="w-full px-2 py-1 border rounded border-slate-200"
            />
            {isTyping && <div>Searching...</div>}  
          </div>
          
          <div>
            {users.map(user => <User key={user._id} user={user} />)}
          </div>
        </>
      );
}



function User({user}) {
    const navigate = useNavigate();

    return <div className="flex justify-between">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user && user.first_name ? user.first_name.charAt(0).toUpperCase() : ''}
                </div>
            </div>
            <div className="flex flex-col justify-center h-ful">
                <div>
                    {user.first_name} {user.last_name}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-ful">
            <Button onClick={(e) => {
                navigate("/send?id=" + user._id + "&name=" + user.first_name);
            }} label={"Send Money"} />
        </div>
    </div>
}