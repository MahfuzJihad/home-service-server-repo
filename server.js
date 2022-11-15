const express = require("express");
const cors = require("cors");
const dbo = require("./db/conn");
const { ObjectId } = require("mongodb");
const PORT = process.env.PORT || 8000;
const app = express();

//midlware
app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.status(200).json({ message: 'Hello from api' });
})

app.get('/services/:limit', async (req, res) => {
  const limit = parseInt(req.params.limit);
  const dbConnect = dbo.getDb();
  dbConnect
    .collection('service')
    .find({})
    .limit(limit)
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send('Error fetching listings!');
      } else {
        res.json(result);
      }
    });
})

app.get('/service/:id', async (req, res) => {
  const data = {_id: ObjectId(req.params.id)};
  const dbConnect = dbo.getDb();
  dbConnect
    .collection('service')
    .findOne({ _id : ObjectId(req.params.id) }, function(err, service) {
      if(err){
        res.status(400).send('Error fetching listings!');
      }else{
        res.json(service);
      }
    });
})

app.post('/service/:id', async(req, res)=> {
  const review = req.body;
  console.log(service);
  res.json(service);
  const dbConnect = dbo.getDb();
  dbConnect
  .collection('service')
  .insertOne(service), function(err, result){

  };
})

app.post('/review', async (req, res) => {
  const review = req.body;
  console.log(review);
  res.json(review);
  const dbConnect = dbo.getDb();
  dbConnect
    .collection('review')
    .insertOne(review), function(err, result ){
      if(err){
        res.status(400).send('Error to posting review');
      }else{
        res.status(201).json(result);
      }
    };
});



app.get('/reviews/:id', async (req, res) => {
  const id = req.params.id;
  const dbConnect = dbo.getDb();
  dbConnect
    .collection('review')
    .find({serviceId: id})
    .limit(5)
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send('Error fetching listings!');
      } else {
        res.json(result);
      }
    });
});

app.get('/reviews', async (req, res) =>{
  let query = {};
  if (req.query.email){
    query ={
    email: req.query.email
    };
   
  }
  const cursor = req.params.id;
  const dbConnect = dbo.getDb();
 
})





// perform a database connection when the server starts
dbo.connectToServer(function (err) {
  if (err) {
    console.error(err);
    process.exit();
  }

  // start the Express server
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
});
