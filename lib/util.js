const { dialog } = require("@electron/remote")
const { Note } = require("inkdrop").models

exports.selectedNoteCount = () => {
  const { noteListBar } = inkdrop.store.getState()
  const { actionTargetNoteIds } = noteListBar
  return actionTargetNoteIds.length
}

exports.getOneNote = async () => {
  const { noteListBar } = inkdrop.store.getState()
  const { actionTargetNoteIds } = noteListBar

  return await Note.loadWithId(actionTargetNoteIds[0])
}

exports.getMultipleNotes = () => {
  const { noteListBar } = inkdrop.store.getState()
  const { actionTargetNoteIds } = noteListBar

  return actionTargetNoteIds
}

exports.getSavePath = async (filetype, extension, filetitle) => {
  const { filePath } = await dialog.showSaveDialog({
    title: `Save ${filetype} file`,
    defaultPath: `${filetitle}.${extension}`,
    filters: [
      { name: `${filetype} Files`, extensions: [extension] },
      { name: "All Files", extensions: ["*"] }
    ]
  })

  return filePath
}

exports.getSaveDir = async () => {
  const { filePaths: res } = await dialog.showOpenDialog(inkdrop.window, {
    title: 'Select Destination Directory',
    properties: ['openDirectory']
  })

  return res
}

notifyDropped = (title) => {
  inkdrop.notifications.addWarning("Export dropped", {
    detail: `Note '${title}' was not exported as it contains no content`,
    dismissable: true,
  })
}

notifyCompleted = (title, type) => {
  inkdrop.notifications.addSuccess("Export completed", {
    detail: `Note '${title}' was successfully exported to ${type}`,
    dismissable: true,
  })
}

notifyCompletedMultiple = (amount, type) => {
  inkdrop.notifications.addSuccess("Export completed", {
    detail: `${amount} notes was successfully exported to ${type}`,
    dismissable: true
  })
}

notifyNoNote = () => {
  inkdrop.notifications.addError("Export failed", {
    detail: "Export failed as no note was selected",
    dismissable: true
  })
}

notifyNoBook = () => {
  inkdrop.notifications.addError("Export failed", {
    detail: "Export failed as no notebook was selected",
    dismissable: true
  })
}


const { createWriteStream } = require('fs')
const { Readable } = require("stream")
const pandoc = require("./pandoc")
const path = require('path')
exports.convert = async (name, doctype, extension) => {
  let notecount = this.selectedNoteCount()
  if (notecount > 1) {
    const dir = await this.getSaveDir()
    if (!dir instanceof Array || dir.length <= 0) return

    const dest = dir[0]
    const noteIds = this.getMultipleNotes()
    for (let noteId of noteIds) {
      const note = await Note.loadWithId(noteId)
      if (note) {
        const filePath = path.join(dest, `${note.title}.${extension}`)
        if (typeof filePath !== "string" || filePath.length <= 0) return

        if (!note.body) {
          notifyDropped(note.title)
          notecount--
          continue
        }

        await new Promise(resolved => pandoc.convert("markdown", doctype, "--standalone").stream(Readable.from([note.body])).pipe(createWriteStream(filePath)).on("finish", resolved))
      }
    }
    notifyCompletedMultiple(notecount , name)
  } else if (notecount === 1) {
    const note = await this.getOneNote()

    if (!note.body) {
      notifyDropped(note.title)

      return
    }

    const filePath = await this.getSavePath(name, extension, note.title)
    if (typeof filePath !== "string" || filePath.length <= 0) return

    await new Promise(resolved => pandoc.convert("markdown", doctype, "--standalone").stream(Readable.from([note.body])).pipe(createWriteStream(filePath)).on("finish", resolved))
    notifyCompleted(note.title, name)
  } else {
    notifyNoNote()
  }
}

const sanitize = require('sanitize-filename')
const fs = require('fs')
exports.convertBook = async (event, name, doctype, extension) => {
  const { bookList: { bookForContextMenu } } = inkdrop.store.getState()
  const bookId = (event.detail || {}).bookId || (bookForContextMenu || {})._id
  if (bookId) {
    exportNotesInBook(bookId, name, extension, doctype)
  } else {
    notifyNoBook()
  }
}

async function exportNotesInBook(bookId, type, extension, doctype) {
  const book = findNoteFromTree(bookId, inkdrop.store.getState().books.tree)
  if (!book) throw new Error('Notebook not found: ' + bookId)

  const { filePaths: pathArrayToSave } = await dialog.showOpenDialog({
    title: `Select a directory to export a book "${book.name}"`,
    properties: ['openDirectory', 'createDirectory']
  })
  if (!pathArrayToSave instanceof Array || pathArrayToSave.length <= 0) return

  const [pathToSave] = pathArrayToSave
  try {
    await exportBook(pathToSave, book, { createBookDir: false }, type, extension, doctype)
    inkdrop.notifications.addInfo(`Finished exporting notes in "${book.name}"`, {
        detail: 'Directory: ' + pathToSave,
        dismissable: true
    })
  } catch (e) {
    inkdrop.notifications.addError('Failed to export', {
      detail: e.message,
      dismissable: true
    })
  }

}

async function exportBook(parentDir, book, opts = {}, type, extension, doctype) {
  const { createBookDir = true } = opts
  const db = inkdrop.main.dataStore.getLocalDB()
  const dirName = sanitize(book.name, { replacement: '-' })
  const pathToSave = createBookDir ? path.join(parentDir, dirName) : parentDir
  const { docs: notes } = await db.notes.findInBook(book._id, {
    limit: false
  })

  if (notes.length <= 0) return

  !fs.existsSync(pathToSave) && fs.mkdirSync(pathToSave)
  for (let i = 0; i < notes.length; ++i) {
    const savePath = path.join(pathToSave, `${notes[i].title}.${extension}`)
    if (typeof savePath !== "string" || savePath.length <= 0) return

    if (!notes[i].body) {
      notifyDropped(notes[i].title)
      continue
    }

    await new Promise(resolved => pandoc.convert("markdown", doctype, "--standalone").stream(Readable.from([notes[i].body])).pipe(createWriteStream(savePath)).on("finish", resolved))
  }

  if (book.children) {
    await book.children.reduce((promise, childBook) => {
      return promise.then(() => exportBook(pathToSave, childBook, {}, type, extension, doctype))
    }, Promise.resolve())
  }
}

function findNoteFromTree(bookId, tree) {
  for (let i = 0; i < tree.length; ++i) {
    const item = tree[i]
    if (item._id === bookId) {
      return item
    } else if (item.children) {
      const book = findNoteFromTree(bookId, item.children)
      if (book) {
        return book
      }
    }
  }
  return undefined
}
