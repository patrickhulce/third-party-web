module.exports = {
  stringifyEntities(entities) {
    return JSON.stringify(entities, (key, value) =>
      value instanceof RegExp ? `REGEXP:${value.source}` : value
    )
  },
}
