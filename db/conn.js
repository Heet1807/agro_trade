const mongoose = require("mongoose");


mongoose.connect("mongodb+srv://heet:heet123@node.e1eoz.mongodb.net/trade-api",{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false,
}).then(() => {
    console.log("Connection Successful");
}).catch((e) => {
    console.log(e);
    console.log("No Connection");
});
// id & passwrod che ke new create kari dav....new kari de OKa