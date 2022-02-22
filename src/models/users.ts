//@ts-ignore
import client from '../database'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
dotenv.config()

const {BCRYPT_PASSWORD,
       HASH_ROUND} = process.env 

export type user = {
id: number
username: string;
firstname: string;
lastname: string;
password: string;
}

export class User{
    async index() : Promise <user[]> {
        try{
            //@ts-ignore
            const conn = await client.connect()
            const sql = 'SELECT * FROM users'
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        }catch(err){
            throw new Error(`error while connecting to users table ${err}`)
        }
    }

    async show(id:number) : Promise <user> {
        try{
            //@ts-ignore
            const conn = await client.connect()
            const sql = 'SELECT * FROM users WHERE id=($1)'
            const result = await conn.query(sql,[id])
            conn.release()
            return result.rows[0]
        }catch(err){
            throw new Error(`error while getting this user ${err}`)
        }
    }

    async create(u: user) : Promise <user> {
        try{
            //@ts-ignore
            const conn = await client.connect()
            const sql = 'INSERT INTO users (username,firstname,lastname,password) VALUES ($1,$2,$3,$4) RETURNING *'
            const hash = bcrypt.hashSync(
                u.password + BCRYPT_PASSWORD, 
                parseInt(HASH_ROUND as string)
             )
            const result = await conn.query(sql,[u.username,u.firstname,u.lastname,hash])
            conn.release()
            return result.rows[0]
        }catch(err){
            throw new Error(` ${err}`)
            
        }
    }

    async authenticate(username: string, password: string): Promise<user | null> {
        //@ts-ignore
        const conn = await client.connect()
        const sql = 'SELECT * FROM users WHERE username=($1)'
    
        const result = await conn.query(sql, [username])
    
    
        if(result.rows.length) {
          const user : user= result.rows[0]
          if (bcrypt.compareSync(password+BCRYPT_PASSWORD, user.password)) {
            return user
          }
        }
        return null
      }

    async delete(id:number) : Promise <user> {
        try{
            //@ts-ignore
            const conn = await client.connect()
            const sql = 'DELETE FROM users WHERE id=($1)'
            const result = await conn.query(sql,[id])
            conn.release()
            return result.rows[0]
        }catch(err){
            throw new Error(`error while deleting this user ${err}`)
        }
    }
}