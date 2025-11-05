/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2060571834")

  // add field
  collection.fields.addAt(7, new Field({
    "hidden": false,
    "id": "select416669013",
    "maxSelect": 1,
    "name": "materiau",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "metal",
      "acetate",
      "titane",
      "bois"
    ]
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2060571834")

  // remove field
  collection.fields.removeById("select416669013")

  return app.save(collection)
})
