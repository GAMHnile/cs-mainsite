require("dotenv").config();
const {
  GATSBY_MAILGUN_API_KEY,
  GATSBY_MAILGUN_DOMAIN,
  GATSBY_TO_EMAIL_ADDRESS,
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
  const { name, phoneNumber, services, date, time } = data;
  const mailgunData = {
    from: `${name} - Cool Salon`,
    to: GATSBY_TO_EMAIL_ADDRESS,
    subject: `New booking from ${name}`,
    text: `Name: ${name}\nPhone Number: ${phoneNumber}\nService: ${services}\nDate & Time: ${date} - ${time}`,
  };

  return mailgun
    .messages()
    .send(mailgunData)
    .then(() => ({
      status: "success",
      statusCode: 200,
      body: "Your booking was created successfully! We'll be in touch.",
    }))
    .catch((error) => ({
      statusCode: 422,
      body: `Error: ${error}`,
    }));
};
