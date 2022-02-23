import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import product_routes from './handlers/product'
import users_routes from './handlers/users'
import orders_routes from './handlers/orders'


const corsOptions = {
    origin : 'http://localhost/3000',
    optionSuccessStatus:200
}
const app: express.Application = express()
const address: string = "0.0.0.0:3000"
app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
//app.use(bodyParser.raw())


app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

//app.use('/api',routes)
product_routes(app)
users_routes(app)
orders_routes(app)


app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})

export default app