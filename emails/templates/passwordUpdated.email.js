const { ASSETS } = require("../../config/constants");

exports.updatePasswordEmail = (email, name) => {
  const logo = ASSETS.LOGO_LARGE;

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <title>Password Updated Successfully - StudyNotion</title>
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
          .button-padding { padding: 16px 28px !important; }
          .logo { max-width: 140px !important; }
          .main-title { font-size: 22px !important; }
          .greeting { font-size: 20px !important; }
        }
        
        @media only screen and (max-width: 480px) {
          .content-padding { padding: 24px 20px !important; }
          .header-padding { padding: 24px 20px !important; }
          .footer-padding { padding: 24px 20px !important; }
          .button-padding { padding: 14px 24px !important; }
          .main-title { font-size: 20px !important; }
          .greeting { font-size: 18px !important; }
        }
      </style>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f8fafc; line-height: 1.6;">
      
      <!-- Preheader text for email preview -->
      <div style="display: none; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #f8fafc;">
        Your StudyNotion password has been updated successfully. Continue your learning journey.
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
                    
                    <!-- Update icon -->
                    <div style="width: 56px; height: 56px; background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); border-radius: 50%; margin: 0 auto 20px auto; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 16px rgba(139, 92, 246, 0.3);">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </div>
                    
                    <h1 class="main-title" style="color: #ffffff; font-size: 28px; font-weight: 700; margin: 0 0 8px 0; letter-spacing: -0.5px;">Password Updated</h1>
                    <p style="color: rgba(255, 255, 255, 0.8); font-size: 16px; margin: 0; font-weight: 400;">Your account settings have been updated</p>
                  </div>
                </td>
              </tr>
              
              <!-- Main Content -->
              <tr>
                <td class="content-padding" style="padding: 48px 40px; background-color: #ffffff;">
                  
                  <!-- Simple Greeting -->
                  <h2 class="greeting" style="color: #111827; font-size: 24px; font-weight: 600; margin: 0 0 32px 0;">Hello ${name}!</h2>
                  
                  <!-- Update confirmation message -->
                  <p style="color: #374151; font-size: 16px; margin: 0 0 24px 0; line-height: 1.6;">
                    This is to confirm that your password has been successfully updated for the account associated with <strong>${email}</strong>.
                  </p>
                  
                  <!-- Account details section -->
                  <div class="step-container" style="background: linear-gradient(145deg, #f0f9ff 0%, #e0f2fe 100%); border: 1px solid #bae6fd; border-radius: 12px; padding: 28px; margin: 32px 0; position: relative;">
                    
                    <!-- Accent border -->
                    <div style="position: absolute; left: 0; top: 0; bottom: 0; width: 4px; background: linear-gradient(180deg, #3b82f6 0%, #1d4ed8 100%); border-top-left-radius: 12px; border-bottom-left-radius: 12px;"></div>
                    
                    <h3 style="color: #111827; font-size: 18px; font-weight: 600; margin: 0 0 20px 0;">Account Update Summary</h3>
                    
                    <!-- Bullet Point 1 -->
                    <div style="display: flex; align-items: flex-start; margin-bottom: 16px;">
                      <div style="width: 8px; height: 8px; background: #3b82f6; border-radius: 50%; margin-right: 16px; flex-shrink: 0; margin-top: 8px;"></div>
                      <p style="color: #374151; font-size: 15px; margin: 0; line-height: 1.5;">Password successfully updated on ${new Date().toLocaleDateString()}</p>
                    </div>
                    
                    <!-- Bullet Point 2 -->
                    <div style="display: flex; align-items: flex-start;">
                      <div style="width: 8px; height: 8px; background: #22c55e; border-radius: 50%; margin-right: 16px; flex-shrink: 0; margin-top: 8px;"></div>
                      <p style="color: #374151; font-size: 15px; margin: 0; line-height: 1.5;">Your account remains secure and ready to use</p>
                    </div>
                  </div>
                  
                  <!-- Get Started section -->
                  <div style="background: linear-gradient(145deg, #fffbeb 0%, #fef3c7 100%); border: 1px solid #fed7aa; border-radius: 12px; padding: 28px; margin: 32px 0; text-align: center;">
                    <h3 style="color: #111827; font-size: 18px; font-weight: 600; margin: 0 0 16px 0;">Continue Your Learning Journey</h3>
                    <p style="color: #374151; font-size: 15px; margin: 0 0 24px 0; line-height: 1.5;">
                      Get started by exploring our courses and resources tailored just for you.
                    </p>
                    
                    <!-- CTA Button -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center">
                      <tr>
                        <td style="background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); border-radius: 8px; box-shadow: 0 4px 16px rgba(251, 191, 36, 0.3);">
                          <a href="https://studynotion.mantragor.com/" class="button-padding" style="display: inline-block; color: #000000; text-decoration: none; padding: 18px 32px; font-size: 16px; font-weight: 700; border-radius: 8px; transition: all 0.2s ease;">
                            Get Started →
                          </a>
                        </td>
                      </tr>
                    </table>
                  </div>
                  
                  <!-- Security warning -->
                  <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 20px; margin: 32px 0;">
                    <div style="display: flex; align-items: flex-start;">
                      <div style="margin-right: 12px; flex-shrink: 0;">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="#ef4444">
                          <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p style="color: #dc2626; font-size: 14px; font-weight: 600; margin: 0 0 8px 0;">Important Security Notice</p>
                        <p style="color: #991b1b; font-size: 13px; margin: 0; line-height: 1.4;">
                          If you did not initiate this password update, please contact our support team immediately to secure your account.
                        </p>
                      </div>
                    </div>
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
