exports.contactUs = (
  email,
  firstName,
  lastName,
  phoneNo,
  message,
  newInquiry
) => {
  // box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  const logo =
    "https://res.cloudinary.com/mantra-gor/image/upload/v1719229590/StudyNotion/assets/Logo-Full-Light_ftveiv.png";
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>StudyNotion Email Template</title>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap" rel="stylesheet">
    </head>
    <body style="font-family: Plus Jakarta Sans, sans-serif; width: 100%; height: 100%; sans-serif; background-color: transparent; margin: 0; padding: 0;">
      <div style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); overflow: hidden;">
        <div style="background-color: #01212a; color: #ffffff; padding: 20px; text-align: center;">
          <img src="${logo}" alt="StudyNotion Logo" style="max-width: 150px;" />
          <h1 style="font-size: 24px; font-weight: 300; margin: 0;">Welcome to StudyNotion</h1>
        </div>
        <div style="padding: 20px;">
            <h2 style="color: #333333;">Contact Form Submission</h2>
            <p style="color: #555555;"><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p style="color: #555555;"><strong>Email:</strong> ${email}</p>
            <p style="color: #555555;"><strong>Phone Number:</strong> ${phoneNo}</p>
            <p style="color: #555555;"><strong>Message:</strong></p>
            <p style="color: #555555; border-left: 4px solid #ff9900; padding-left: 10px; margin-left: 10px;">${message}</p>
            <br><br>
            <p style="color: #555555;">Database Entry ID: <span style="color: #ff9900;">${newInquiry._id}</span></p>
        </div>
        <div style="background-color: #161d29; color: #ffffff; text-align: center; padding: 10px; font-size: 12px;">
          <p>&copy; 2024 StudyNotion. All rights reserved.</p>
          <p>If you have any questions, feel free to <a href="mailto:help.studynotion.edu@gmail.com" style="color: #ffffff;">contact us</a>.</p>
        </div>
      </div>
    </body>
    </html>`;
};
