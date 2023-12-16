import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { getImage } from "gatsby-plugin-image";
import Layout from "../components/Layout";
import FullWidthImage from "../components/FullWidthImage";
import BlogRoll from "../components/BlogRoll";

// eslint-disable-next-line
export const BlogPageTemplate = ({ image, title }) => {
  const heroImage = getImage(image) || image;

  return (
    <div className="content">
      <FullWidthImage img={heroImage} title={title} />
      <section className="section section--gradient">
        <div className="container">
          <div className="column is-10 is-offset-1">
            <BlogRoll />
          </div>
        </div>
      </section>
    </div>
  );
};

BlogPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
};

const BlogPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <BlogPageTemplate image={frontmatter.image} title={frontmatter.title} />
    </Layout>
  );
};

BlogPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
};

export default BlogPage;

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
