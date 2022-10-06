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

exports.notifyDropped = (title) => {
  inkdrop.notifications.addWarning("Export dropped", {
    detail: `Note '${title}' was not exported as it contains no content`,
    dismissable: true,
  })
}

exports.notifyCompleted = (title, type) => {
  inkdrop.notifications.addSuccess("Export completed", {
    detail: `Note '${title}' was successfully exported to ${type}`,
    dismissable: true,
  })
}
