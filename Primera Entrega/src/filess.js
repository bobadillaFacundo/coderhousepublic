const fs = require("fs")

class filess {

    saveToFile(element, path) {
        fs.writeFileSync(path, JSON.stringify(element), 'utf8')
    }

    getFromFile(path) {
        try {
            const data = fs.readFileSync(path, 'utf8')
            return JSON.parse(data)
        } catch (error) {
            return []
        }
    }

}

const f = new filess()
module.exports = f