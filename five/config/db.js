const mongoose = require('mongoose')
const config = require('config')
const db = config.get('mongoURI')

console.log(db);

const connectDB = async () => {
    
    try {
        
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
    
        console.log('\n\n\n **** \n mongoDB connected .... \n **** \n\n\n ')
    } catch (error) {
        console.error(error.message);
        process.exit(1)
    }
}

module.exports = connectDB
;