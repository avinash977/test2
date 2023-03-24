import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';


const app = express();
dotenv.config();

const port = process.env.PORT || 5000 ;


app.get('/', (req, res) => {
    res.send(`<h1> 🐰 Welcome to Tech Abhi Job Portal 💓</h1>`);
});

app.listen(port, () => {
    console.log(`Server listening in ${process.env.DEV_MODE} mode on http://localhost:${port}`);
});