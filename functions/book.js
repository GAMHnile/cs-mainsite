require("dotenv").config();
const {
  GATSBY_MAILGUN_API_KEY,
  GATSBY_MAILGUN_DOMAIN,
  GATSBY_CREATE_BOOKING_FROM_EMAIL_ADDRESS,
  GATSBY_CREATE_BOOKING_TO_EMAIL_ADDRESS,
  GATSBY_CONFIRM_BOOKING_FROM_EMAIL_ADDRESS,
} = process.env;
const mailgun = require("mailgun-js")({
  apiKey: GATSBY_MAILGUN_API_KEY,
  domain: GATSBY_MAILGUN_DOMAIN,
});

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed",
      headers: { Allow: "POST" },
    };
  }

  const data = JSON.parse(event.body);
  if (
    !data?.name ||
    !data?.phoneNumber ||
    !data?.services ||
    !data?.date ||
    !data?.time
  ) {
    return { statusCode: 422, body: "Incomplete information" };
  }
  const { name, phoneNumber, services, date, time, email } = data;
  const createBookingData = {
    from: GATSBY_CREATE_BOOKING_FROM_EMAIL_ADDRESS,
    to: GATSBY_CREATE_BOOKING_TO_EMAIL_ADDRESS,
    subject: `New Cool Salon booking from ${name}`,
    html: `<html>
    <head>
      <style>
        @import url("https://fonts.googleapis.com/css2?	family=Montserrat:wght@300;400;500;700&display=swap");
        body {
          font-family: "Montserrat", sans-serif;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 414px;
          margin: 20px auto;
          background-color: #fafbfe;
          padding: 30px;
          text-align: center;
        }
        .logo {
          width: 160px;
          height: auto;
          margin-bottom: 20px;
          margin-inline: auto;
        }
        .details-container {
          padding: 39px 18px;
          border-radius: 8px;
          background-color: #fff;
        }
        .heading {
          font-size: 20px;
          color: #8d378a;
        }
        .booking-details-container {
          margin: 40px auto 40px auto;
          padding: 12px;
          border-radius: 8px;
          background-color: #fafbfe;
          text-align: left;
        }
        .booking-details-container p {
          font-size: 14px;
          font-weight: bold;
        }
        .booking-details-container span {
          font-size: 14px;
          font-weight: normal;
        }
        @media only screen and (min-width: 769px) {
          .container {
            max-width: 600px;
          }
          .logo {
            width: 180px;
          }
          .heading {
            font-size: 30px;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <img
          class="logo"
          src="https://thecoolsalon.com/static/logo-165457e3ff960a4af501e9d55b8d83f1.png"
          alt="Cool Salon logo"
        />
        <div class="details-container">
          <h2 class="heading">New Booking</h2>
          <p>
            You have a new booking from
            <span style="font-weight: bold">${name}</span>
          </p>
          <div class="booking-details-container">
            <h2>Booking Details</h2>
  
            <p>Name: <span>${name}</span></p>
            <p>Phone Number: <span>${phoneNumber}</span></p>
            <p>Email Address: <span>${email || ""}</span></p>
            <p>Service: <span>${services}</span></p>
            <p>Date: <span>${date}</span></p>
            <p>Selected time slots: <span>${time}</span></p>
          </div>
        </div>
      </div>
    </body>
  </html>
`,
  };
  const confirmBookingData = {
    from: GATSBY_CONFIRM_BOOKING_FROM_EMAIL_ADDRESS,
    to: email,
    subject: `Cool Salon - Booking Confirmation`,
    html: `<html>
    <head>
      <style>
        @import url("https://fonts.googleapis.com/css2?	family=Montserrat:wght@300;400;500;700&display=swap");
        body {
          font-family: "Montserrat", sans-serif;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 20px auto;
          background-color: #fafbfe;
          padding: 30px;
          text-align: center;
        }
        .logo {
          width: 160px;
          height: auto;
          margin-bottom: 20px;
          margin-inline: auto;
        }
        .details-container {
          padding: 39px 18px;
          border-radius: 8px;
          background-color: #fff;
        }
        .heading {
          font-size: 20px;
          color: #8d378a;
        }
        .booking-details-container {
          margin: 40px auto 40px auto;
          padding: 12px;
          border-radius: 8px;
          background-color: #fafbfe;
          text-align: left;
        }
        .booking-details-container p {
          font-size: 14px;
          font-weight: bold;
        }
        .booking-details-container span {
          font-size: 14px;
          font-weight: normal;
        }
        .disclaimer {
          margin-top: 8px;
          font-size: 12px;
        }
        @media only screen and (min-width: 769px) {
          .logo {
            width: 180px;
          }
          .heading {
            font-size: 30px;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <img
          class="logo"
          src="https://thecoolsalon.com/static/logo-165457e3ff960a4af501e9d55b8d83f1.png"
          alt="Cool Salon logo"
        />
        <div class="details-container">
          <h2 class="heading">Booking confirmed</h2>
          <p>Your booking has been received and confirmed. Thank you!</p>
          <div class="booking-details-container">
            <h2>Booking Details</h2>
           
            <p>Name: <span>${name}</span></p>
            <p>Phone Number: <span>${phoneNumber}</span></p>
            <p>Service: <span>${services}</span></p>
            <p>Date: <span>${date}</span></p>
            <p>Selected time slots: <span>${time}</span></p>
          </div>
        </div>
        <p class="disclaimer">If you received this in error, please disregard.</p>
      </div>
    </body>
  </html>
`,
  };

  try {
    await mailgun.messages().send(createBookingData);
    if (email) {
      await mailgun.messages().send(confirmBookingData);
    }

    return {
      status: "success",
      statusCode: 200,
      body: "Your booking was created successfully!",
    };
  } catch (error) {
    return {
      statusCode: 422,
      body: `Error: ${error}`,
    };
  }
};
