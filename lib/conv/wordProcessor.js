const util = require("../util")

exports.microsoftWord = async() => { await util.convert("Microsoft Word", "docx", "docx") }
exports.rtf = async() => { await util.convert("Rich Text Format", "rtf", "rtf") }
exports.openoffice = async() => { await util.convert("OpenOffice text document", "odt", "odt") }

exports.bookmicrosoftWord = async(event) => { await util.convertBook(event, "Microsoft Word", "docx", "docx") }
exports.bookrtf = async(event) => { await util.convertBook(event, "Rich Text Format", "rtf", "rtf") }
exports.bookopenoffice = async(event) => { await util.convertBook(event, "OpenOffice text document", "odt", "odt") }
