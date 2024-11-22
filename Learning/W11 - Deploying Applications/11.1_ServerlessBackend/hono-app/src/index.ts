import { Hono } from 'hono'

const app = new Hono()


function authMiddleware(c:any, next:any){
  if(c.req.header("Authorization")){
    //do the checks
    next()
  }else{
    return c.text("YOU dont have access")
  }
}

app.post('/', authMiddleware, async(c)=>{
  const body = await c.req.json();
  console.log(body);
  console.log(c.req.header("Authorization"));
  console.log(c.req.query("param"));


  return c.text("Hello Hono!")
})


export default app
