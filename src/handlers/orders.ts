import express, {Request, Response} from 'express'
import {order,orderProduct,orderWithProducts,Order} from '../models/orders'
import {user} from '../models/users'
import jwtDecode from 'jwt-decode'
import jwt from 'jsonwebtoken'

const ord = new Order()

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
        const authorizationHeader = req.headers.authorization as string
        const token = authorizationHeader.split(' ')[1]
        const decodedToken : user= jwtDecode(token);
        const o: order = {
            id : 1,
            statusoforder : req.body.status,
            user_id : decodedToken.id
        }
        const neword = await ord.create(o)
        res.json(neword)
    } catch(err) {
        res.status(400)
        res.json(`${err}`)
    }
}

const addProductToOrder = async (req: Request, res: Response) => {
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
        const op: orderProduct = {
            productId : Number(req.body.productid ),
            orderId: Number(req.body.orderid ),
            quantity:Number(req.body.quantity )
        }
        const newprodtoord = await ord.addProductToOrder(op)
        res.json(newprodtoord)
    } catch(err) {
        res.status(400)
        res.json(`${err}`)
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
        const order1 = await ord.showOrder(Number(req.params.user_id as string))
        const prods1 = await ord.showOrderProducts(order1.id)
        const oprods : orderWithProducts = {
            status: order1.statusoforder,
            userId :order1.user_id ,
            products : prods1
        }
        res.json(oprods) 
    }catch{
        res.status(400)
        res.json('sorry cant get product with this id')
    }
    
}


const orders_routes = (app :express.Application)=>{
    app.post('/orders/create' , create)
    app.post('/orders/add/' , addProductToOrder)

    app.get('/orders/:user_id',show)  
}

export default orders_routes