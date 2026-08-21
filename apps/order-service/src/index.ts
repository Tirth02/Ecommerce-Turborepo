import Fastify from "fastify";
import { clerkPlugin, getAuth } from '@clerk/fastify'
import { shouldBeUser } from "./middleware/authMiddleware.js";

const fastify = Fastify();

fastify.register(clerkPlugin)

fastify.get("/",(request,reply) => {
    return reply.send("Order endpoint works");
})

fastify.get("/test", {preHandler: shouldBeUser}, (request, reply) => {
    return reply.send({message: "Order Service Authenticated!!!",userId: request.userId});
})
const start = async() => {
    try{
        await fastify.listen({ port: 8001 });
        console.log("Order service is running on port 8001");
    }
    catch(err){
        fastify.log.error(err);
        process.exit(1);
    }
}

start()