import express, {Request, Response} from 'express'
import {product,Product} from '../../models/product'
const product_routes = express.Router()

const prod = new Product()

const index = async (req: Request, res : Response)=>{
    console.log(req.query.id,'helloooo index api')
    const prods = await prod.index()
    res.json(prods)
}

const show = async (req: Request, res : Response)=>{
    console.log(req.params.id,'helloooo show api')
    const prods1 = await prod.show(Number(req.params.id as string))
    res.json(prods1)
}

product_routes.get('/', index)       
product_routes.get('/:id' , show)

export default product_routes