const { text } = require('express');

const fs = require('fs').promises;

class userInfo{
    name;
    age;
    gender;
    id;
    password;

    constructor(name,age,gender,id,password ){
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.id = id;
        this.password = password;
    }
};

module.exports ={
    async m_UserJoin (name,age,gender,id,password){
        
        let user_info  = new userInfo(name,age,gender,id,password);

        try {
            // 유저 리스트 txt 파일이 있을때는 기존에 기록된 유저 정보를 읽어온다.
            let data = await fs.readFile('user_list.txt');
            // 유저 리스트 txt 파일을 배열로 변환
            let text_user_list = JSON.parse(data);
            let overlap_id = false;
            /**
             * 이곳에서 회원가입 중복 체크
             * 아이디가 중복 된다면 overlap_id 값을 true로 변경
             */

            for(let i = 0; i < text_user_list.length; i++)
            {
                if(user_info.id == text_user_list[i].id) 
                {
                    overlap_id = true;
                    break;
                }
            }
            
            if(overlap_id) {
                return [false , "아이디가 중복됩니다."];
            }
            
            text_user_list.push(user_info);
            fs.writeFile('user_list.txt',  JSON.stringify( text_user_list , null,2 ));
            return [true , null];            

        } catch (e) {

            // 유저 리스트 텍스트 파일이 없어서 읽을수 없을경우 catch 로 들어옴
            // 빈 유저 리스트 배열 생성
            var user_list = [];
            // 유저 정보 추가
            user_list.push(user_info);
            // user_list 배열을 텍스트 형태로 변환해서 user_list.txt 파일에 저장
            fs.writeFile('user_list.txt', JSON.stringify(user_list, null, 2));
        }
        
        return [true , null];
    },

    async m_UserLogin(id,password,isUserLeave)
    {
        let data = await fs.readFile('user_list.txt');
        let text_user_list = JSON.parse(data);

        for(let i = 0; i < text_user_list.length; i++)
        {
            if(text_user_list[i].id != id|| text_user_list[i].password != password) continue;
            else 
            {
                if(!isUserLeave) return [true, text_user_list[i].name];
                let name = text_user_list[i].name;
                // Delete
                var user_newList = [];
                for(let j = 0; j < text_user_list.length; j++)
                {
                    if(i == j) continue;
                    user_newList.push(text_user_list[j]);
                    console.log(user_newList[j]);
                }
                fs.writeFile('user_list.txt', JSON.stringify(user_newList, null, 2));                
                return [true, name];
            }
        }
        return [false, null];
    
    },

    async m_GetUserList(){
        let user_list = JSON.parse(await fs.readFile('user_list.txt'));
        return user_list;
    }
}

