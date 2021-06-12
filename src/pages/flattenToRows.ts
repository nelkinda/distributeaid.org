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
  const regions = data.allContentfulDataGeoRegion.nodes.map((region) => {
    return {
      contentfulId: region.contentful_id,
      name: region.name,
      subRegions: [
        {
          contentfulId: '15DzXnD4u70h24CQORFsiT',
          name: 'Athens/Southern Mainland',
        },
      ],
    }
  })
  return regions
}
