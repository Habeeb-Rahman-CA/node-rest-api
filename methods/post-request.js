const crypto = require("crypto")
const requestBodyparser = require("../utils/body-parser")
const writeToFile = require("../utils/write-to-file")
module.exports = async (req, res) => {
    if (req.url === "/api/movies") {
        try {
            let body = await requestBodyparser(req)
            body.id = crypto.randomUUID()
            req.movies.push(body)
            writeToFile(req.movies)
            res.writeHead(201, { "Content-Type": "application/json" })
            res.end()
            console.log("Request Body:", body)
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
