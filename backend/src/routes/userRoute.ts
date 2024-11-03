import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { signupInput  , signinInput } from "@priyansh0071/medium-blog";

export const userRouter = new Hono<{
    Bindings : {
        DATABASE_URL : string,
        JWT_SECRET : string,
    }
}>

userRouter.post('/signup', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl : c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const body = await c.req.json();
    const { success } = signupInput.safeParse(body);
    if(!success){
      c.status(403);
      return c.json({
        message : "Inputs are not correct"
      })
    }
    try{
      const user = await prisma.user.create({
        data : {
          username : body.username,
          password : body.password
        }
      })
  
      const jwt = await sign({sub : user.id} , c.env.JWT_SECRET)
  
      return c.json({jwt})
  
    }
    catch(e){
      c.status(403);
      return c.json({
        message : "Error while signup"
      })
    }
  })
  
userRouter.post('/signin', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl : c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
    const body = await c.req.json(); //taking object from request 

    const { success } = signinInput.safeParse(body);

    if(!success){
      c.status(403);
      return c.json({
        message : "Please send the correct inputs"
      })
    }
  
    try{
      const user = await prisma.user.findUnique({
        where : {
          username : body.username,
          password : body.password,
        }
      });
    
      if(!user){ //to check if user exist or not
        c.status(403);
        return c.json({
          message : "User does not exist",
        })
      }
  
      const jwt = await sign({sub : user.id} , c.env.JWT_SECRET)
  
      return c.json({jwt})
  
    }catch(e){ //to catch any other kind of error
      c.status(403)
      return c.json({
        message : "Error while signin"
      })
  
    }
  })
