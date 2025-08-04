const { ASSETS } = require("../../config/constants");

exports.courseEnrollmentSuccess = (name, courseName, enrollmentDate) => {
  const logo = ASSETS.LOGO_LARGE;
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <title>Congratulations on Your Enrollment - StudyNotion</title>
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
        Congratulations! You've successfully enrolled in ${courseName}. Start learning now!
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
                    
                    <!-- Graduation cap icon -->
                    <div style="width: 56px; height: 56px; background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); border-radius: 50%; margin: 0 auto 20px auto; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 16px rgba(139, 92, 246, 0.3);">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 3L1 9L12 15L21 10.09V17H23V9L12 3ZM5 13.18V17.18C5 17.97 8.58 20 12 20C15.42 20 19 17.97 19 17.18V13.18L12 17L5 13.18Z" fill="white"/>
                      </svg>
                    </div>
                    
                    <h1 class="main-title" style="color: #ffffff; font-size: 28px; font-weight: 700; margin: 0 0 8px 0; letter-spacing: -0.5px;">Congratulations!</h1>
                    <p style="color: rgba(255, 255, 255, 0.8); font-size: 16px; margin: 0; font-weight: 400;">You're officially enrolled and ready to learn</p>
                  </div>
                </td>
              </tr>
              
              <!-- Main Content -->
              <tr>
                <td class="content-padding" style="padding: 48px 40px; background-color: #ffffff;">
                  
                  <!-- Celebratory Greeting -->
                  <h2 class="greeting" style="color: #111827; font-size: 24px; font-weight: 600; margin: 0 0 16px 0;">Amazing news, ${name}! 🎉</h2>
                  
                  <p style="color: #374151; font-size: 16px; margin: 0 0 32px 0; line-height: 1.6;">
                    You have successfully enrolled in your selected courses! Your learning journey begins now, and we're thrilled to have you as part of the StudyNotion community.
                  </p>
                  
                  <!-- Course Information Section -->
                  <div class="step-container" style="background: linear-gradient(145deg, #f3f4f6 0%, #e5e7eb 100%); border: 1px solid #d1d5db; border-radius: 12px; padding: 28px; margin: 32px 0; position: relative;">
                    
                    <!-- Accent border -->
                    <div style="position: absolute; left: 0; top: 0; bottom: 0; width: 4px; background: linear-gradient(180deg, #8b5cf6 0%, #7c3aed 100%); border-top-left-radius: 12px; border-bottom-left-radius: 12px;"></div>
                    
                    <h3 style="color: #111827; font-size: 18px; font-weight: 600; margin: 0 0 20px 0;">Enrollment Details</h3>
                    
                    <!-- Course name -->
                    <div style="display: flex; align-items: center; margin-bottom: 16px; padding: 12px 16px; background: #ffffff; border-radius: 8px; border: 1px solid #e5e7eb;">
                      <div style="width: 32px; height: 32px; background: #ddd6fe; border-radius: 6px; display: flex; align-items: center; justify-content: center; margin-right: 12px; flex-shrink: 0;">
                        <svg width="16" height="16" viewBox="0 0 20 20" fill="#8b5cf6">
                          <path d="M9 12L11 14L15 10M3 5L5 3L7 5M3 11L5 9L7 11M3 17L5 15L7 17M17 6H21M17 12H21M17 18H21" />
                        </svg>
                      </div>
                      <div>
                        <p style="color: #6b7280; font-size: 12px; margin: 0; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px;">Course Name</p>
                        <p style="color: #111827; font-size: 15px; margin: 0; font-weight: 600;">${
                          courseName || "Your Selected Courses"
                        }</p>
                      </div>
                    </div>
                    
                    <!-- Enrollment date -->
                    <div style="display: flex; align-items: center; padding: 12px 16px; background: #ffffff; border-radius: 8px; border: 1px solid #e5e7eb;">
                      <div style="width: 32px; height: 32px; background: #dcfce7; border-radius: 6px; display: flex; align-items: center; justify-content: center; margin-right: 12px; flex-shrink: 0;">
                        <svg width="16" height="16" viewBox="0 0 20 20" fill="#22c55e">
                          <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p style="color: #6b7280; font-size: 12px; margin: 0; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px;">Enrollment Date</p>
                        <p style="color: #111827; font-size: 15px; margin: 0; font-weight: 600;">${
                          enrollmentDate || new Date().toLocaleDateString()
                        }</p>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Getting Started Guide -->
                  <div style="background: linear-gradient(145deg, #f0f9ff 0%, #e0f2fe 100%); border: 1px solid #bae6fd; border-radius: 12px; padding: 28px; margin: 32px 0;">
                    <h3 style="color: #111827; font-size: 18px; font-weight: 600; margin: 0 0 20px 0;">Getting Started</h3>
                    
                    <!-- Bullet Point 1 -->
                    <div style="display: flex; align-items: flex-start; margin-bottom: 16px;">
                      <div style="width: 8px; height: 8px; background: #3b82f6; border-radius: 50%; margin-right: 16px; flex-shrink: 0; margin-top: 8px;"></div>
                      <p style="color: #374151; font-size: 15px; margin: 0; line-height: 1.5;">Access your course dashboard and explore the curriculum</p>
                    </div>
                    
                    <!-- Bullet Point 2 -->
                    <div style="display: flex; align-items: flex-start; margin-bottom: 16px;">
                      <div style="width: 8px; height: 8px; background: #10b981; border-radius: 50%; margin-right: 16px; flex-shrink: 0; margin-top: 8px;"></div>
                      <p style="color: #374151; font-size: 15px; margin: 0; line-height: 1.5;">Start with the first lesson and track your progress</p>
                    </div>
                    
                    <!-- Bullet Point 3 -->
                    <div style="display: flex; align-items: flex-start;">
                      <div style="width: 8px; height: 8px; background: #8b5cf6; border-radius: 50%; margin-right: 16px; flex-shrink: 0; margin-top: 8px;"></div>
                      <p style="color: #374151; font-size: 15px; margin: 0; line-height: 1.5;">Join our community and connect with fellow learners</p>
                    </div>
                  </div>
                  
                  <!-- CTA Section -->
                  <div style="text-align: center; margin: 40px 0;">
                    <p style="color: #374151; font-size: 16px; margin: 0 0 24px 0; line-height: 1.6;">
                      Your learning adventure starts now! Access your courses and begin your journey to success.
                    </p>
                    
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center">
                      <tr>
                        <td style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); border-radius: 8px; box-shadow: 0 4px 16px rgba(139, 92, 246, 0.3);">
                          <a href="https://studynotion.mantragor.com/dashboard" class="button-padding" style="display: inline-block; color: #ffffff; text-decoration: none; padding: 18px 32px; font-size: 16px; font-weight: 600; border-radius: 8px; transition: all 0.2s ease;">
                            Start Learning Now →
                          </a>
                        </td>
                      </tr>
                    </table>
                  </div>
                  
                  <!-- Success tips -->
                  <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 20px; margin: 32px 0;">
                    <div style="display: flex; align-items: flex-start;">
                      <div style="margin-right: 12px; flex-shrink: 0;">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="#22c55e">
                          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p style="color: #166534; font-size: 14px; font-weight: 600; margin: 0 0 8px 0;">Pro Learning Tips</p>
                        <ul style="color: #166534; font-size: 13px; margin: 0; padding-left: 16px; line-height: 1.5;">
                          <li>Set aside dedicated time for learning each day</li>
                          <li>Take notes and practice regularly</li>
                          <li>Engage with the community and ask questions</li>
                          <li>Complete assignments and projects to reinforce learning</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Thank you message -->
                  <div style="border-top: 1px solid #e5e7eb; padding-top: 32px; margin-top: 40px; text-align: center;">
                    <p style="color: #374151; font-size: 16px; margin: 0 0 16px 0; line-height: 1.6;">
                      We're excited to support you on this learning journey. Remember, every expert was once a beginner!
                    </p>
                    
                    <p style="color: #374151; font-size: 16px; margin: 0; font-weight: 500;">
                      Happy Learning!<br>
                      <span style="color: #8b5cf6; font-weight: 600;">The StudyNotion Team</span>
                    </p>
                  </div>
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td class="footer-padding" style="background: #f9fafb; border-top: 1px solid #e5e7eb; padding: 32px 40px; text-align: center;">
                  
                  <!-- Support section -->
                  <div style="margin-bottom: 24px;">
                    <p style="color: #6b7280; font-size: 14px; margin: 0 0 8px 0;">Need help with your courses? Contact our support team</p>
                    <a href="mailto:help.studynotion.edu@gmail.com" style="color: #3b82f6; text-decoration: none; font-weight: 500; font-size: 14px;">help.studynotion.edu@gmail.com</a>
                  </div>
                  
                  <!-- Footer text -->
                  <div style="border-top: 1px solid #e5e7eb; padding-top: 20px;">
                    <p style="color: #9ca3af; font-size: 13px; margin: 0 0 8px 0;">© ${new Date().getFullYear()} StudyNotion. All rights reserved.</p>
                    <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                      This is an automated message. Please do not reply to this email.<br>
                      <a href="#" style="color: #6b7280; text-decoration: underline;">Course Support</a> | 
                      <a href="#" style="color: #6b7280; text-decoration: underline;">Learning Resources</a>
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
