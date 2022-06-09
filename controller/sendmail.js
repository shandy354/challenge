const nodemailer = require("nodemailer");
const CLIENT_ID =
  "368013812723-sn3ed63vk9nnbvnhjm702d6g6r0tocpb.apps.googleusercontent.com";
const CLIENT_SECRET = "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";

exports.email = (req, res) => {
  const { email } = req.body;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: "busroarshad01@gmail.com",
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      accessToken:
        "ya29.a0ARrdaM8cdG3NxZgthCWw9WGZpcN0j0IGmVp410ZX0m69qQQaaLi2ch53sEOA8kWOI92NYPgbjEXGBhp9sFG7Nip3zL90H6Q0X0eTsV4wiUvSRLSfugiBQ0QwaCR5ta-Evfw5IqkFxPaOzg_mVUUqwBWWuaJt",
    },
  });
  const mailOptions = {
    from: "busroarshad01@gmail.com>",
    // to: 'shandyabc313@gmail',
    to: `${email}`,
    subject: "Hello from gmail using API",
    text: "coba-coba belum bisa",
    html: "<h1>coba-coba aja terus smpek bisa</h1>",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
      console.log("Message sent: %s", info.messageId);
    }
  });
  res.status(200).send("email send!");
};
