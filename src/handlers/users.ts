import express, {Request, Response} from 'express'
import {user,User} from '../models/users'
import jwt from 'jsonwebtoken'
import jwtDecode from 'jwt-decode'

const userI = new User()


const index = async (req: Request, res : Response)=>{
    try {
        const authorizationHeader = req.headers.authorization as string
        const token = authorizationHeader.split(' ')[1]
        jwt.verify(token,process.env.TOKEN_SECRET as string)
    } catch(err) {
        res.status(401)
        res.json('Access denied, invalid token')
        return
    }
    try{
        const users = await userI.index()
        res.json(users)
    }catch{
        res.status(400)
        res.json('sorry cant get users')
    }
}

const show = async (req: Request, res : Response)=>{
    try {
        const authorizationHeader = req.headers.authorization as string
        const token = authorizationHeader.split(' ')[1]
        jwt.verify(token,process.env.TOKEN_SECRET as string)
    } catch(err) {
        res.status(401)
        res.json('Access denied, invalid token')
        return
    }
    try{
        const users = await userI.show(Number(req.params.id as string))
        res.json(users)
    }catch{
        res.status(400)
        res.json('sorry cant get user with this id')
    }
}

const signup = async (req: Request, res : Response)=>{
    try{
        const newUser : user = {
            id : 0,
            username : req.body.username as string,
            firstname : req.body.firstname as string,
            lastname : req.body.lastname as string,
            password: req.body.password as string
        }
    
        const result = await userI.create(newUser)
        var token = jwt.sign({'username' : result.username , 'id' : result.id}, process.env.TOKEN_SECRET as string);
        res.json({"token" : token})
    }catch(err){
        res.status(400)
        res.json(`${err}`)
    }
   
}

const signin = async (req: Request, res : Response)=>{
    const usern : string = req.body.username as string
    const pass : string = req.body.password as string
    const result : user | null  = await userI.authenticate(usern,pass)
    if(result){
        var token = jwt.sign({"username" : result.username , "id" : result.id}, process.env.TOKEN_SECRET as string);    
           res.json({"token" : token})
    }else{
        res.json("user not found")
        res.status(404)
    }
}

const users_routes = (app :express.Application)=>{
    app.get('/users/:id', show)
    app.get('/users' , index)
    app.post('/users/signup/' , signup) 
    app.post('/users/signin/' , signin) 

}

export default users_routes