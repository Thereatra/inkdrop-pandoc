const { createWriteStream } = require('fs')
const { Readable } = require("stream")
const pandoc = require("simple-pandoc")
const util = require("./util")
const path = require('path')
const { Note } = require("inkdrop").models

const type = "PDF"
const extension = "pdf"

exports.pdf = async () => {
  if (util.selectedNoteCount() > 1) {
    const dir = await util.getSaveDir()
    if (!dir instanceof Array || dir.length <= 0) return

    const dest = dir[0]
    const noteIds = await util.getMultipleNotes()
    for (let noteId of noteIds) {
      const note = await Note.loadWithId(noteId)
      if (note) {
        const filePath = path.join(dest, `${note.title}.${extension}`)
        if (typeof filePath !== "string" || filePath.length <= 0) return

        if (!note.body) {
          util.notifyDropped(note.title)

          return
        }

        await new Promise(resolved => pandoc("markdown", extension).stream(Readable.from([note.body])).pipe(createWriteStream(filePath)).on("finish", resolved))
      }
    }
    util.notifyCompletedMultiple(util.selectedNoteCount() , type)
  } else if (util.selectedNoteCount() === 1) {
    const note = await util.getOneNote()

    if (!note.body) {
      util.notifyDropped(note.title)

      return
    }

    const filePath = await util.getSavePath(type, extension, note.title)
    if (typeof filePath !== "string" || filePath.length <= 0) return

    await new Promise(resolved => pandoc("markdown", extension).stream(Readable.from([note.body])).pipe(createWriteStream(filePath)).on("finish", resolved))
    util.notifyCompleted(note.title, type)
  } else {
    util.notifyNoNote()
  }
}
