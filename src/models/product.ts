//@ts-ignore
import client from '../database'


export type product = {
id:number;
name: string;
price: number;

}

export class Product{
    async index() : Promise <product[]> {
        try{
            //@ts-ignore
            const conn = await client.connect()
            const sql = 'SELECT * FROM product'
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        }catch(err){
            throw new Error(`error while connecting to product table ${err}`)
        }
    }

    async show(id:number) : Promise <product> {
        try{
            //@ts-ignore
            const conn = await client.connect()
            const sql = 'SELECT * FROM product WHERE id=($1)'
            const result = await conn.query(sql,[id])
            conn.release()
            return result.rows[0]
        }catch(err){
            throw new Error(`error while getting this product ${err}`)
        }
    }

    async create(p: product) : Promise <product> {
        try{
            //@ts-ignore
            const conn = await client.connect()
            const sql = 'INSERT INTO product (name,price) VALUES ($1,$2) RETURNING *'
            const result = await conn.query(sql,[p.name,p.price])
            conn.release()
            result.rows[0].price = Number(result.rows[0].price)
            return result.rows[0]
        }catch(err){
            throw new Error(`error while creating this product ${err}`)
        }
    }

    async delete(id:number) : Promise <number> {
        try{
            //@ts-ignore
            const conn = await client.connect()
            const sql = 'DELETE FROM product WHERE id=($1)'
            const result = await conn.query(sql,[id])
            conn.release()
            return id
        }catch(err){
            throw new Error(`error while deleting this product ${err}`)
        }
    }
}