const {getRootDomain, getEntity} = require('./index.js')

describe('getRootDomain', () => {
  it('works for basic domains', () => {
    expect(getRootDomain('cdn.cnn.com')).toEqual('cnn.com')
    expect(getRootDomain('www.hulce.photography')).toEqual('hulce.photography')
    expect(getRootDomain('api.supercool.io')).toEqual('supercool.io')
  })

  it('works for country-tlds', () => {
    expect(getRootDomain('content.yahoo.co.jp')).toEqual('yahoo.co.jp')
    expect(getRootDomain('go.visit.gov.in')).toEqual('visit.gov.in')
  })

  it('works for URLs', () => {
    expect(getRootDomain('https://content.yahoo.co.jp/path/?query=param')).toEqual('yahoo.co.jp')
    expect(getRootDomain('https://a.b.c.it/path/?query=param&two=2')).toEqual('c.it')
  })
})

describe('getEntity', () => {
  it('works for direct domain usage', () => {
    expect(getEntity('https://js.connect.facebook.net/lib.js')).toEqual({
      name: 'Facebook',
      homepage: 'https://www.facebook.com',
      categories: ['social'],
      domains: expect.any(Array),
    })
  })

  it('works for inferred domain usage', () => {
    expect(getEntity('https://unknown.typekit.net/fonts.css')).toEqual({
      name: 'Adobe TypeKit',
      homepage: 'https://fonts.adobe.com/',
      categories: ['library'],
      domains: expect.any(Array),
    })
  })

  it('does not over-infer', () => {
    expect(getEntity('https://unknown.gstatic.com/what')).toEqual(undefined)
  })
})
