const { createWriteStream } = require('fs')
const { Readable } = require("stream")
const pandoc = require("simple-pandoc")
const util = require("./util")

exports.html5 = async () => {
  if (util.selectedNoteCount() === 1) {
    const note = await util.getOneNote()

    if (!note.body) {
      util.notifyDropped(note.title)

      return
    }

    const filePath = await util.getSavePath("HTML5", "html", note.title)

    if (typeof filePath !== "string" && filePath.length <= 0) {
      return
    }

    await new Promise(resolved => pandoc("markdown", "html").stream(Readable.from([note.body])).pipe(createWriteStream(filePath)).on("close", resolved))
    util.notifyCompleted(note.title, "HTML5")
  }
}
