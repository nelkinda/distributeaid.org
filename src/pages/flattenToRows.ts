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
  return [
    {
      contentfulId: '4nuGDkPN1NvvBYpCnu2O73',
      name: 'Greece',
      subRegions: [
        {
          contentfulId: '15DzXnD4u70h24CQORFsiT',
          name: 'Athens/Southern Mainland',
        },
      ],
    },
  ]
}
