export interface Props {
  data: {
    allContentfulDataGeoRegion: { nodes }
    allContentfulDataGeoRegionSubRegion: { nodes }
  }
}

export interface SomeInterface {
  allContentfulDataGeoRegion: { nodes }
  allContentfulDataGeoRegionSubRegion: { nodes }
}

// [{contentfulId, name, slug, subRegionName, subRegionSlug, subRegionContentfulId]}]
export const flattenToRows = (data: SomeInterface) => {
  const regions = mapRegions(data)
  const result = regions.filter((region) => region.subRegions.length > 0)

  return result
}

const mapRegions = (data) => {
  return data.allContentfulDataGeoRegion.nodes.map((region) => {
    return {
      contentfulId: region.contentful_id,
      name: region.name,
      subRegions: mapSubRegions(data, region.contentful_id),
    }
  })
}

const mapSubRegions = (data, regionId) => {
  return data.allContentfulDataGeoRegionSubRegion.nodes
    .filter((subRegion) => subRegion.region.contentful_id === regionId)
    .map((subRegion) => {
      return {
        contentfulId: subRegion.contentful_id,
        name: subRegion.name,
      }
    })
}
