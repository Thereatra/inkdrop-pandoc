const { promisify } = require("node:util")
const exec = promisify(require("node:child_process").exec)
const spawn = require('child_process').spawn;

exports.exists = async () => {
  const command = inkdrop.config.get("pandoc.path")
  let exists = false

  try {
    await exec(`${command} -v`)
    exists = true
  } catch {}

  return exists
}

exports.convert = (from, to, ...args) => {
  const command = inkdrop.config.get("pandoc.path")
  const option = ['-f', from, '-t', to].concat(args);

  const converter = src => new Promise((resolve, reject) => {
    const proc = spawn(command, option)
    proc.on('error', reject)

    let data = ''
    proc.stdout.on('data', chunk => {
      data += chunk.toString()
    })

    proc.stdout.on('end', () => resolve(data))
    proc.stdout.on('error', reject)
    proc.stdin.write(src)
    proc.stdin.end()
  })

  converter.stream = srcStream => {
    const proc = spawn(command, option)

    srcStream.pipe(proc.stdin)
    return proc.stdout
  }

  return converter
}
