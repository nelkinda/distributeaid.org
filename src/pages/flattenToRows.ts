export interface Props {
  data: {
    allContentfulDataGeoRegion: { nodes }
    allContentfulDataGeoRegionSubRegion: { nodes }
  }
}

// [{contentfulId, name, slug, subRegionName, subRegionSlug, subRegionContentfulId]}]
export const flattenToRows = (data: any) => {
  if (!data) return []
  const {
    allContentfulDataGeoRegion: { nodes: regionNodes }, // regionNodes ['France', 'Greece', ...]
    allContentfulDataGeoRegionSubRegion: { nodes: subRegionNodes }, // subRegionNodes {name: "Calais/Dunkirk", region: {contentful_id: "3MYazP862LGoycVYX2w492"}}
  } = data
  console.log(JSON.stringify(data))
  const displaySubRegion = {}
  return data.allContentfulDataGeoRegionSubRegion.nodes.map((subRegionNode) => {
    const matchingRegion = regionNodes.find(
      (regionNode) =>
        regionNode.contentful_id === subRegionNode.region.contentful_id,
    )

    if (displaySubRegion[matchingRegion.name]) {
      displaySubRegion[matchingRegion.name].push(subRegionNode.name)
    } else {
      displaySubRegion[matchingRegion.name] = [subRegionNode.name]
    }

    console.log(displaySubRegion)

    return {
      ...subRegionNode,
      regionContentfulId: matchingRegion.contentful_id,
      regionName: matchingRegion.name,
      regionSlug: matchingRegion.slug,
    }
  })
}
