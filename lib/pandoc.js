const { promisify } = require("node:util")
const exec = promisify(require("node:child_process").exec)

exports.exists = async () => {
  let exists = false

  try {
    await exec("pandoc -v")
    exists = true
  } catch {}

  return exists
}
