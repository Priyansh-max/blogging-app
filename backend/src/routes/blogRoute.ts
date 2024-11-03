import { Hono } from "hono"
import { PrismaClient } from "@prisma/client/edge"
import { withAccelerate } from "@prisma/extension-accelerate"
import { decode , verify , sign } from "hono/jwt"
import { blogInput , updateInput } from "@priyansh0071/medium-blog"

export const blogRouter = new Hono<{
    Bindings : {
        DATABASE_URL : string,
        JWT_SECRET : string,
    }
    Variables : {
        userId : string,
    }
}>

blogRouter.use("/*", async (c, next) => {
    console.log("HIIII12RFWQWF");
    const authheader = c.req.header("Authorization") || "";

    try {
        const user = await verify(authheader, c.env.JWT_SECRET);
        console.log("HIIII");

        console.log(user.sub)
        if (user) {
            c.set("userId" , String(user.sub))
            await next();
        } else {
            c.status(403);
            return c.json({
                message: "You are not logged in WQFQWF"
            });
        }
    } catch (error) {
        console.error("Error verifying user:", error);
        c.status(403);
        return c.json({
            message: "You are not logged in"
        });
    }
});

blogRouter.post('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const userid = c.get("userId")
    const sample = c.get("jwtPayload");

    console.log(sample + "hii")

    const body = await c.req.json()
    const { success } = blogInput.safeParse(body);

    if(!success){
        c.status(403);
        return c.json({
            message : "blog inputs are not as per requirements"
        })
    }
    try{
        const blog = await prisma.post.create({
            data : {
                title : body.title,
                content : body.content,
                thumbnail : body.thumbnail,
                authorId : userid,
            }
        })
        return c.json({
            id : blog.id
        })

    }catch(e){
        c.status(403)
        return c.json({
            mmessage : "Error creating blog"
        })
    }
})

blogRouter.put('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const body = await c.req.json();

    const { success } = updateInput.safeParse(body);

    if(!success){
        c.status(403);
        return c.json({
            message : "Update input should be correct"
        })
    }
 
    try{
        const Updatedblog = await prisma.post.update({
            where : {
                id : body.id,
            },
            data : {
                title : body.title,
                content : body.content,
                thumbnail : body.thumbnail,
            }
        })

        return c.json({
            Updatedblog : Updatedblog
        })

    }catch(e){
        c.status(403)
        return c.json({
            message : "Error while updating"
        })
    }
})

//add paginationnn
blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate())

    try{
        const allBlogs = await prisma.post.findMany();
        return c.json({
            blogs : allBlogs,
        })
    }catch(e){
        c.status(403)
        return c.json({
            message : "Error while return data"
        })
    }
})
  
blogRouter.get('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate())
    console.log("hii")
    const id = c.req.param('id')

    try{
        const blog = await prisma.post.findFirst({
            where : {
                id : id
            }
        })
    
        return c.json({
            blog : blog
        })
    
        
    }catch(e){
        c.status(403)
        return c.json({
            message : "Error while getting the blog"
        })
    }
})

//add paginationnn