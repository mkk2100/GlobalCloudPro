const user_model = require('../model/user_model');

module.exports = {

    async c_UserJoin(req,res){

        const name = req.body.name;
        const age = req.body.age;
        const gender = req.body.gender;
        const id = req.body.id;
        const password = req.body.password;
        let [ result , err_message ] = await user_model.m_UserJoin(name,age,gender,id,password);

        if(result)
            res.render('join-complete', { name: name });
        else 
        {
            // 409 Conflict 리소스의 현재 상태와 충돌해서 해당 요청을 처리할 수 없기때문에
            // 클라이언트에서 충돌을 수정해서 다시 요청을 보내야함.
            res.status(409);
            res.send(err_message);
        }
    },

    async c_UserList(req,res){
        try
        {
            let user_list = await user_model.m_GetUserList();
            res.status(200);
            if(user_list.length != 0)
            {
                res.json(user_list);
                return;
            }
            res.send("데이터가 존재하지 않음");
        }
        catch(e)
        {
            res.status(409);
            res.send("데이터가 존재하지 않음");
        }
    },

    async c_UserLogin(req, res)
    {
        const id = req.body.id;
        const password = req.body.password;
        console.log(id);
        let isUserLeave = false;
        let [result, name] = await user_model.m_UserLogin(id,password,isUserLeave);

        if(result)
            res.render('login-complete', { name: name });
        else 
            res.render('login-fail');
    },

    async c_UserLeave(req, res)
    {
        const id = req.body.id;
        const password = req.body.password;
        let isUserLeave = true;
        let [result, name] = await user_model.m_UserLogin(id,password,isUserLeave);
        if(result)
            res.render('leave-complete', { name: name });
        else 
            res.render('login-fail');
    }    
}





