import "jest"
import * as storage from "./storage"

const testData = require("../test-data.json")

describe("openStorageSync", () => {
  test("open storage with no locales", () => {
    const storageHandle = storage.openStorageSync(testData.storageLocation)

    expect(storageHandle).toBeDefined()
  })

  test("open storage for the specified locales", () => {
    const storageHandle = storage.openStorageSync(testData.storageLocation, [ "USUS", "KOKR" ])

    expect(storageHandle).toBeDefined()
  })
})

describe("openStorage", () => {
  describe("with callback", () => {
    test("open storage with no locales", done => {
      storage.openStorage(testData.storageLocation, (error, storageHandle) => {
        console.log("callback")
        expect(error).toBeUndefined()
        expect(storageHandle).toBeDefined()
        done()
      })
    })

    test("open storage for the specified locales", done => {
      storage.openStorage(testData.storageLocation, [ "USUS", "KOKR" ], (error, storageHandle) => {
        expect(error).toBeUndefined()
        expect(storageHandle).toBeDefined()
        done()
      })
    })
  })

  describe("without callback", () => {
    test("open storage with no locales", () => {
      return storage.openStorage(testData.storageLocation)
        .then(storageHandle => {
          expect(storageHandle).toBeDefined()
        })
    })

    test("open storage for the specified locales", () => {
      return storage.openStorage(testData.storageLocation, [ "USUS", "KOKR" ])
        .then(storageHandle => {
          expect(storageHandle).toBeDefined()
        })
    })
  })
})

describe("getStorageInfo", () => {
  let storageHandle: any
  let gameInfo: any

  beforeAll(() => {
    storageHandle = storage.openStorageSync(testData.storageLocation)
    gameInfo = storage.getStorageInfo(storageHandle)
  })

  test("storage info contains a file count", () => {
    expect(gameInfo.fileCount).toBeDefined()
  })

  test("storage info contains the game name", () => {
    expect(gameInfo.gameName).toEqual(testData.gameName)
  })

  test("storage info contains the game build", () => {
    expect(gameInfo.gameBuild).toBeDefined()
  })

  test("storage info contains a list of installed locales", () => {
    expect(Array.isArray(gameInfo.installedLocales)).toBeTruthy()
    expect(gameInfo.installedLocales.length).toBeGreaterThanOrEqual(1)
  })
})
