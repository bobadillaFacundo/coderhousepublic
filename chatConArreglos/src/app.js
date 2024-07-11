import express from "express"
import engine from "express-handlebars"
import __dirname from "./utils.js"
import viewsrouter from "./routers/views.router.js"
import { Server } from "socket.io"

const app = express()
//'0134.0.253.47',
const httpserver = app.listen(8080, () => console.log("servidor escuchando en el puerto 8080"))
const socketserver = new Server(httpserver)
app.engine("handlebars", engine.engine())
app.set("view engine", "handlebars")
app.set("views", __dirname + "/views")
app.use(express.static(__dirname + "/public"))
app.use("/api", viewsrouter)
app.use('/css', express.static('public/css'));

const messages = []
let users = []

socketserver.on('connection', socket => {

    socket.on('identificarse', user => {

        users.push({
            id: socket.id,
            user
        })

        socketserver.emit('entrada', () => {
            console.log(`Nuevo cliente conectado ${socket.id}`)
            const user = users.find(id => id.id === socket.id)
            messages.push({
                id: user.user,
                data: 'me conecte'
            })
            socketserver.emit('mensaje_servidor_todos', messages)
        })

        socket.on('message', (data => {
            
            const user = users.find(id => id.id === socket.id)
            messages.push({
                id: user.user,
                data
            })



            socketserver.emit('mensaje_servidor_todos', messages)
        }))

        socket.on('disconnect', () => {
            console.log(`Cliente desconectado: ${socket.id}`);
            const user = users.find(id => id.id === socket.id)
            messages.push({
                id: user.user,
                data: 'me desconecte'
            })
            users = users.filter(id => id.id !== socket.id)
            socketserver.emit('mensaje_servidor_todos', messages)
        })

    })

})




