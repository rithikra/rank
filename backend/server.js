//mongodb credentials
//admin
//Chinmay123!

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

const allowedOrigins = [
    'capacitor://localhost',
    'ionic://localhost',
    'https://localhost',
    'https://localhost:4000',
    'https://localhost:3000'
  ];

const corsOptions = {
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Origin not allowed by CORS'));
      }
    }
}
  
  // Enable preflight requests for all routes
app.options('*', cors(corsOptions));
  

require('./models/Company');

app.get('/', cors(corsOptions), (req, res, next) => {
    res.json({ message: 'This route is CORS-enabled for an allowed origin.' });
  })

app.use(require('./routes'));

mongoose.connect('mongodb+srv://admin:Chinmay123!@cluster0.9zhva.mongodb.net/rank_db?retryWrites=true&w=majority', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});




