import "github-markdown-css"

export function getPageContent(state, locale) {
  try {
    state.locale = locale
    state.page = require(`@/i18n/${locale}/document/${state.path}.md`)
    return true
  } catch (e) {
    return false
  }
}

export function getPathByRouter(state, originRouter, documentList) {
  let _path = []
  let path = iterate(documentList, originRouter, _path)
  const [one, two, three, four] = _path
  let active_path
  if (two === undefined) active_path = `${one}`
  else if (three === undefined) active_path = `${one}-${two}`
  else if (four === undefined) active_path = `${one}-${two}-${three}`
  else active_path = `${one}-${two}-${three}-${four}`
  state.active_path = active_path
  state.path = path
  return !!path
}

function iterate(list, originRouter, _path) {
  let targetRouter = ""
  for (let i = 0; i < list.length; i++) {
    let { router, path, child } = list[i]
    if (originRouter === path) {
      _path.push(i)
      return router
    }
    if (child) {
      _path.push(i)
      targetRouter = iterate(child, originRouter, _path)
    }
    if (targetRouter) return targetRouter
  }
  if (!targetRouter) _path.pop()
}
