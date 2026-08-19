import express, {Request,Response} from "express";
import cors from "cors";
import { clerkMiddleware, getAuth } from '@clerk/express'

const app = express();
app.use(cors({
    origin: ["http://localhost:3002", "http://localhost:3003"],
    credentials: true,

}))

app.use(clerkMiddleware())

app.get("/",(req: Request,res: Response) => {
    res.json("Product endpoint is working fine");
})

app.get("/test",(req:Request,res: Response) => {
    
    const auth = getAuth(req);
    console.log(auth);

    if(!auth.userId)
    {
        return res.json({message:'You are not authenticated'})
    }
    else
    {
        return res.json({message: "Product service authenticated"});
    }
})

app.listen(8000, () => {
    console.log("Product service is running on port 8000");
})