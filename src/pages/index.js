import React from "react"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = ({data}) => (
  <Layout>
    <SEO title="Charles Overbeck Home Page" />
    <div style={{ maxWidth: `600px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <div dangerouslySetInnerHTML={{ __html: data.allFile.edges[0].node.childMarkdownRemark.html }} />
  </Layout>
)
export default IndexPage

export const query = graphql`
  {
    allFile(filter: {name: {eq: "index"}}) {
      edges {
        node {
          id
          name
          extension
          childMarkdownRemark {
            html
          }
        }
      }
    }
  }
`

