const {createServer} = require("http");
const app = require("./app");
const {Server} = require("socket.io");
require("dotenv").config();
const loginRouter = require("./routers/loginRouter")
const signupRouter = require("./routers/signupRouter")
const postsRouter = require('./routers/postsRouter')
const viewRouter = require('./routers/listViewRouter')
const httpServer = createServer(app);

const io = new Server(httpServer,{
    cors:{
        origin: "http://localhost:5173",
    },
});
// 회원가입
app.use('/signup', signupRouter);
// 로그인
app.use('/signin', loginRouter);
// my_page 리스트
app.use('/my_page', viewRouter);
// 매장 등록
app.use('/', postsRouter);


require("./utils/io")(io); //io.js에 io매개변수를 보냄

httpServer.listen(process.env.PORT,() => {
    console.log("server listening on port", process.env.PORT);
});


