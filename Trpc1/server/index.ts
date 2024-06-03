import { publicProcedure, router } from './trpc';
import {z} from "zod";
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { Context } from 'hono';

const TodoInputType = z.object({
    title : z.string(),
    description : z.string()
})
 
const appRouter = router({
  // ...

  SignUp : publicProcedure.input(z.object({
    email : z.string(),
    password : z.string()
  })).mutation(
    async (opts) => {
        //context
        const username = opts.ctx.username;
        console.log(username)
        let email = opts.input.email;
        let password = opts.input.password;

        let token = "1241354254";
        return {
            token
        }
    }
  ),

///////////////////////////////////////////////////


  createTodo : publicProcedure.input(z.object({title : z.string()})).mutation(async (opts) => {
   
    console.log(opts.ctx.username)
    /// Do database call or put helpers

    return {
        id : "1",
    }
  }),
});
 

const server = createHTTPServer({
    router: appRouter,
    createContext(opts){
        let authHeader = opts.req.headers["authorization"]; 
        console.log(authHeader)
        return {
            username: "kris"
        }
    }
  });
   
  server.listen(3000);

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;