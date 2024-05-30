//server.js
const {createServer} = require("http");
const app = require("./app");
const {Server} = require("socket.io");
require("dotenv").config();
const loginRouter = require("./routers/loginRouter")
const signupRouter = require("./routers/signupRouter")
const postsRouter = require('./routers/postsRouter')
const viewRouter = require('./routers/listViewRouter')
const likeRouter = require('./routers/likeRouter')
const httpServer = createServer(app);



const PORT = process.env.PORT || 5001;
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
app.use('/', viewRouter);
// 매장 등록
app.use('/posts', postsRouter);

app.use('/likepost', likeRouter )


require("./utils/io")(io); //io.js에 io매개변수를 보냄

httpServer.listen(PORT,() => {
    console.log("server listening on port", PORT);
});


