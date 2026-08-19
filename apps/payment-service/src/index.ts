import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
// import process from "process";

const app = new Hono();

app.use('*', clerkMiddleware())
app.get("/", (c) => {
  return c.text("Payment endpoint works!!");
});

app.get("/test", (c) => {
    const auth = getAuth(c);
    
    if(!auth.userId)
    {
      return c.json({
      message: 'You are not logged in.',
      })
    }

    return c.json({
    message: 'Payment Service Authenticated'
  })
})

const start = async () => {
  try {
    serve(
      {
        fetch: app.fetch,
        port: 8002,
      },
      (info) => {
        console.log(`Payment service is running on port 8002`);
      },
    );
  } catch (error) {
    console.log(error);
    // process.exit(1);
  }
};

start();
