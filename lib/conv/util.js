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

exports.getMultipleNotes = async () => {
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

exports.notifyCompletedMultiple = (amount, type) => {
  inkdrop.notifications.addSuccess("Export completed", {
    detail: `${amount} notes was successfully exported to ${type}`,
    dismissable: true
  })
}

exports.notifyNoNote = () => {
  inkdrop.notifications.addError("Export failed", {
    detail: "Export failed as no note was selected",
    dismissable: true
  })
}
