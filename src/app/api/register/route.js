export async function GET(req, res) {


    // Make a note we are on
  
    // the api. This goes to the console.
  
    console.log("in the api page")
  
  
  
    // get the values
  
    // that were sent across to us.
  
    const { searchParams } = new URL(req.url)
  
    const email = searchParams.get('email')
  
    const pass = searchParams.get('pass')
  
  
    console.log(email);
  
    console.log(pass);
  
  
  
   // =================================================
  
    const { MongoClient } = require('mongodb');
  
  
    const URI = 'mongodb+srv://Adeife:olIIfuj4aLEjYytI@krispy-kreme.rhrln.mongodb.net/?retryWrites=true&w=majority&appName=Krispy-kreme';
  
    const client = new MongoClient(url);
  
   
  
   
  
    const dbName = 'Krispy'; // database name
  
  
    await client.connect();
  
    console.log('Connected successfully to server');
  
    const db = client.db(dbName);
  
    const collection = db.collection('user'); // collection name
  
  
  
    const findResult = await collection.insertOne({"username":email})
  

  
  
    
 
  

  
  
  
   //==========================================================
  
  
  
  
    // at the end of the process we need to send something back.
  
    return Response.json({})


}