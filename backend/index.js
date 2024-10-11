const express = require('express'); // Corrected this line
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 5000;
const app = express();
const userRoute=require('./routes/userRoute')
const bookRoute=require('./routes/bookRoute')
const path=require('path')
const cartRoute=require('./routes/cartRoute')
const orderRoute=require('./routes/orderRoute')

mongoose.connect('mongodb://localhost:27017/bookStore')
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log("Failed to connect to MongoDB:", err);
    });

    app.use(cors({
        origin: 'http://localhost:3000', // Your React app's URL
        credentials: true // Allow credentials (cookies, authorization headers, etc.)
    }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/user',userRoute)
app.use('/api/book',bookRoute)
app.use('/api/cart',cartRoute)
app.use('/api/orders',orderRoute)

app.get('/',(req,res)=>{
    res.send("Hello World");
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
