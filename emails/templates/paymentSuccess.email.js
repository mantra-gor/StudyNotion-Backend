const { ASSETS } = require("../../config/constants");

exports.paymentSuccess = (
  name,
  razorpay_order_id,
  razorpay_payment_id,
  amount
) => {
  const logo = ASSETS.LOGO_LARGE;
  const amountInRupees = (amountInPaise / 100).toFixed(2);
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <title>Payment Successful - StudyNotion</title>
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
          .amount { font-size: 28px !important; }
        }
        
        @media only screen and (max-width: 480px) {
          .content-padding { padding: 24px 20px !important; }
          .header-padding { padding: 24px 20px !important; }
          .footer-padding { padding: 24px 20px !important; }
          .button-padding { padding: 14px 24px !important; }
          .main-title { font-size: 20px !important; }
          .greeting { font-size: 18px !important; }
          .amount { font-size: 24px !important; }
        }
      </style>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f8fafc; line-height: 1.6;">
      
      <!-- Preheader text for email preview -->
      <div style="display: none; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #f8fafc;">
        Payment successful! Amount: ₹${amountInRupees}. Your StudyNotion course access is now active.
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
                    
                    <!-- Payment success icon -->
                    <div style="width: 56px; height: 56px; background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); border-radius: 50%; margin: 0 auto 20px auto; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 16px rgba(34, 197, 94, 0.3);">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </div>
                    
                    <h1 class="main-title" style="color: #ffffff; font-size: 28px; font-weight: 700; margin: 0 0 8px 0; letter-spacing: -0.5px;">Payment Successful!</h1>
                    <p style="color: rgba(255, 255, 255, 0.8); font-size: 16px; margin: 0; font-weight: 400;">Your transaction has been completed</p>
                  </div>
                </td>
              </tr>
              
              <!-- Main Content -->
              <tr>
                <td class="content-padding" style="padding: 48px 40px; background-color: #ffffff;">
                  
                  <!-- Congratulations message -->
                  <h2 class="greeting" style="color: #111827; font-size: 24px; font-weight: 600; margin: 0 0 16px 0;">Congratulations ${name}! 🎉</h2>
                  
                  <p style="color: #374151; font-size: 16px; margin: 0 0 32px 0; line-height: 1.6;">
                    Your payment has been successfully processed. Welcome to your new learning journey with StudyNotion!
                  </p>
                  
                  <!-- Payment Details Section -->
                  <div class="step-container" style="background: linear-gradient(145deg, #f0fdf4 0%, #ecfdf5 100%); border: 1px solid #bbf7d0; border-radius: 12px; padding: 28px; margin: 32px 0; position: relative;">
                    
                    <!-- Accent border -->
                    <div style="position: absolute; left: 0; top: 0; bottom: 0; width: 4px; background: linear-gradient(180deg, #22c55e 0%, #16a34a 100%); border-top-left-radius: 12px; border-bottom-left-radius: 12px;"></div>
                    
                    <h3 style="color: #111827; font-size: 18px; font-weight: 600; margin: 0 0 24px 0;">Payment Details</h3>
                    
                    <!-- Amount paid -->
                    <div style="text-align: center; margin: 24px 0; padding: 20px; background: #ffffff; border-radius: 8px; border: 1px solid #d1fae5;">
                      <p style="color: #6b7280; font-size: 14px; margin: 0 0 8px 0; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px;">Amount Paid</p>
                      <p class="amount" style="color: #22c55e; font-size: 32px; font-weight: 700; margin: 0; font-family: 'SF Mono', Monaco, monospace;">₹${amountInRupees}</p>
                    </div>
                    
                    <!-- Transaction details -->
                    <div style="display: flex; flex-direction: column; gap: 16px;">
                      <!-- Order ID -->
                      <div style="display: flex; align-items: center; padding: 12px 16px; background: #ffffff; border-radius: 8px; border: 1px solid #e5e7eb;">
                        <div style="width: 32px; height: 32px; background: #dbeafe; border-radius: 6px; display: flex; align-items: center; justify-content: center; margin-right: 12px; flex-shrink: 0;">
                          <svg width="16" height="16" viewBox="0 0 20 20" fill="#3b82f6">
                            <path fill-rule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clip-rule="evenodd" />
                          </svg>
                        </div>
                        <div style="min-width: 0; flex: 1;">
                          <p style="color: #6b7280; font-size: 12px; margin: 0; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px;">Order ID</p>
                          <p style="color: #111827; font-size: 14px; margin: 0; font-weight: 600; font-family: 'SF Mono', Monaco, monospace; word-break: break-all;">${razorpay_order_id}</p>
                        </div>
                      </div>
                      
                      <!-- Payment ID -->
                      <div style="display: flex; align-items: center; padding: 12px 16px; background: #ffffff; border-radius: 8px; border: 1px solid #e5e7eb;">
                        <div style="width: 32px; height: 32px; background: #dcfce7; border-radius: 6px; display: flex; align-items: center; justify-content: center; margin-right: 12px; flex-shrink: 0;">
                          <svg width="16" height="16" viewBox="0 0 20 20" fill="#22c55e">
                            <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                          </svg>
                        </div>
                        <div style="min-width: 0; flex: 1;">
                          <p style="color: #6b7280; font-size: 12px; margin: 0; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px;">Payment ID</p>
                          <p style="color: #111827; font-size: 14px; margin: 0; font-weight: 600; font-family: 'SF Mono', Monaco, monospace; word-break: break-all;">${razorpay_payment_id}</p>
                        </div>
                      </div>
                      
                      <!-- Transaction date -->
                      <div style="display: flex; align-items: center; padding: 12px 16px; background: #ffffff; border-radius: 8px; border: 1px solid #e5e7eb;">
                        <div style="width: 32px; height: 32px; background: #fef3c7; border-radius: 6px; display: flex; align-items: center; justify-content: center; margin-right: 12px; flex-shrink: 0;">
                          <svg width="16" height="16" viewBox="0 0 20 20" fill="#f59e0b">
                            <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <p style="color: #6b7280; font-size: 12px; margin: 0; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px;">Transaction Date</p>
                          <p style="color: #111827; font-size: 14px; margin: 0; font-weight: 600;">${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Next steps -->
                  <div style="background: linear-gradient(145deg, #f0f9ff 0%, #e0f2fe 100%); border: 1px solid #bae6fd; border-radius: 12px; padding: 28px; margin: 32px 0;">
                    <h3 style="color: #111827; font-size: 18px; font-weight: 600; margin: 0 0 20px 0;">What's Next?</h3>
                    
                    <!-- Bullet Point 1 -->
                    <div style="display: flex; align-items: flex-start; margin-bottom: 16px;">
                      <div style="width: 8px; height: 8px; background: #3b82f6; border-radius: 50%; margin-right: 16px; flex-shrink: 0; margin-top: 8px;"></div>
                      <p style="color: #374151; font-size: 15px; margin: 0; line-height: 1.5;">Access your purchased courses immediately from your dashboard</p>
                    </div>
                    
                    <!-- Bullet Point 2 -->
                    <div style="display: flex; align-items: flex-start;">
                      <div style="width: 8px; height: 8px; background: #22c55e; border-radius: 50%; margin-right: 16px; flex-shrink: 0; margin-top: 8px;"></div>
                      <p style="color: #374151; font-size: 15px; margin: 0; line-height: 1.5;">Start learning and track your progress with our comprehensive tools</p>
                    </div>
                  </div>
                  
                  <!-- CTA Section -->
                  <div style="text-align: center; margin: 40px 0;">
                    <p style="color: #374151; font-size: 16px; margin: 0 0 24px 0; line-height: 1.6;">
                      Ready to start your learning journey? Access your courses now!
                    </p>
                    
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center">
                      <tr>
                        <td style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); border-radius: 8px; box-shadow: 0 4px 16px rgba(59, 130, 246, 0.3);">
                          <a href="https://studynotion.mantragor.com/dashboard" class="button-padding" style="display: inline-block; color: #ffffff; text-decoration: none; padding: 18px 32px; font-size: 16px; font-weight: 600; border-radius: 8px; transition: all 0.2s ease;">
                            Go to My Courses →
                          </a>
                        </td>
                      </tr>
                    </table>
                  </div>
                  
                  <!-- Receipt note -->
                  <div style="background: #fffbeb; border: 1px solid #fed7aa; border-radius: 8px; padding: 20px; margin: 32px 0;">
                    <div style="display: flex; align-items: flex-start;">
                      <div style="margin-right: 12px; flex-shrink: 0;">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="#f59e0b">
                          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p style="color: #92400e; font-size: 14px; font-weight: 600; margin: 0 0 8px 0;">Important</p>
                        <p style="color: #78350f; font-size: 13px; margin: 0; line-height: 1.4;">
                          Please save this email as your payment receipt. You can also download your invoice from your account dashboard at any time.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Thank you message -->
                  <div style="border-top: 1px solid #e5e7eb; padding-top: 32px; margin-top: 40px; text-align: center;">
                    <p style="color: #374151; font-size: 16px; margin: 0 0 16px 0; line-height: 1.6;">
                      Thank you for choosing StudyNotion! We're excited to be part of your learning journey.
                    </p>
                    
                    <p style="color: #374151; font-size: 16px; margin: 0; font-weight: 500;">
                      Happy Learning!<br>
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
                    <p style="color: #6b7280; font-size: 14px; margin: 0 0 8px 0;">Questions about your purchase? Contact our support team</p>
                    <a href="mailto:help.studynotion.edu@gmail.com" style="color: #3b82f6; text-decoration: none; font-weight: 500; font-size: 14px;">help.studynotion.edu@gmail.com</a>
                  </div>
                  
                  <!-- Footer text -->
                  <div style="border-top: 1px solid #e5e7eb; padding-top: 20px;">
                    <p style="color: #9ca3af; font-size: 13px; margin: 0 0 8px 0;">© ${new Date().getFullYear()} StudyNotion. All rights reserved.</p>
                    <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                      This is an automated message. Please do not reply to this email.<br>
                      <a href="#" style="color: #6b7280; text-decoration: underline;">View Invoice</a> | 
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
