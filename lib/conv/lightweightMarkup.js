const util = require("../util")

exports.markdown = async() => { await util.convert("Markdown", "markdown", "md") }
exports.reStructuredText = async() => { await util.convert("reStructuredText", "rst", "rst") }
exports.asciiDoc = async() => { await util.convert("AsciiDoc", "asciidoc", "adoc") }
exports.emacsOrgMode = async() => { await util.convert("Emacs Org mode", "org", "org") }
exports.emacsMuse = async() => { await util.convert("Emacs Muse", "muse", "muse") }
exports.textile = async() => { await util.convert("Textile", "textile", "textile") }
exports.markua = async() => { await util.convert("Markua", "markua", "txt") }

exports.bookmarkdown = async(event) => { await util.convertBook(event, "Markdown", "markdown", "md") }
exports.bookreStructuredText = async(event) => { await util.convertBook(event, "reStructuredText", "rst", "rst") }
exports.bookasciiDoc = async(event) => { await util.convertBook(event, "AsciiDoc", "asciidoc", "adoc") }
exports.bookemacsOrgMode = async(event) => { await util.convertBook(event, "Emacs Org mode", "org", "org") }
exports.bookemacsMuse = async(event) => { await util.convertBook(event, "Emacs Muse", "muse", "muse") }
exports.booktextile = async(event) => { await util.convertBook(event, "Textile", "textile", "textile") }
exports.bookmarkua = async(event) => { await util.convertBook(event, "Markua", "markua", "txt") }
