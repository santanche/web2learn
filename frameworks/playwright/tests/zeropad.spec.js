const {test, expect} = require('@playwright/test')
const {zeroPad} = require('../js/lib.js')

test.describe('zeroPad', () => {

  test('regular zero pad', () => {
    expect(zeroPad(zeroPad(157, 5))).toEqual('00157')
  })

  test('exact size', () => {
    expect(zeroPad(zeroPad(157, 3))).toEqual('157')
  })

  test('less than size', () => {
    expect(zeroPad(zeroPad(157, 2))).toEqual('157')
  })

})