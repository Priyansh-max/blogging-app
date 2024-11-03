import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { User } from '@prisma/client/edge';
import { decode, sign, verify } from 'hono/jwt'
import { userRouter } from './routes/userRoute'
import { blogRouter } from './routes/blogRoute'

export const app = new Hono<{
  Bindings: {
    DATABASE_URL : string;
    JWT_SECRET : string;
  }
}>()

app.route('/api/v1/user' , userRouter);
app.route('/api/v1/blog' , blogRouter);

export default app



//aiven.io url 

//direct postgres linkkk



//accelarate url
//connection pool linkk
// DATABASE_URL="prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiYTFkZTc1Y2EtZjIwZC00NzVjLTgzY2MtNTg0ZWRiZjEyNDMzIiwidGVuYW50X2lkIjoiMTI4NWExOTIxYjRlMDlkNjU2MWE4NDA0ZDMxNWExYmMxNzA1MWFhZTUzZjAyODM1YzM5NzM2N2MwNDUxOTA4MyIsImludGVybmFsX3NlY3JldCI6ImZjODFjNzEyLWNmOTMtNDdlZS05NjFhLTU0MTFiNDkxYjNhNiJ9.zjP2-zldwgoMRDNmTnUfe78EnydSDRFlOOlmToJcjC4"
