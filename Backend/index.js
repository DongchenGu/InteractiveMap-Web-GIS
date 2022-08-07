import express from 'express';
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from 'cors';


const app = express();

app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

// import postRoutes from './routes/posts.js';
// import userRoutes from './routes/users.js';
// app.use('/posts', postRoutes);
// app.use('/users', userRoutes);

app.get('/', (req, res)=>{
    console.log("App is running...");
})

const CONNECTION_URL = process.env.CONNECTION_URL || 'mongodb+srv://admin:passwordADMIN@cluster0.xtzyw.mongodb.net/interactiveMap?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5004;

mongoose.connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    app.listen(PORT, ()=>{
        console.log(`Server running on port ${PORT}`);
    })
}).catch(err=>{
    console.log(err.message);
});






