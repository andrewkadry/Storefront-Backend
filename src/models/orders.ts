//@ts-ignore
import client from '../database'


export type orderProduct = {
quantity: number;
productId: number;
orderId: number;
}

export type order = {
    id : number;
    statusoforder : string;
    user_id : number;
}

export type orderWithProducts = {
    status:string;
    userId : number;
    products : orderProduct[];
}

export class Order{
    

    async showOrder(user_id:number) : Promise <order> {
        try{
            //@ts-ignore
            const conn = await client.connect()
            const sql = 'SELECT * FROM orders WHERE user_id=($1)'
            const result = await conn.query(sql,[user_id])
            conn.release()
            return result.rows[0]
        }catch(err){
            throw new Error(`error while getting order ${err}`)
        }
    }

    async showOrderProducts(id:number) : Promise <orderProduct[]> {
        try{
            //@ts-ignore
            const conn = await client.connect()
            const sql = 'SELECT * FROM order_item WHERE order_id=($1)'
            const result = await conn.query(sql,[id])
            conn.release()
            return result.rows
        }catch(err){
            throw new Error(`error while showing this order ${err}`)
        }
    }

    async create(o: order) : Promise <order> {
        try{
            //@ts-ignore
            const conn = await client.connect()
            const sql = 'INSERT INTO orders (statusoforder,user_id) VALUES ($1,$2) RETURNING *'
            const result = await conn.query(sql,[o.statusoforder,o.user_id])
            conn.release()
            return result.rows[0]
        }catch(err){
            throw new Error(`error while creating this product ${err}`)
        }
    }

    async addProductToOrder(op: orderProduct) : Promise <order> {
        try{
            //@ts-ignore
            const conn = await client.connect()
            const sql = 'INSERT INTO order_item (quantity,product_id,order_id) VALUES ($1,$2,$3) RETURNING *'
            const result = await conn.query(sql,[op.quantity,op.productId,op.orderId])
            conn.release()
            return result.rows[0]
        }catch(err){
            throw new Error(`error while adding this product to the order ${err}`)
        }
    }

    
}