const requestBodyparser = require("../utils/body-parser")
const writeToFile = require("../utils/write-to-file")
module.exports = async(req, res) => {
    let baseUrl = req.url.substring(0, req.url.lastIndexOf("/") + 1)
    let id = req.url.split("/")[3]
    if (baseUrl === "/api/movies/") {
        try {
            let body = await requestBodyparser(req)
            const index = req.movies.findIndex((movie) => {
                return movie.id === id
            })
            if (index === -1) {
                res.statusCode = 404
                res.write(JSON.stringify({ title: "Not Found", message: "Movie not found" }))
                res.end()
            } else {
                req.movies[index] = {id, ...body}
                writeToFile(req.movies)
                res.writeHead(200, {"Content-Types": "application/json"})
                res.end(JSON.stringify(req.movies[index]))
            }
        } catch (error) {
            console.log(error)
            res.writeHead(404, { "Content-Type": "application/json" })
            res.end(JSON.stringify({ title: "Validation failed", message: "Route not found" }))
        }
    } else {
        res.writeHead(404, { "Content-Type": "application/json" })
        res.end(JSON.stringify({ title: "Not Found", message: "Route not found" }))
    }
}
