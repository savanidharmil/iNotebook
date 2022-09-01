const mongoose= require('mongoose');
const mongoURI="mongodb://localhost:27017/inotebook?readPreference=primary&directConnection=true&ssl=false"

const connectToMongo = () =>{
    mongoose.connect(mongoURI, ()=>{
        console.log("Connected DB Successfully..");
    })
}
// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://savanidharmil:jaygopal007@cluster1.7dyasn2.mongodb.net/inotebook?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// const connectToMongo = () =>{
//     client.connect(err => {
//         console.log(err);
//     const collection = client.db("test").collection("devices");
//     // perform actions on the collection object
//     // client.close(); 
//     });
// }

module.exports = connectToMongo;



