import Fastify from "fastify";
import { clerkPlugin, getAuth } from '@clerk/fastify'

const fastify = Fastify();

fastify.register(clerkPlugin)

fastify.get("/",(request,reply) => {
    return reply.send("Order endpoint works");
})

fastify.get("/test",(request,reply) => {
    const {userId} = getAuth(request);

    if(!userId)
    {
        return reply.send({message: "You are not Authenticated yet!!!"});
    }
    else
    {
        return reply.send({message: "Order Service Authenticated!!!"});
 
    }
    
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