const {ObjectId} = require('mongodb');

const helper = require('../helper/auth.helper');

const service = {
    async findUser(req,res) {
        try{ 
            const email = req.body.email;
            const password = req.body.password;
            console.log(email,password)

            // checking if the email exists, if exists then check the password...
            let response = await helper.findUserByEmail(email);
            console.log(response)
            if(response === null){
                    res.status(200).send( "Email doesnt exists");
            }else{
                console.log(response.password == password)
                // res.status(200).json({status :"User exists",'email':email});
                if(response.password == password){
                    res.status(200).json({"UserExists":email});           
                }else{
                    res.status(200).json({status:"password is incorrect",email});
                } 
            }
        }
        catch(err){
            console.log("Error in retrieving the user data::",err);
            res.status(500).send("Error in retrieving the user data");
        }
    },

    async validateUser(req,res){
        try{
            const email = req.body.email;
            const password = req.body.password;

            // checking if the email exists, if exists then check the password...
            let response = await helper.findUserByEmail(email);
            if(response === null){
                    res.status(200).send( "Email doesnt exists");
            }else{

                // if the password is correct then send object id or send an error message...
                if(response.password == password){
                    const data = response.data;
                    const {_id} = {...data};
                    const id = (ObjectId(_id).toString())
                    res.status(200).json({status :"password correct",id});           
                }else{
                    res.status(200).send("password is incorrect");
                }
            }
        }
        catch(err){
            console.log(err);
        }  
    },
    async createUser(req,res) {
        try{
            const  {email,password} = req.body
            const response = await helper.create(email,password);
            console.log("user created::", response);
            res.send("user created")
        }catch(err){
            res.status(500).send("Error in creating the user");
            console.log("Error in creating the user::", err);
        }
    }
}

module.exports = service;