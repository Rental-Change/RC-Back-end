const {createServer} = require("http");
const app = require("./app");
const {Server} = require("socket.io");
require("dotenv").config();


const httpServer = createServer(app);

// http를 사용해 웹 소켓 서버 생성
const io = new Server(httpServer,{
    // 웹 소켓 접근 제어
    cors:{
        origin: "http://localhost:3000",
    },
});

require("./utils/io")(io); //io.js에 io매개변수를 보냄

httpServer.listen(process.env.PORT,() => {
    console.log("server listening on port", process.env.PORT);
});