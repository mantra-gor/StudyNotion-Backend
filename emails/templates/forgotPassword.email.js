const { ASSETS } = require("../../config/constants");

exports.forgotPasswordEmail = (name, url) => {
  const logo = ASSETS.LOGO_LARGE;
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <title>Reset Your StudyNotion Password</title>
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
          .step-container { padding: 20px !important; }
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
        Reset your StudyNotion password securely. This link expires in 5 minutes.
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
                    
                    <!-- Lock icon -->
                    <div style="width: 56px; height: 56px; background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); border-radius: 50%; margin: 0 auto 20px auto; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 16px rgba(59, 130, 246, 0.3);">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C13.1046 2 14 2.89543 14 4V6H18C18.5523 6 19 6.44772 19 7V19C19 19.5523 18.5523 20 18 20H6C5.44772 20 5 19.5523 5 19V7C5 6.44772 5.44772 6 6 6H10V4C10 2.89543 10.8954 2 12 2ZM12 4V6H12V4ZM12 13C11.4477 13 11 13.4477 11 14C11 14.5523 11.4477 15 12 15C12.5523 15 13 14.5523 13 14C13 13.4477 12.5523 13 12 13Z" fill="white"/>
                      </svg>
                    </div>
                    
                    <h1 class="main-title" style="color: #ffffff; font-size: 28px; font-weight: 700; margin: 0 0 8px 0; letter-spacing: -0.5px;">Password Reset</h1>
                    <p style="color: rgba(255, 255, 255, 0.8); font-size: 16px; margin: 0; font-weight: 400;">Secure your account in just a few clicks</p>
                  </div>
                </td>
              </tr>
              
              <!-- Main Content -->
              <tr>
                <td class="content-padding" style="padding: 48px 40px; background-color: #ffffff;">
                  
                  <!-- Simple Greeting -->
                  <h2 class="greeting" style="color: #111827; font-size: 24px; font-weight: 600; margin: 0 0 32px 0;">Hello ${name}!</h2>
                  
                  <!-- Main message -->
                  <p style="color: #374151; font-size: 16px; margin: 0 0 32px 0; line-height: 1.6;">
                    We received a request to reset your StudyNotion account password. Follow the secure process below to create a new password and get back to your learning journey.
                  </p>
                  
                  <!-- Process Steps with Bullet Points -->
                  <div class="step-container" style="background: linear-gradient(145deg, #f8fafc 0%, #f1f5f9 100%); border: 1px solid #e5e7eb; border-radius: 12px; padding: 28px; margin: 32px 0; position: relative;">
                    
                    <!-- Accent border -->
                    <div style="position: absolute; left: 0; top: 0; bottom: 0; width: 4px; background: linear-gradient(180deg, #3b82f6 0%, #1d4ed8 100%); border-top-left-radius: 12px; border-bottom-left-radius: 12px;"></div>
                    
                    <h3 style="color: #111827; font-size: 18px; font-weight: 600; margin: 0 0 20px 0;">Quick Reset Process</h3>
                    
                    <!-- Bullet Point 1 -->
                    <div style="display: flex; align-items: flex-start; margin-bottom: 16px;">
                      <div style="width: 8px; height: 8px; background: #3b82f6; border-radius: 50%; margin-right: 16px; flex-shrink: 0; margin-top: 8px;"></div>
                      <p style="color: #374151; font-size: 15px; margin: 0; line-height: 1.5;">Click the secure reset button below</p>
                    </div>
                    
                    <!-- Bullet Point 2 -->
                    <div style="display: flex; align-items: flex-start;">
                      <div style="width: 8px; height: 8px; background: #10b981; border-radius: 50%; margin-right: 16px; flex-shrink: 0; margin-top: 8px;"></div>
                      <p style="color: #374151; font-size: 15px; margin: 0; line-height: 1.5;">Create your new password <span style="background: #fef3c7; color: #92400e; padding: 2px 8px; border-radius: 4px; font-weight: 500;">(expires in 5 minutes)</span></p>
                    </div>
                  </div>
                  
                  <!-- CTA Button -->
                  <div style="text-align: center; margin: 40px 0;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center">
                      <tr>
                        <td style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); border-radius: 8px; box-shadow: 0 4px 16px rgba(59, 130, 246, 0.3);">
                          <a href="${url}" class="button-padding" style="display: inline-block; color: #ffffff; text-decoration: none; padding: 18px 32px; font-size: 16px; font-weight: 600; border-radius: 8px; transition: all 0.2s ease;">
                            Reset Password →
                          </a>
                        </td>
                      </tr>
                    </table>
                  </div>
                  
                  <!-- Alternative access -->
                  <div style="background: #fffbeb; border: 1px solid #fed7aa; border-radius: 8px; padding: 20px; margin: 32px 0;">
                    <div style="display: flex; align-items: flex-start;">
                      <div style="margin-right: 12px; flex-shrink: 0;">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="#f59e0b">
                          <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p style="color: #92400e; font-size: 14px; font-weight: 600; margin: 0 0 8px 0;">Button not working?</p>
                        <p style="color: #78350f; font-size: 13px; margin: 0; line-height: 1.4;">
                          Copy and paste this link into your browser:<br>
                          <span style="font-family: 'SF Mono', Monaco, monospace; background: #fed7aa; padding: 4px 8px; border-radius: 4px; font-size: 12px; word-break: break-all; display: inline-block; margin-top: 8px;">${url}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Security notice -->
                  <div style="border-top: 1px solid #e5e7eb; padding-top: 32px; margin-top: 40px;">
                    <div style="background: #f0fdf4; border-left: 4px solid #22c55e; border-radius: 6px; padding: 16px 20px; margin-bottom: 24px;">
                      <div style="display: flex; align-items: flex-start;">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="#22c55e" style="margin-right: 12px; flex-shrink: 0; margin-top: 2px;">
                          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                        </svg>
                        <p style="color: #166534; font-size: 14px; margin: 0; font-weight: 500; line-height: 1.5;">
                          <strong>Security Note:</strong> If you didn't request this reset, you can safely ignore this email. Your account remains secure.
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
                      This email was sent to you as a registered user of StudyNotion.<br>
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
