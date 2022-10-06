const { dialog } = require("@electron/remote")
const { createWriteStream } = require('fs')
const { Note } = require("inkdrop").models
const { Readable } = require("stream")
const pandoc = require("simple-pandoc")

exports.pdf = async () => {
  const { noteListBar } = inkdrop.store.getState()
  const { actionTargetNoteIds } = noteListBar

  if (actionTargetNoteIds.length === 1) {
    const note = await Note.loadWithId(actionTargetNoteIds[0])

    if (!note.body) return

    const { filePath } = await dialog.showSaveDialog({
      title: "Save PDF file",
      defaultPath: `${note.title}.pdf`,
      filters: [
        { name: "PDF Files", extensions: ["pdf"] },
        { name: "All Files", extensions: ["*"] }
      ]
    })

    if (typeof filePath !== "string" && filePath.length <= 0) {
      return
    }

    pandoc("markdown", "pdf").stream(Readable.from([note.body])).pipe(createWriteStream(filePath))
  }
}
