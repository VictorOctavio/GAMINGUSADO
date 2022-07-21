require('dotenv').config();

const mongoose = require('mongoose');
const app = require('./app');

mongoose.connect(process.env.MONGODB_URI || process.env.MONGODB_URI_LOCAL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log('Connection Success');

    app.listen(app.get('port'), () => {
        console.log(`Server on port: ${app.get(mongoose.connection.name)}`)
    })
})
.catch(err => console.log(err))