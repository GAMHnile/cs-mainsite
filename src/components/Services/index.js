import * as React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const Services = ({ services }) => (
  <div className="content section-mt">
    <p className="title has-text-centered section-header">{services.title}</p>
    <p className="has-text-centered">{services.description}</p>
    <div
      className="columns is-multiline"
      style={{
        alignItems: "center",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      {services.blurbs.map(({ title, image }, idx) => {
        const sourceImage = getImage(image);

        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
            key={title + idx}
            className="is-parent column is-6"
          >
            <GatsbyImage
              image={sourceImage}
              className="card-image"
              alt={title}
              objectFit="contain"
              style={{ minWidth: "300px", width: "100%" }}
            />
            <h4 style={{ marginTop: 0 }}>{title}</h4>
          </div>
        );
      })}
    </div>
  </div>
);

export default Services;
