const {createServer} = require("http");
const app = require("./app");
const {Server} = require("socket.io");
require("dotenv").config();

const httpServer = createServer(app);

const io = new Server(httpServer,{
    cors:{
        origin: "http://localhost:5173",
    },
});

require("./utils/io")(io); //io.js에 io매개변수를 보냄

httpServer.listen(process.env.PORT,() => {
    console.log("server listening on port", process.env.PORT);
});
