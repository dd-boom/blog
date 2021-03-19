const express = require('express');


const app = express();


const middleware = express.static('./');
app.use(middleware); 




app.listen(80,()=>{
    console.log('server is running on port 80');
});