const { ASSETS } = require("../../config/constants");

exports.contactUs = (
  email,
  firstName,
  lastName,
  phoneNo,
  message,
  newInquiry
) => {
  const logo = ASSETS.LOGO_LARGE;
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <title>New Contact Form Submission - StudyNotion</title>
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
        }
        
        @media only screen and (max-width: 480px) {
          .content-padding { padding: 24px 20px !important; }
          .header-padding { padding: 24px 20px !important; }
          .footer-padding { padding: 24px 20px !important; }
          .main-title { font-size: 20px !important; }
        }
      </style>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f8fafc; line-height: 1.6;">
      
      <!-- Preheader text for email preview -->
      <div style="display: none; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #f8fafc;">
        New contact form submission from ${firstName} ${lastName} - ${email}
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
                    
                    <!-- Form submission icon -->
                    <div style="width: 56px; height: 56px; background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); border-radius: 50%; margin: 0 auto 20px auto; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 16px rgba(245, 158, 11, 0.3);">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 12L11 14L15 10M4 16.5V7.5C4 6.11929 5.11929 5 6.5 5H17.5C18.8807 5 20 6.11929 20 7.5V16.5C20 17.8807 18.8807 19 17.5 19H6.5C5.11929 19 4 17.8807 4 16.5Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </div>
                    
                    <h1 class="main-title" style="color: #ffffff; font-size: 28px; font-weight: 700; margin: 0 0 8px 0; letter-spacing: -0.5px;">New Contact Submission</h1>
                    <p style="color: rgba(255, 255, 255, 0.8); font-size: 16px; margin: 0; font-weight: 400;">Contact form inquiry received</p>
                  </div>
                </td>
              </tr>
              
              <!-- Main Content -->
              <tr>
                <td class="content-padding" style="padding: 48px 40px; background-color: #ffffff;">
                  
                  <!-- Alert Header -->
                  <div style="background: linear-gradient(145deg, #fffbeb 0%, #fef3c7 100%); border: 1px solid #fed7aa; border-radius: 8px; padding: 16px 20px; margin: 0 0 32px 0;">
                    <div style="display: flex; align-items: center;">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="#f59e0b" style="margin-right: 12px; flex-shrink: 0;">
                        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                      </svg>
                      <p style="color: #92400e; font-size: 14px; margin: 0; font-weight: 600;">New inquiry requires your attention</p>
                    </div>
                  </div>
                  
                  <!-- Contact Information Section -->
                  <div class="step-container" style="background: linear-gradient(145deg, #f8fafc 0%, #f1f5f9 100%); border: 1px solid #e5e7eb; border-radius: 12px; padding: 28px; margin: 32px 0; position: relative;">
                    
                    <!-- Accent border -->
                    <div style="position: absolute; left: 0; top: 0; bottom: 0; width: 4px; background: linear-gradient(180deg, #3b82f6 0%, #1d4ed8 100%); border-top-left-radius: 12px; border-bottom-left-radius: 12px;"></div>
                    
                    <h3 style="color: #111827; font-size: 18px; font-weight: 600; margin: 0 0 24px 0;">Contact Information</h3>
                    
                    <!-- Name -->
                    <div style="display: flex; align-items: center; margin-bottom: 16px; padding: 12px 16px; background: #ffffff; border-radius: 8px; border: 1px solid #e5e7eb;">
                      <div style="width: 32px; height: 32px; background: #dbeafe; border-radius: 6px; display: flex; align-items: center; justify-content: center; margin-right: 12px; flex-shrink: 0;">
                        <svg width="16" height="16" viewBox="0 0 20 20" fill="#3b82f6">
                          <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p style="color: #6b7280; font-size: 12px; margin: 0; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px;">Full Name</p>
                        <p style="color: #111827; font-size: 15px; margin: 0; font-weight: 600;">${firstName} ${lastName}</p>
                      </div>
                    </div>
                    
                    <!-- Email -->
                    <div style="display: flex; align-items: center; margin-bottom: 16px; padding: 12px 16px; background: #ffffff; border-radius: 8px; border: 1px solid #e5e7eb;">
                      <div style="width: 32px; height: 32px; background: #dcfce7; border-radius: 6px; display: flex; align-items: center; justify-content: center; margin-right: 12px; flex-shrink: 0;">
                        <svg width="16" height="16" viewBox="0 0 20 20" fill="#22c55e">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                      </div>
                      <div>
                        <p style="color: #6b7280; font-size: 12px; margin: 0; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px;">Email Address</p>
                        <p style="color: #111827; font-size: 15px; margin: 0; font-weight: 600;">${email}</p>
                      </div>
                    </div>
                    
                    <!-- Phone -->
                    <div style="display: flex; align-items: center; padding: 12px 16px; background: #ffffff; border-radius: 8px; border: 1px solid #e5e7eb;">
                      <div style="width: 32px; height: 32px; background: #fef3c7; border-radius: 6px; display: flex; align-items: center; justify-content: center; margin-right: 12px; flex-shrink: 0;">
                        <svg width="16" height="16" viewBox="0 0 20 20" fill="#f59e0b">
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                      </div>
                      <div>
                        <p style="color: #6b7280; font-size: 12px; margin: 0; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px;">Phone Number</p>
                        <p style="color: #111827; font-size: 15px; margin: 0; font-weight: 600;">${phoneNo}</p>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Message Section -->
                  <div style="margin: 32px 0;">
                    <h3 style="color: #111827; font-size: 18px; font-weight: 600; margin: 0 0 16px 0;">Message</h3>
                    <div style="background: #f9fafb; border-left: 4px solid #f59e0b; border-radius: 8px; padding: 20px 24px; margin: 0;">
                      <p style="color: #374151; font-size: 15px; margin: 0; line-height: 1.6; font-style: italic;">"${message}"</p>
                    </div>
                  </div>
                  
                  <!-- Database Information -->
                  <div style="background: linear-gradient(145deg, #f0f9ff 0%, #e0f2fe 100%); border: 1px solid #bae6fd; border-radius: 8px; padding: 20px; margin: 32px 0;">
                    <h3 style="color: #111827; font-size: 16px; font-weight: 600; margin: 0 0 12px 0;">System Information</h3>
                    <div style="display: flex; align-items: center;">
                      <svg width="16" height="16" viewBox="0 0 20 20" fill="#3b82f6" style="margin-right: 8px;">
                        <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z" clip-rule="evenodd" />
                      </svg>
                      <p style="color: #374151; font-size: 14px; margin: 0;">
                        <span style="font-weight: 500;">Database Entry ID:</span> 
                        <span style="font-family: 'SF Mono', Monaco, monospace; background: #dbeafe; color: #1d4ed8; padding: 4px 8px; border-radius: 4px; font-size: 13px; font-weight: 600; margin-left: 8px;">${
                          newInquiry._id
                        }</span>
                      </p>
                    </div>
                    <p style="color: #6b7280; font-size: 12px; margin: 8px 0 0 0;">Submitted on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
                  </div>
                  
                  <!-- Action required -->
                  <div style="border-top: 1px solid #e5e7eb; padding-top: 32px; margin-top: 40px; text-align: center;">
                    <p style="color: #374151; font-size: 16px; margin: 0;">
                      <strong>Action Required:</strong> Please respond to this inquiry promptly to maintain excellent customer service standards.
                    </p>
                  </div>
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td class="footer-padding" style="background: #f9fafb; border-top: 1px solid #e5e7eb; padding: 32px 40px; text-align: center;">
                  
                  <!-- Support section -->
                  <div style="margin-bottom: 24px;">
                    <p style="color: #6b7280; font-size: 14px; margin: 0 0 8px 0;">StudyNotion Internal Notification System</p>
                    <a href="mailto:help.studynotion.edu@gmail.com" style="color: #3b82f6; text-decoration: none; font-weight: 500; font-size: 14px;">help.studynotion.edu@gmail.com</a>
                  </div>
                  
                  <!-- Footer text -->
                  <div style="border-top: 1px solid #e5e7eb; padding-top: 20px;">
                    <p style="color: #9ca3af; font-size: 13px; margin: 0 0 8px 0;">© ${new Date().getFullYear()} StudyNotion. All rights reserved.</p>
                    <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                      This is an automated notification for internal use only.<br>
                      <a href="#" style="color: #6b7280; text-decoration: underline;">Admin Dashboard</a> | 
                      <a href="#" style="color: #6b7280; text-decoration: underline;">Contact Management</a>
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
