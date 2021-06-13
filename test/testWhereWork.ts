import { expect } from 'chai'
import 'mocha'
import { flattenToRows } from '../src/pages/flattenToRows'

/* Data structure 
    // TODO - figure out best place to put documentation
        contentful_id:  primary key for this record
        name: name of geographical area (region or subregion)
        slug: slug is like a URL friendly name for the subregion
        region: includes { contentful_id: }
            records that are regions will have 3 attributes:      contentful_id: name: slug: 
            records that are sub regions then it has 4 attributes: contentful_id: name: slug: region
*/

const regionFrance = {
  contentful_id: '3MYazP862LGoycVYX2w492',
  name: 'France',
  slug: 'france',
}
const regionGreece = {
  contentful_id: '4nuGDkPN1NvvBYpCnu2O73',
  name: 'Greece',
  slug: 'greece',
}

const subregionParis = {
  contentful_id: '3I4MuzlfM7e0w55FlSa04n',
  name: 'Paris',
  slug: 'paris',
  region: { contentful_id: '3MYazP862LGoycVYX2w492' },
}

const subregionAthens = {
  contentful_id: '15DzXnD4u70h24CQORFsiT',
  name: 'Athens/Southern Mainland',
  slug: 'athens-southern-mainland',
  region: { contentful_id: '4nuGDkPN1NvvBYpCnu2O73' },
}

const subregionAegeanIslands = {
  contentful_id: 'YEHgwxNjCpd8nD3FG651I',
  name: 'Aegean Islands',
  slug: 'aegean-islands',
  region: { contentful_id: '4nuGDkPN1NvvBYpCnu2O73' },
}

function givenData(regions, subRegions) {
  return {
    allContentfulDataGeoRegionSubRegion: {
      nodes: [...subRegions],
    },
    allContentfulDataGeoRegion: {
      nodes: [...regions],
    },
  }
}

function expectRegion(region, subRegions) {
  return {
    contentfulId: region.contentful_id,
    name: region.name,
    subRegions: subRegions.map((subRegion) => {
      return {
        contentfulId: subRegion.contentful_id,
        name: subRegion.name,
      }
    }),
  }
}

describe('Where We Work', function () {
  describe('flattenToRows', function () {
    it('flattens one sub-region', function () {
      const data = givenData([regionFrance], [subregionParis])

      const expected = [expectRegion(regionFrance, [subregionParis])]
      expect(flattenToRows(data)).to.deep.equal(expected)
    })

    it('flattens multiple regions', function () {
      const data = givenData(
        [regionFrance, regionGreece],
        [subregionParis, subregionAthens],
      )

      const expected = [
        expectRegion(regionFrance, [subregionParis]),
        expectRegion(regionGreece, [subregionAthens]),
      ]

      expect(flattenToRows(data)).to.deep.equal(expected)
    })

    it('flattens multiple sub-regions', function () {
      const data = givenData(
        [regionGreece],
        [subregionAthens, subregionAegeanIslands],
      )

      const expected = [
        expectRegion(regionGreece, [subregionAthens, subregionAegeanIslands]),
      ]

      expect(flattenToRows(data)).to.deep.equal(expected)
    })
  })
})
