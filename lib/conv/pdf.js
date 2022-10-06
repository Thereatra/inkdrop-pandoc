const { createWriteStream } = require('fs')
const { Readable } = require("stream")
const pandoc = require("simple-pandoc")
const util = require("./util")

exports.pdf = async () => {
  if (util.selectedNoteCount() === 1) {
    const note = await util.getOneNote()

    if (!note.body) {
      util.notifyDropped(note.title)

      return
    }

    const filePath = await util.getSavePath("PDF", "pdf", note.title)

    if (typeof filePath !== "string" && filePath.length <= 0) {
      return
    }

    await new Promise(resolved => pandoc("markdown", "pdf").stream(Readable.from([note.body])).pipe(createWriteStream(filePath)).on("close", resolved))
    util.notifyCompleted(note.title, "PDF")
  }
}
