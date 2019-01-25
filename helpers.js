const path = require('path')
const resolvePath = (pathTo) =>
  path.join(path.normalize(process.cwd()), pathTo)

module.exports = {
  resolvePath,
}
