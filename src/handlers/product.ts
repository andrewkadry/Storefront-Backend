import express, {Request, Response} from 'express'
import {product,Product} from '../models/product'
import jwt from 'jsonwebtoken'


const prod = new Product()

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
        const prods = await prod.index()
        res.json(prods)
    }catch{
        res.status(400)
        res.json('sorry cant get products')
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
        const prods1 = await prod.show(Number(req.params.id as string))
        res.json(prods1)
    }catch{
        res.status(400)
        res.json('sorry cant get product with this id')
    }
    
}


const create = async (req: Request, res: Response) => {
    try {
        const authorizationHeader = req.headers.authorization as string
        const token = authorizationHeader.split(' ')[1]
        jwt.verify(token,process.env.TOKEN_SECRET as string)
    } catch(err) {
        res.status(401)
        res.json('Access denied, invalid token')
        return
    }

    try {
        const p: product = {
            id:0,
            price : Number(req.body.price as string),
            name : req.body.name
        }
        const newProd = await prod.create(p)
        res.json(newProd)
    } catch(err) {
        res.status(400)
        res.json(`${err}`)
    }
}


const product_routes = (app :express.Application)=>{
    app.get('/products' , index)
    app.get('/products/:id', show) 
    app.post('/products/create', create)       
      
}

export default product_routes