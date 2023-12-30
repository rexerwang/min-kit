import { UTM } from '../utm'

describe('UTM specs', () => {
  it('should parse utm params correctly', () => {
    expect(
      UTM.parse({
        utm_source: 'source',
        utm_medium: 'medium',
        utm_campaign: 'campaign',
      }),
    ).toEqual({
      source: 'source',
      medium: 'medium',
      campaign: 'campaign',
    })
  })

  it('should parse short utm params correctly', () => {
    expect(
      UTM.parse({
        cs: 'source',
        cm: 'medium',
        cn: 'campaign',
      }),
    ).toEqual({
      source: 'source',
      medium: 'medium',
      campaign: 'campaign',
    })
  })

  it('should generate utm params correctly', () => {
    expect(
      UTM.generate(
        {
          source: 'source',
          medium: 'medium',
          campaign: 'campaign',
        },
        false,
      ),
    ).toEqual({
      utm_source: 'source',
      utm_medium: 'medium',
      utm_campaign: 'campaign',
    })
  })

  it('should generate short utm params correctly', () => {
    expect(
      UTM.generate({
        source: 'source',
        medium: 'medium',
        campaign: 'campaign',
        others: 'others',
      }),
    ).toEqual({
      cs: 'source',
      cm: 'medium',
      cn: 'campaign',
      others: 'others',
    })
  })

  it('should stringify UTMObject to utm params correctly', () => {
    expect(
      UTM.stringify(
        {
          source: 'source',
          medium: 'medium',
          campaign: 'campaign',
        },
        false,
      ),
    ).toBe('utm_campaign=campaign&utm_medium=medium&utm_source=source')
  })

  it('should stringify UTMObject to short utm params correctly', () => {
    expect(
      UTM.stringify({
        source: 'source',
        medium: 'medium',
        campaign: 'campaign',
      }),
    ).toBe('cm=medium&cn=campaign&cs=source')
  })

  it('should determine source with utm correctly', () => {
    expect(UTM.from({ source: 'source' }, { source: 'source' })).toBeTruthy()
    expect(UTM.from({ source: 'source' }, { source: 'source2' })).toBeFalsy()
  })
})
