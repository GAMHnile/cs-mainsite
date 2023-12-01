import React from "react";
import PropTypes from "prop-types";
import { GatsbyImage } from "gatsby-plugin-image";
import { navigate } from "gatsby";

export default function FullWidthImage({
  height = 350,
  img,
  title,
  subheading,
  cta,
}) {
  return (
    <React.Fragment>
      <div
        className="margin-top-0"
        style={{
          display: "grid",
          alignItems: "center",
          paddingTop: "4rem",
        }}
      >
        {img?.url ? (
          <div
            className="overlay-container"
            style={{
              height,
              gridArea: "1 / 1",
            }}
          >
            <img src={img} objectFit="cover" className="hero-img" alt="" />
            <div className="overlay" />
          </div>
        ) : (
          <div
            className="overlay-container"
            style={{
              height,
              gridArea: "1 / 1",
            }}
          >
            <GatsbyImage
              image={img}
              objectFit="cover"
              className="hero-img"
              layout="fullWidth"
              aspectRatio={3 / 1}
              alt=""
              formats={["auto", "webp", "avif"]}
            />
            <div className="overlay" />
          </div>
        )}

        {(title || subheading) && (
          <div
            style={{
              gridArea: "1/1",
              position: "relative",
              placeItems: "center",
            }}
          >
            <div className="container">
              <div
                className="column is-10 is-offset-1"
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                {title && (
                  <h1 className="has-text-weight-bold has-text-centered is-size-3-mobile is-size-2-tablet is-size-1-widescreen hero-text">
                    {title}
                  </h1>
                )}
                {subheading && (
                  <h3
                    className="has-text-weight-bold is-size-5-mobile is-size-5-tablet is-size-4-widescreen"
                    style={{
                      color: "white",
                      lineHeight: "1",
                      padding: "0.25rem",
                      marginTop: "0.5rem",
                    }}
                  >
                    {subheading}
                  </h3>
                )}
                {cta && (
                  <button
                    className="cta"
                    onClick={() => {
                      navigate("/contact");
                    }}
                  >
                    Book a session
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
}

FullWidthImage.propTypes = {
  img: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  height: PropTypes.number,
  subheading: PropTypes.string,
};
