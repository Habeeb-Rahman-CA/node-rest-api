const writeToFile = require("../utils/write-to-file")
module.exports = (req, res) => {
    let baseUrl = req.url.substring(0, req.url.lastIndexOf("/") + 1)
    let id = req.url.split("/")[3]
    if (baseUrl === "/api/movies/") {
        const index = req.movies.findIndex((movie) => {
            return movie.id === id
        })
        if (index === -1) {
            res.statusCode = 404
            res.write(JSON.stringify({ title: "Not Found", message: "Movie not found" }))
            res.end()
        } else {
            req.movies.splice(index, 1)
            writeToFile(req.movies)
            res.writeHead(203, {"Content-Type": "application/json"})
            res.end(JSON.stringify(req.movies))
        }
    }
}
