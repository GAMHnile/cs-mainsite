import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { getImage } from "gatsby-plugin-image";
import Layout from "../components/Layout";
import FullWidthImage from "../components/FullWidthImage";
import ReactGoogleMapLoader from "react-google-maps-loader";
import ReactGoogleMap from "react-google-map";

// eslint-disable-next-line
export const ContactPageTemplate = ({ image, title }) => {
  const heroImage = getImage(image) || image;

  return (
    <div className="content">
      <FullWidthImage img={heroImage} title={title} height={"350px"} />

      <section className="section">
        <div className="container">
          <ReactGoogleMapLoader
            params={{
              key: process.env.GATSBY_GOOGLE_MAPS_API_KEY,
              libraries: "places",
            }}
            render={(googleMaps) =>
              googleMaps && (
                <div style={{ height: "500px" }}>
                  <ReactGoogleMap
                    googleMaps={googleMaps}
                    center={{ lat: 43.604363, lng: 1.443363 }}
                    zoom={8}
                  />
                </div>
              )
            }
          />
        </div>
      </section>
    </div>
  );
};

ContactPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
};

const ContactPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <ContactPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
      />
    </Layout>
  );
};

ContactPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
};

export default ContactPage;

export const productPageQuery = graphql`
  query ProductPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        image {
          childImageSharp {
            gatsbyImageData(quality: 100, layout: FULL_WIDTH)
          }
        }
      }
    }
  }
`;
