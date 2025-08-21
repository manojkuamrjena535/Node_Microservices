import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5050;

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))



app.get('/',(req,res)=>{
    return res.json({message:'Its Working'});
});

app.listen(PORT,()=>console.log(`server running on Port ${PORT}`));