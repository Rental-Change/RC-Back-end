const User = require('../Models/User');
const userController = {}

userController.saveUser = async(userName,sid) =>{
    //이미 있는 유저 확인
    let user = await User.findOne({ user_Name: userName});
    //없다면 새로 만들기
    if(!user){
        user = new User({
            user_Name: userName,
            token: sid
        });
    }
    //이미 있는 유저라면 연결정보 token값만 바꾸기
    user.token = sid

    await user.save()
    return user;
}

module.exports = userController