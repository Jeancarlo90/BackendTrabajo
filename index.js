const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")

const { Reviews, Influencers, Components } = require("./dao")
const { response } = require("express")

const PUERTO = process.env.PORT || 4444

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended : true
}))
app.use(cors())
app.use(express.static("assets"))


app.get("/reviews", async (req, resp) => {
    const listaReviews =  await Reviews.findAll()
    resp.send(listaReviews)
})

app.get("/influencers", async (req, resp) => {
    const listaInfluencers =  await Influencers.findAll()
    resp.send(listaInfluencers)
})

app.get("/components/bestseller", async (req, resp) => {
    const listaComponentsBestSellers =  await Components.findAll({
        where : {
            isbestseller : true
        }
    })
    resp.send(listaComponentsBestSellers)
})

app.get("/components", async (req, resp) => {
    const typeReq = req.query.type

    const listaComponents =  await Components.findAll({
        where : {
            type : typeReq
        }
    })

    resp.send(listaComponents)
})

app.listen(PUERTO, () => {
    console.log(`Servidor web iniciado en puerto ${PUERTO}`)
})

