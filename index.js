const express = require('express');
const app = express();



app.use(require('./routes'))

app.listen(8000, ()=> {
    console.log('Server started on port 8000');
})