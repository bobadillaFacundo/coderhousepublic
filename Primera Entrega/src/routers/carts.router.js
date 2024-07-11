const { Router } = require("express")
const f = require("../filess.js")

const router = Router()
let carts = f.getFromFile("./carts.json")

router.get("/:cid", (req, res) => {
    const cart = carts.find(cart => cart.id === parseInt(req.params.cid))
    if (!cart) {
        return res.status(404).send({ status: "success", error: "id no existe" })
    }
    res.json(cart.products)
})

router.post("/:cid/product/:pid", (req, res) => {
    const cart = carts.find(cart => cart.id === parseInt(req.params.cid)) //controlar si hay cart
    if (!cart) return res.status(404).send({ status: "success", error: "No se encontro id cart" }) //pasa si no existe

    const products = f.getFromFile('./products.json')
    let product = products.find(pro => pro.id === parseInt(req.params.pid))//controlar si hay product
    if (!product) return res.status(404).send({ status: "success", error: "No product id no existe" })//si no existe)

    product = cart.products.find(pro => pro.id === parseInt(req.params.pid))//busca el producto mandado
    if (!product) {
        product = {
            id: parseInt(req.params.pid),
            quantity: 1
        }
        cart.products.push(product) //agrego producto
        f.saveToFile(carts, "./carts.json")
        return res.json(product)
    }
    product.quantity++ //incremento en uno el producto
    f.saveToFile(carts, "./carts.json")
    res.json(product)
}



)

router.post("/", (req, res) => {
    let id = Date.now() + 1
    const cart = {
        id,
        products: []
    }
    carts.push(cart)
    f.saveToFile(carts, "./carts.json")
    res.json({ status: "success", message: "Cart add" })
})

module.exports = router