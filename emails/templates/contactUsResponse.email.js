const { ASSETS } = require("../../config/constants");

exports.contactUsResponse = (name) => {
  const logo = ASSETS.LOGO_LARGE;
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <title>Thank You for Contacting StudyNotion</title>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
      <!--[if mso]>
      <noscript>
        <xml>
          <o:OfficeDocumentSettings>
            <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
        </xml>
      </noscript>
      <![endif]-->
      <style>
        @media only screen and (max-width: 620px) {
          .container { width: 100% !important; padding: 20px 10px !important; }
          .main-table { width: 100% !important; margin: 0 !important; }
          .content-padding { padding: 32px 24px !important; }
          .header-padding { padding: 28px 24px !important; }
          .footer-padding { padding: 28px 24px !important; }
          .logo { max-width: 140px !important; }
          .main-title { font-size: 22px !important; }
          .greeting { font-size: 20px !important; }
        }

        @media only screen and (max-width: 480px) {
          .content-padding { padding: 24px 20px !important; }
          .header-padding { padding: 24px 20px !important; }
          .footer-padding { padding: 24px 20px !important; }
          .main-title { font-size: 20px !important; }
          .greeting { font-size: 18px !important; }
        }
      </style>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f8fafc; line-height: 1.6;">

      <!-- Preheader text for email preview -->
      <div style="display: none; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #f8fafc;">
        Thank you for contacting StudyNotion. We've received your message and will respond shortly.
      </div>

      <!-- Main wrapper -->
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" class="container" style="background-color: #f8fafc; padding: 40px 20px;">
        <tr>
          <td align="center">

            <!-- Main container -->
            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" class="main-table" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08); overflow: hidden; margin: 0 auto;">

              <!-- Header Section -->
              <tr>
                <td class="header-padding" style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 40px 40px; text-align: center; position: relative;">

                  <!-- Subtle pattern overlay -->
                  <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-image:
                    radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                    radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
                    background-size: 40px 40px; opacity: 0.6;"></div>

                  <!-- Logo container -->
                  <div style="position: relative; z-index: 2;">
                    <img src="${logo}" alt="StudyNotion" class="logo" style="max-width: 160px; height: auto; margin-bottom: 20px; display: block; margin-left: auto; margin-right: auto;" />

                    <!-- Message/Support icon -->
                    <div style="width: 56px; height: 56px; background: linear-gradient(135deg, #10b981 0%, #059669 100%); border-radius: 50%; margin: 0 auto 20px auto; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 16px rgba(16, 185, 129, 0.3);">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 12H16M8 8H16M8 16H12M7 4V2C7 1.44772 7.44772 1 8 1H16C16.5523 1 17 1.44772 17 2V4M7 4H17M7 4C5.89543 4 5 4.89543 5 6V20C5 21.1046 5.89543 22 7 22H17C18.1046 22 18 21.1046 18 20V6C18 4.89543 17.1046 4 17 4" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </div>

                    <h1 class="main-title" style="color: #ffffff; font-size: 28px; font-weight: 700; margin: 0 0 8px 0; letter-spacing: -0.5px;">Message Received</h1>
                    <p style="color: rgba(255, 255, 255, 0.8); font-size: 16px; margin: 0; font-weight: 400;">Thank you for reaching out to us</p>
                  </div>
                </td>
              </tr>

              <!-- Main Content -->
              <tr>
                <td class="content-padding" style="padding: 48px 40px; background-color: #ffffff;">

                  <!-- Personalized Greeting -->
                  <h2 class="greeting" style="color: #111827; font-size: 24px; font-weight: 600; margin: 0 0 32px 0;">Dear ${name},</h2>

                  <!-- Thank you message -->
                  <p style="color: #374151; font-size: 16px; margin: 0 0 24px 0; line-height: 1.6;">
                    Thank you for contacting StudyNotion. Your message is important to us, and we genuinely appreciate the time you took to reach out to our team.
                  </p>

                  <!-- Status confirmation -->
                  <div class="step-container" style="background: linear-gradient(145deg, #f0fdf4 0%, #ecfdf5 100%); border: 1px solid #bbf7d0; border-radius: 12px; padding: 28px; margin: 32px 0; position: relative;">

                    <!-- Accent border -->
                    <div style="position: absolute; left: 0; top: 0; bottom: 0; width: 4px; background: linear-gradient(180deg, #10b981 0%, #059669 100%); border-top-left-radius: 12px; border-bottom-left-radius: 12px;"></div>

                    <h3 style="color: #111827; font-size: 18px; font-weight: 600; margin: 0 0 20px 0;">What Happens Next?</h3>

                    <!-- Bullet Point 1 -->
                    <div style="display: flex; align-items: flex-start; margin-bottom: 16px;">
                      <div style="width: 8px; height: 8px; background: #10b981; border-radius: 50%; margin-right: 16px; flex-shrink: 0; margin-top: 8px;"></div>
                      <p style="color: #374151; font-size: 15px; margin: 0; line-height: 1.5;">We have successfully received your message</p>
                    </div>

                    <!-- Bullet Point 2 -->
                    <div style="display: flex; align-items: flex-start;">
                      <div style="width: 8px; height: 8px; background: #3b82f6; border-radius: 50%; margin-right: 16px; flex-shrink: 0; margin-top: 8px;"></div>
                      <p style="color: #374151; font-size: 15px; margin: 0; line-height: 1.5;">Our dedicated team will review and respond as quickly as possible</p>
                    </div>
                  </div>

                  <!-- Response time and commitment -->
                  <p style="color: #374151; font-size: 16px; margin: 0 0 32px 0; line-height: 1.6;">
                    Our team is dedicated to providing you with the best possible service. We are working hard to address your inquiry and will get back to you shortly with a comprehensive response.
                  </p>

                  <!-- Urgent contact section -->
                  <div style="background: #fffbeb; border: 1px solid #fed7aa; border-radius: 8px; padding: 20px; margin: 32px 0;">
                    <div style="display: flex; align-items: flex-start;">
                      <div style="margin-right: 12px; flex-shrink: 0;">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="#f59e0b">
                          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p style="color: #92400e; font-size: 14px; font-weight: 600; margin: 0 0 8px 0;">Need Immediate Assistance?</p>
                        <p style="color: #78350f; font-size: 13px; margin: 0; line-height: 1.4;">
                          If you have any urgent questions or concerns, please feel free to contact us directly at
                          <a href="mailto:help.studynotion.edu@gmail.com" style="color: #f59e0b; text-decoration: none; font-weight: 500;">help.studynotion.edu@gmail.com</a>
                        </p>
                      </div>
                    </div>
                  </div>

                  <!-- Closing message -->
                  <div style="border-top: 1px solid #e5e7eb; padding-top: 32px; margin-top: 40px;">
                    <p style="color: #374151; font-size: 16px; margin: 0 0 24px 0; line-height: 1.6;">
                      We look forward to assisting you and thank you for choosing StudyNotion for your educational journey.
                    </p>

                    <p style="color: #374151; font-size: 16px; margin: 0; font-weight: 500;">
                      Best regards,<br>
                      <span style="color: #3b82f6; font-weight: 600;">The StudyNotion Team</span>
                    </p>
                  </div>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td class="footer-padding" style="background: #f9fafb; border-top: 1px solid #e5e7eb; padding: 32px 40px; text-align: center;">

                  <!-- Support section -->
                  <div style="margin-bottom: 24px;">
                    <p style="color: #6b7280; font-size: 14px; margin: 0 0 8px 0;">Need help? Contact our support team</p>
                    <a href="mailto:help.studynotion.edu@gmail.com" style="color: #3b82f6; text-decoration: none; font-weight: 500; font-size: 14px;">help.studynotion.edu@gmail.com</a>
                  </div>

                  <!-- Footer text -->
                  <div style="border-top: 1px solid #e5e7eb; padding-top: 20px;">
                    <p style="color: #9ca3af; font-size: 13px; margin: 0 0 8px 0;">© ${new Date().getFullYear()} StudyNotion. All rights reserved.</p>
                    <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                      This is an automated message. Please do not reply to this email.<br>
                      <a href="#" style="color: #6b7280; text-decoration: underline;">Unsubscribe</a> |
                      <a href="#" style="color: #6b7280; text-decoration: underline;">Privacy Policy</a>
                    </p>
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>`;
};
