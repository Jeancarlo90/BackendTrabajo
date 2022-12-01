const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")

const { Reviews, Influencers, Components, History, Users,Request } = require("./dao")
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


///history?user_id=6c3ea494-7944-4e2c-a067-b56f2372efd1
//Historia 14
app.get("/history", async (req, resp) => {
    const iduserReq = req.query.user_id

    const listaHistory =  await Users.findByPk(iduserReq,{
        include: [ Components],
      })
    resp.send(listaHistory)
})

//Historia 19
app.post("/request", async (req, resp) => {
    const dataRequest = req.body
    console.log(dataRequest);
    try {
        await Request.create({
            user_id:dataRequest.user_id,
            email: dataRequest.email,
            name: dataRequest.name,
            phone: dataRequest.phone,
            subject: dataRequest.subject,
            description : dataRequest.description,
        })
    } catch (error) {
        resp.send({
            error : `ERROR. ${error}`
        })
        return
    }

    resp.send({
        error : ""
    })
})

app.get("/request", async (req, resp) => {
    const user_idReq = req.query.user_id
    const listaRequestbyUser =  await Request.findAll({
        where : {
            user_id : user_idReq
        }
    })
    resp.send(listaRequestbyUser)
})



app.listen(PUERTO, () => {
    console.log(`Servidor web iniciado en puerto ${PUERTO}`)
})

