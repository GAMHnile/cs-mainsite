import * as React from "react";
import Layout from "../components/Layout";
import { Form, Field, ErrorMessage, useFormik, FormikProvider } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { getImage } from "gatsby-plugin-image";
import FullWidthImage from "../components/FullWidthImage";
import Select from "react-select";
import axios from "axios";

export const BookingPageTemplate = ({ image, title }) => {
  const heroImage = getImage(image) || image;
  const [messageSuccess, setMessageSuccess] = React.useState(false);
  const [messageError, setMessageError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const initialValues = {
    name: "",
    phoneNumber: "",
    email: "",
    services: [],
    date: "",
    time: "",
  };
  const validationSchema = Yup.object({
    name: Yup.string().required("Full name is required"),
    phoneNumber: Yup.string().required("Phone number is required"),
    services: Yup.array()
      .required("Service is required")
      .min(1, "You must select at least one service"),
    date: Yup.date().required("Date is required"),
    time: Yup.string().required("Time is required"),
  });
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async ({ name, phoneNumber, services, date, time, email }) => {
      setIsLoading(true);
      const formattedTime = convertTo12HourFormat(time);
      const formattedServices = services.map((item) => item.label).join(", ");
      const response = await axios.post("/.netlify/functions/book", {
        name,
        phoneNumber,
        services: formattedServices,
        date,
        time: formattedTime,
        email,
      });
      setIsLoading(false);

      if (response.status === 200) {
        setMessageSuccess(true);
        formik.resetForm();
      } else {
        setMessageError(true);
      }

      setTimeout(() => {
        setMessageSuccess(false);
        setMessageError(false);
      }, 5000);
    },
  });
  const { values, handleChange, setFieldValue, handleSubmit } = formik;

  const options = [
    { value: "barbing", label: "Barbing" },
    { value: "washing", label: "Washing" },
    { value: "dyeing", label: "Dyeing" },
    { value: "hair-dressing", label: "Hair Dressing" },
    { value: "none", label: "Not listed here" },
  ];
  const convertTo12HourFormat = (time24) => {
    const [hours24, minutes] = time24.split(":");
    let hours12 = parseInt(hours24, 10) % 12 || 12;
    const period = parseInt(hours24, 10) < 12 ? "AM" : "PM";
    return `${hours12.toString().padStart(2, "0")}:${minutes} ${period}`;
  };

  return (
    <div className="content">
      <FullWidthImage img={heroImage} title={title} />
      <section className="section">
        <div className="container" style={{ maxWidth: "700px" }}>
          <FormikProvider value={formik}>
            <form noValidate onSubmit={(e) => e.preventDefault()}>
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
                <label className="label" htmlFor="email">
                  Email Address
                </label>
                <div className="control">
                  <Field
                    className="input booking-field"
                    name="email"
                    id="email"
                    placeholder="Email Address"
                  />
                </div>
              </div>

              <div className="field">
                <div className="field">
                  <label className="label" htmlFor="services">
                    Services
                  </label>
                  <div className="control">
                    <Select
                      defaultValue={"none"}
                      isMulti
                      name="services"
                      options={options}
                      value={values.services}
                      onChange={(services) =>
                        setFieldValue("services", services)
                      }
                      placeholder="Select services"
                    />
                  </div>
                  <ErrorMessage
                    name="services"
                    component="div"
                    className="error booking-error-message"
                  />
                </div>

                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  <div className="field" style={{ width: "100%" }}>
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

                  <div className="field" style={{ width: "100%" }}>
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
                  onClick={handleSubmit}
                >
                  {!isLoading ? (
                    "Create Booking"
                  ) : (
                    <div className="loader"></div>
                  )}
                </button>
              </div>
              {messageSuccess ? (
                <p className="success-msg">
                  Your booking was created successfully! We'll be in touch.
                </p>
              ) : messageError ? (
                <p className="error-msg">
                  An error occured while creating booking, please try again.
                </p>
              ) : (
                <p>&nbsp;</p>
              )}
            </form>
          </FormikProvider>
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
