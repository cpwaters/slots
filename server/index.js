import mongodb from 'mongodb'
import dotenv from 'dotenv'
import app from './server.js'
import RestaurantsDAO from './dao/restaurantsDAO'
dotenv.config()
const MongoClient = mongodb.MongoClient

const port = process.env.PORT || 3002;

MongoClient.connect(
    process.env.REVIEWS_DB_URI, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
)
.catch(err => {
    console.error(err.stack)
    process.exit(1)
})
.then(async client => {
    await RestaurantsDAO.injectDB(client)
    app.listen(port, () => {
        console.log(`Server listening on port: ${port}`);
    });
})

