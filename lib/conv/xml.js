const util = require("../util")

exports.docbook = async() => { await util.convert("DocBook", "docbook", "dbk") }
exports.jats = async() => { await util.convert("JATS XML", "jats", "xml") }
exports.teiSimple = async() => { await util.convert("TEI Simple", "tei", "xml") }
exports.openDocumentXml = async() => { await util.convert("OpenDocument", "opendocument", "odt") }

exports.bookdocbook = async(event) => { await util.convertBook(event, "DocBook", "docbook", "dbk") }
exports.bookjats = async(event) => { await util.convertBook(event, "JATS XML", "jats", "xml") }
exports.bookteiSimple = async(event) => { await util.convertBook(event, "TEI Simple", "tei", "xml") }
exports.bookopenDocumentXml = async(event) => { await util.convertBook(event, "OpenDocument", "opendocument", "odt") }
