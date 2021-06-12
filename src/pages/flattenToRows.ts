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
  const regions = mapRegion(data)
  return regions
}

const mapSubRegion = (data) => {
  return data.allContentfulDataGeoRegionSubRegion.nodes.map((subRegion) => {
    return {
      contentfulId: subRegion.contentful_id,
      name: subRegion.name,
    }
  })
}

const mapRegion = (data) => {
  return data.allContentfulDataGeoRegion.nodes.map((region) => {
    return {
      contentfulId: region.contentful_id,
      name: region.name,
      subRegions: mapSubRegion(data),
    }
  })
}
