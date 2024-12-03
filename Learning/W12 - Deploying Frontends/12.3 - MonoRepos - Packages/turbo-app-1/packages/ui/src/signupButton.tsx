export const SignupButton = () => {
    return (<div style={{width:"100vh", justifyContent:"centre", display:"flex"}}>
        <div style={{width:400, border:"2px solid black" }}>
        <input type="text" placeholder="email" />
        <input type="text" placeholder="password"/>
        <button >Submit here</button>
        </div>
    </div>)
}