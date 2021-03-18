const mongoose = require("mongoose");


mongoose.connect("mongodb://localhost:27017/trade-api",{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false,
}).then(() => {
    console.log("Connection Successful");
}).catch((e) => {
    console.log("No Connection");
});
// id & passwrod che ke new create kari dav....new kari de OKa