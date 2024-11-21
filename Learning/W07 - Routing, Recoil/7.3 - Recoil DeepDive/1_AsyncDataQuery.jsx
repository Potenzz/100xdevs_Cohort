// Things wriiten about here are:
// Asynchronous Data Queries
// Atom Family
// Selectors Family
// useRecoilStateLoadable
// useRecoilValueLoadable


// Asynchronous Data Queries - Asynchronous data queries allow fetching data from external sources (e.g., APIs) 
// without blocking the main thread, enabling other operations to run simultaneously while waiting for the response.

// In Recoil, asynchronous data queries are handled using selectors with async functions. These selectors fetch data 
// (e.g., from APIs) on-demand, caching the results and updating the state automatically when the data resolves, 
// ensuring a reactive UI without blocking the app.


// Its usage :
// in atoms.jsx file:

import { atom, selector } from "recoil";

export const notifications = atom({
    key: "networkAtom",
    default: selector({
        key:"networkAtomSelctor",
        get : async() => {
           const res = await axios.get("https://sum-server.100xdevs.com/notifications");
           return res.data;
            
        //  The res.data has structure like this : { "network" : 102, "jobs":0, "notifications":12, "messaging":0}
        // This value now will act as a default values.
        }
    })
});

export const totalNotificationSelector = selector({
    key: "totalNotificationSelector",
    get: ({get}) => {
        const allNotifications = get(notifications);
        return allNotifications.network + 
        allNotifications.jobs + 
        allNotifications.notifications + 
        allNotifications.messaging
    }
})


// in App.jsx


function App() {
    return <RecoilRoot>
      <MainApp />
    </RecoilRoot>
  }
  
  function MainApp() {
    const [networkCount] = useRecoilValue(notifications)
    const totalNotificationCount = useRecoilValue(totalNotificationSelector);
  
    return (
      <>
        <button>Home</button>
        
        <button>My network ({networkCount.networks >= 100 ? "99+" : networkCount.networks})</button>
        <button>Jobs {networkCount.jobs}</button>
        <button>Messaging ({networkCount.messaging})</button>
        <button>Notifications ({networkCount.notifications})</button>
  
        <button>Me ({totalNotificationCount})</button>
      </>
    )
  }


