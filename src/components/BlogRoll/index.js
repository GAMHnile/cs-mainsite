import React from "react";
import PropTypes from "prop-types";
import { Link, graphql, StaticQuery } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const BlogRollTemplate = (props) => {
  const { edges } = props.data.allMarkdownRemark;
  const isBrowser = typeof window !== "undefined";
  const pathname = isBrowser ? window.location.pathname : "";
  const posts = pathname === "/" ? edges.slice(0, 2) : edges;

  return (
    <div className="columns is-multiline justify-center">
      {posts &&
        posts.map(({ node: post }) => {
          const image = getImage(post?.frontmatter?.featuredimage);
          return (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
              key={post.id}
              className="column is-5 blog-card"
            >
              {image && (
                <GatsbyImage
                  image={image}
                  className="card-image"
                  alt={post.frontmatter.title}
                  objectFit="contain"
                  style={{ minWidth: "200px" }}
                />
              )}

              <div>
                <h4 style={{ marginTop: 0 }}>{post.frontmatter.title}</h4>
                <p className="title" style={{ fontSize: "15px" }}>
                  {post.frontmatter.date}
                </p>
              </div>

              <p>
                {post.excerpt}
                <br />
                <br />
                <Link className="button" to={post.fields.slug}>
                  Keep Reading →
                </Link>
              </p>
            </div>
          );
        })}
    </div>
  );
};

BlogRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
};

export default function BlogRoll() {
  return (
    <StaticQuery
      query={graphql`
        query BlogRollQuery {
          allMarkdownRemark(
            sort: { order: DESC, fields: [frontmatter___date] }
            filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
          ) {
            edges {
              node {
                excerpt(pruneLength: 100)
                id
                fields {
                  slug
                }
                frontmatter {
                  title
                  templateKey
                  date(formatString: "MMMM DD, YYYY")
                  featuredpost
                  featuredimage {
                    childImageSharp {
                      gatsbyImageData(
                        width: 120
                        quality: 100
                        layout: CONSTRAINED
                      )
                    }
                  }
                }
              }
            }
          }
        }
      `}
      render={(data, count) => <BlogRollTemplate data={data} count={count} />}
    />
  );
}
