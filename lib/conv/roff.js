const util = require("../util")

exports.roffMan = async() => { await util.convert("roff man", "man", "man") }
exports.roffMs = async() => { await util.convert("roff ms", "ms", "ms") }

exports.bookroffMan = async(event) => { await util.convertBook(event, "roff man", "man", "man")}
exports.bookroffMs = async(event) => { await util.convertBook(event, "roff ms", "ms", "ms") }
