import * as React from "react";
import Layout from "../components/Layout";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { getImage } from "gatsby-plugin-image";
import FullWidthImage from "../components/FullWidthImage";
import Select from "react-select";

export const BookingPageTemplate = ({ image, title }) => {
  const heroImage = getImage(image) || image;
  const options = [
    { value: "barbing", label: "Barbing" },
    { value: "washing", label: "Washing" },
    { value: "dyeing", label: "Dyeing" },
    { value: "hair-dressing", label: "Hair Dressing" },
    { value: "none", label: "Not listed here" },
  ];

  const initialValues = {
    name: "",
    phoneNumber: "",
    service: [],
    date: "",
    time: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Full name is required"),
    phoneNumber: Yup.string().required("Phone number is required"),
    date: Yup.date().required("Date is required"),
    time: Yup.date().required("Time is required"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);
  };

  return (
    <div className="content">
      <FullWidthImage img={heroImage} title={title} height={"350px"} />
      <section className="section">
        <div className="container" style={{ maxWidth: "700px" }}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, handleChange, setFieldValue }) => {
              console.log({ values });

              return (
                <Form
                  name="booking"
                  method="post"
                  data-netlify="true"
                  data-netlify-honeypot="bot-field"
                >
                  <div className="field">
                    <label className="label" htmlFor="name">
                      Full Name
                    </label>
                    <div className="control">
                      <Field
                        className="input booking-field"
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Full Name"
                      />
                    </div>
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="error booking-error-message"
                    />
                  </div>

                  <div className="field">
                    <label className="label" htmlFor="phoneNumber">
                      Phone Number
                    </label>
                    <div className="control">
                      <Field
                        className="input booking-field"
                        name="phoneNumber"
                        id="phoneNumber"
                        placeholder="Phone Number"
                      />
                    </div>
                    <ErrorMessage
                      name="phoneNumber"
                      component="div"
                      className="error booking-error-message"
                    />
                  </div>

                  <div className="field">
                    <div className="field">
                      <label className="label" htmlFor="service">
                        Service
                      </label>
                      <div className="control">
                        <Select
                          defaultValue={"none"}
                          isMulti
                          name="service"
                          options={options}
                          value={values.service}
                          onChange={(service) =>
                            setFieldValue("service", service)
                          }
                          placeholder="Select service"
                        />
                      </div>
                    </div>

                    <div style={{ display: "flex" }}>
                      <div
                        className="field"
                        style={{ width: "100%", marginRight: "6px" }}
                      >
                        <label className="label" htmlFor="date">
                          Date
                        </label>
                        <div className="control">
                          <input
                            type="date"
                            id="date"
                            name="date"
                            className="input booking-field"
                            onChange={handleChange}
                            value={values.date}
                          />
                        </div>
                        <ErrorMessage
                          name="date"
                          component="div"
                          className="error booking-error-message"
                        />
                      </div>

                      <div
                        className="field"
                        style={{ width: "100%", marginLeft: "6px" }}
                      >
                        <label className="label" htmlFor="time">
                          Time
                        </label>
                        <div className="control">
                          <input
                            type="time"
                            id="time"
                            name="time"
                            className="input booking-field"
                            onChange={handleChange}
                            value={values.time}
                          />
                        </div>
                        <ErrorMessage
                          name="time"
                          component="div"
                          className="error booking-error-message"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="field">
                    <button
                      className="cta cta-blue is-link"
                      type="submit"
                      style={{ paddingBlock: "8px", marginTop: "35px" }}
                    >
                      Create Booking
                    </button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </section>
    </div>
  );
};

BookingPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
};

const BookingPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <BookingPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
      />
    </Layout>
  );
};

BookingPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
};

export default BookingPage;

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
