import { generateRandomId } from './generateRandomId'

describe('generateRandomId', () => {
  it('it should return a string with length 12', () => {
    const str = generateRandomId()

    expect(str).toHaveLength(12)
    expect(typeof str).toBe('string')
  })
})
