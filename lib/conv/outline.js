const util = require("../util")

exports.opml = async() => { await util.convert("OPML", "opml", "opml") }

exports.bookopml = async(event) => { await util.convertBook(event, "OPML", "opml", "opml") }
