## Current Task

- Format it - regions and subregions and more - Link these to other pages
- Test; where we work (line 60 function = flattenToRows )
  Greece Athens/Southern Mainland, Aegean Islands, Chios, Lesvos, Samos, Thessaloniki/ Northern Mainland
- Test Wrapping case in case they are many sub regions
- Test Order the subregion alphabetically

# Questions and Ideas (Anyone can type in this section )

What are the fundamentals of Typescript?
https://learnxinyminutes.com/docs/typescript/

https://github.com/TypeStrong/ts-node/issues/922

Why can't we compile the production code from our tests??

# Joining The Mob instructions

- Gitpod IDE: https://apricot-duck-vrsd6ain.ws-eu09.gitpod.io/#/workspace/distributeaid.org
  (It takes a few minutes to load so please load this first. Github is good for credentials generally.)

- Feel free to add yourselves to the timer: http://mobtime.herokuapp.com/hairy

- Running test:
  yarn test

## What are the next steps?

- Use the graphQL to pull useful information
- Include this information on the page
- build new template page in order to use it to navigate on it once we click on a region. This template will need to be
  added to the gatsby-node L.297/229 :
  - links to be like `localhost:8000/where-we-work/france` france would be the slug of the region
- Creating subpages for the regions
- would have an overview
- use data stored to describe the shipments going to or from the region - See how to link these with other regions
- images regarding the subregion

## Take over of the shift

- check out the repo `https://github.com/distributeaid/distributeaid.org`
- use branch `gmpe-hack-day`
- install Yarn and check you have node v14
- run `yarn install`
- forward the env file to the next co-host. Do not push it on the branch. rename it: `.env.development`
- run `yarn dev`
- You should be able to see: GraphQL sandbox at:
  http://localhost:8000/where-we-work
  http://localhost:8000/\_\_\_graphql
