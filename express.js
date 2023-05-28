const http = require('http')
const path = require('path')
const fs = require('fs')
function queryTugirlash(url) {
    let query = {}
    let indexQuery = url.lastIndexOf('?')
    if (indexQuery != -1) {
        let queryArr = url.slice(indexQuery + 1).split('&')
        queryArr = queryArr.filter(elem => elem != '')
        queryArr.map(elem => {
            let elemData = elem.split('=')
            query[elemData[0]] = elemData[1]
        })
    }
    return query
}

class express {
    constructor() {
        this.yullar = []
        this.uses = []
        this.port = 3000
        this.server = http.createServer(async (req, res) => {
            req.body = {}
            req.query = {}
            req.params = {}
            req.header = (elem) => req.headers[elem]

            res.send = (data) => {
                res.setHeader('Content-Type', 'text/plain')
                res.end(data)
            }
            res.json = (data) => {
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify(data))
            }
            res.status = (code) => {
                // res.status = code
                res.statusCode = code
                return res
            }
            res.statusCode = (code) => {
                // res.status = code
                res.statusCode = code
                return res
            }
            res.sendFile = (path) => {
                fs.readFile(path, (err, data) => {
                    if (err) {
                        res.statusCode = 500;
                        res.end('Server xatosi');
                        return;
                    }
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'text/html');
                    res.end(data);
                });
            }
            await req.on('data', (chunk) => {
                req.body = JSON.parse(chunk.toString())
            });
           
            console.log(req.url, req.method);
            req.query = queryTugirlash(req.url)

            for (const handler of this.uses) {
                handler(req, res)
            }
            for (const { method, path, handler } of this.yullar) {

                let pathArr = path.split('/')
                let reqUrlArr = req.url.split('/')
                pathArr.forEach((element, index) => {
                    if (element.includes(':')) {
                        if (reqUrlArr[index] == +(reqUrlArr[index])) {
                            reqUrlArr[index] = +(reqUrlArr[index])
                        }
                        req.params[element.slice(1)] = reqUrlArr[index]
                    }
                });
                console.log(req.params);

                if (method == req.method && req.url == path) {
                    return handler(req, res)
                }
            }
            res.statusCode(404)
            res.end('Not Found')
        })
    }
    use(handler) {
        this.uses.push(handler)
    }
    get(path, handler) {
        this.yullar.push({
            method: "GET",
            path,
            handler
        })
    }
    post(path, handler) {
        this.yullar.push({
            method: "POST",
            path,
            handler
        })
    }
    put(path, handler) {
        this.yullar.push({
            method: "PUT",
            path,
            handler
        })
    }
    delete(path, handler) {
        this.yullar.push({
            method: "DELETE",
            path,
            handler
        })
    }
    listen(PORT, handler) {
        this.server.listen(PORT, handler)
    }
}
// export const express=express
module.exports = express;
