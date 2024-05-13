const { Socket } = require("socket.io");
const userController = require("../controller/userController")

//.emit() 말하는 함수, .on() 듣는 함수
module.exports = function(io){ //io 관련 함수
    // 듣는 함수
    io.on("connection", async (socket) => {
        console.log("client is connect", socket.id);

        socket.on("login", async(userName, cb) => {
            //유저정보를 저장
            try{
                const user = await userController.saveUser(userName, socket.id);
                cb({ok:true, data:user});
            }catch(error){
                cb({ok: false, error: error.messge});
            }
        });

        socket.on("sendMessage", async (messge,cb) => {
            try{
                //유저 찾기 socket.id로
                const user = userController.checkUser(socket.id);
                //메세지 저장(유저)
                const newMessage = await chatController.saveChat(message,user);
                io.emit("message", newMessage)
                cb({ok:true})
            } catch(error) {
                cb({ok:false, error: error.message});
            }
        });

        socket.on("disconnect", () => {
            console.log("user is disconnect");
        });
    });
};