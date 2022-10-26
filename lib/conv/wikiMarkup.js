const util = require("../util")

exports.mediawiki = async() => { await util.convert("MediaWiki markup", "mediawiki", "mw") }
exports.dokuwiki = async() => { await util.convert("DokuWiki markup", "dokuwiki", "txt") }
exports.xwiki = async() => { await util.convert("XWiki markup", "xwiki", "txt") }
exports.zimwiki = async() => { await util.convert("ZimWiki markup", "zimwiki", "txt") }
exports.jirawiki = async() => { await util.convert("Jira/Confluence wiki markup", "jira", "txt") }

exports.bookmediawiki = async(event) => { await util.convertBook(event, "MediaWiki markup", "mediawiki", "mw") }
exports.bookdokuwiki = async(event) => { await util.convertBook(event, "DokuWiki markup", "dokuwiki", "txt") }
exports.bookxwiki = async(event) => { await util.convertBook(event, "XWiki markup", "xwiki", "txt") }
exports.bookzimwiki = async(event) => { await util.convertBook(event, "ZimWiki markup", "zimwiki", "txt") }
exports.bookjirawiki = async(event) => { await util.convertBook(event, "Jira/Confluence wiki markup", "jira", "txt") }
