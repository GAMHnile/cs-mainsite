import React from "react";
import PropTypes from "prop-types";
import { graphql, navigate } from "gatsby";
import { getImage } from "gatsby-plugin-image";
import Layout from "../components/Layout";
import FullWidthImage from "../components/FullWidthImage";
import Services from "../components/Services";
import BlogRoll from "../components/BlogRoll";

// eslint-disable-next-line
export const IndexPageTemplate = ({
  image,
  title,
  mainpitch,
  services,
  intro,
}) => {
  const heroImage = getImage(image) || image;

  return (
    <div>
      <FullWidthImage
        img={heroImage}
        title={title}
        cta
        height={"calc(100vh - 4rem)"}
      />
      <section className="section section--gradient">
        <div className="container">
          <div className="column is-10 is-offset-1">
            <div className="content">
              <div
                className="content"
                style={{
                  marginTop: "48px",
                  alignItems: "center",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <p className="title has-text-centered section-header">
                  {mainpitch.title}
                </p>
                <div className="tile">
                  <p className="subtitle card-content">
                    {mainpitch.description}
                  </p>
                </div>

                <button
                  className="cta cta-blue"
                  onClick={() => navigate("/about")}
                >
                  See more
                </button>
              </div>

              {services && services?.blurbs?.length && (
                <Services services={services} />
              )}

              <div
                className="section-mt"
                style={{
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <p className="title has-text-centered section-header">
                  Latest Stories
                </p>
                <BlogRoll />
                <div style={{ justifyContent: "center", display: "flex" }}>
                  <button
                    className="cta cta-blue"
                    onClick={() => navigate("/blog")}
                  >
                    See more
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  mainpitch: PropTypes.object,
  services: PropTypes.object,
  description: PropTypes.string,
  intro: PropTypes.shape({
    blurbs: PropTypes.array,
  }),
};

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <IndexPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        heading={frontmatter.heading}
        subheading={frontmatter.subheading}
        mainpitch={frontmatter.mainpitch}
        description={frontmatter.description}
        intro={frontmatter.intro}
        services={frontmatter.services}
      />
    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        image {
          childImageSharp {
            gatsbyImageData(quality: 100, layout: FULL_WIDTH)
          }
        }
        heading
        subheading
        mainpitch {
          title
          description
        }
        services {
          title
          description
          blurbs {
            image {
              childImageSharp {
                gatsbyImageData(quality: 100, layout: FULL_WIDTH)
              }
            }
            title
          }
        }
        description
        intro {
          blurbs {
            image {
              childImageSharp {
                gatsbyImageData(width: 240, quality: 64, layout: CONSTRAINED)
              }
            }
            title
            text
          }
          heading
          description
        }
      }
    }
  }
`;
