const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")

const data = require("./test_data")
const { Reviews , Curso, Ciclo, Evaluacion, Resolucion } = require("./dao")
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
    const listaCarreras =  await Reviews.findAll()
    resp.send(listaCarreras)
})


//2. Servicio (endpoint) que nos devuelva una lista de cursos
// path: "/cursos" metodo: GET
// query parameter "/cursos?carrera=1"
app.get("/cursos", async (req, resp) => {
    const carreraId = req.query.carrera

    if (carreraId == undefined || carreraId === "-1") {

        const listaCursos = await Curso.findAll()

        resp.send(listaCursos)
    }else {
        const cursosFiltrados = await Curso.findAll({
            where : {
                carrera_id : carreraId
            }
        })
        resp.send(cursosFiltrados)
    }

})

// 3. Endpoint para listar ciclos
app.get("/ciclos", async (req, resp) => {
    const listadoCiclos = await Ciclo.findAll()
    resp.send(listadoCiclos)
})

// 4. Endpoint para listar evaluaciones
// path: "/evaluaciones" metodo: GET
// query parameter "/evaluaciones?curso=12312&ciclo=23523532"
app.get("/evaluacion", async (req, resp) => {
    const cursoId = req.query.curso
    const cicloId = req.query.ciclo

    if (cicloId == undefined || cicloId === "-1"){
        // Caso que no se seleccione ciclo
        const listadoEvaluaciones = await Evaluacion.findAll({
            where : {
                curso_id : cursoId
            }
        })
        resp.send(listadoEvaluaciones)
    }else {
        // Caso que SI se seleccione ciclo
        const listadoEvaluaciones = await Evaluacion.findAll({
            where : {
                curso_id : cursoId,
                ciclo_id : cicloId
            }
        })
        resp.send(listadoEvaluaciones)
    }
})

// 5: Registro de resolucion de evaluacion
// Recibir la data en el Cuerpo peticion HTTP (POST)
// Request:
// {
//      estudiante_id : "22344523532",
//      evaluacion_id : "22344523532",
//      url : "http://blablac.com/archivo.zip",
// }
app.post("/resolucion", async (req, resp) => {
    const dataRequest = req.body
    const estudianteId = dataRequest.estudiante_id
    const evaluacionId = dataRequest.evaluacion_id
    const url = dataRequest.url

    // Validaciones
    if (estudianteId == null || estudianteId == undefined) resp.send({
        error : "ERROR. Debe enviar un estudiante_id"
    })

    if (evaluacionId == null || evaluacionId == undefined) resp.send({
        error : "ERROR. Debe enviar un evaluacion_id"
    })

    if (url == null || url == undefined) resp.send({
        error : "ERROR. Debe enviar un url"
    })

    // Verificacion si ya existe un envio
    const resoluciones = await Resolucion.findAll({
        estudiante_id : estudianteId,
        evaluacion_id : evaluacionId
    })

    if (resoluciones.length > 0) {
        resp.send({
            error : "ERROR. Ya existe una resolucion para el estudiante_id y la evaluacion_id"
        })
        return
    }



    try {
        await Resolucion.create({
            estudiante_id : estudianteId,
            evaluacion_id : evaluacionId,
            url : url,
            fecha_envio : new Date().toJSON(),
            upvote : 0
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

app.listen(PUERTO, () => {
    console.log(`Servidor web iniciado en puerto ${PUERTO}`)
})

