import express from "express"

const router = express.Router()

router.get("/", (req, res) => {
    res.render("index",{
        style:'index.css'
    })
})

// router.post("/", (req, res) => {
//     const st = req.body
//     console.log(req.body);
//     if(st){
//         const result = st.split("")
//         result.forEach(element => {
//             console.log(element)
//     })
//     return
//     } 
//     res.status(400).send("Vacio el body")   
// })

export default router