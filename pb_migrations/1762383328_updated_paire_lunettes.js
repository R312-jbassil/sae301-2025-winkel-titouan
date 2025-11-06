/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2060571834")

  // add field
  collection.fields.addAt(8, new Field({
    "hidden": false,
    "id": "select2414000814",
    "maxSelect": 1,
    "name": "materiau_monture",
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

  // update field
  collection.fields.addAt(7, new Field({
    "hidden": false,
    "id": "select416669013",
    "maxSelect": 1,
    "name": "materiau_branches",
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
  collection.fields.removeById("select2414000814")

  // update field
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
})
