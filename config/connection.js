const mongoose = require('mongoose')

const DB_Conn = async(DB_URL)=>{
    try {
        const options = {
            dbName: process.env.DB_NAME
        }
        await mongoose.connect(DB_URL,options)
        console.log('Database connected Successfully!')
    } catch (error) {
        console.log('Error connecting database')
    }
}

module.exports = DB_Conn