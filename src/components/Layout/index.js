import * as React from "react";
import { Helmet } from "react-helmet";
import Footer from "../Footer";
import Navbar from "../Navbar";
import "../../style/bulma-style.sass";
import "../../style/custom-style.sass";
import useSiteMetadata from "../SiteMetadata";
import { withPrefix } from "gatsby";

const TemplateWrapper = ({ children }) => {
  const { title, description } = useSiteMetadata();
  return (
    <div>
      <Helmet>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={description} />

        <link
          rel="apple-touch-icon"
          sizes="180x157"
          href={`${withPrefix("/")}img/favicon.ico`}
        />
        <link
          rel="icon"
          type="image/svg"
          href={`${withPrefix("/")}img/favicon.ico`}
          sizes="32x28"
        />
        <link
          rel="icon"
          type="image/ico"
          href={`${withPrefix("/")}img/favicon.ico`}
          sizes="16x9"
        />

        <link
          rel="mask-icon"
          href={`${withPrefix("/")}img/favicon.ico`}
          color="#ff4400"
        />
        <meta name="theme-color" content="#fff" />

        <meta property="og:type" content="business.business" />
        <meta property="og:title" content={title} />
        <meta property="og:url" content="/" />
        <meta
          property="og:image"
          content={`${withPrefix("/")}img/og-image.jpg`}
        />
      </Helmet>
      <Navbar />
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default TemplateWrapper;
