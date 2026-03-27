import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const senderEmail = process.env.SENDER_EMAIL;

export const sendEmail = async (to, subject, html) => {
    const msg = {
        to,
        from: senderEmail,
        subject,
        html,
    };

    try {
        await sgMail.send(msg);
        console.log(`Email sent to ${to}`);
    } catch (error) {
        console.error('Error sending email:', error);
        if (error.response) {
            console.error(error.response.body);
        }
    }
};

export const sendSubmissionEmail = async (name, email, targetArea, type) => {
    const isInternship = type.toLowerCase().includes("internship");
    const subject = `Application Received: ${targetArea} ${type}`;
    const html = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <h2 style="color: #004d99;">Application Submitted Successfully</h2>
            <p>Dear ${name},</p>
            <p>Thank you for applying for ${isInternship ? 'an' : 'a'} <strong>${type}</strong> ${isInternship ? 'in the department of' : 'for the position of'}: <strong>${targetArea}</strong> at KIRCT. Your application has been successfully submitted and is currently being reviewed by our team.</p>
            <p>We will contact you soon regarding the status of your application.</p>
            <p>Best regards,<br>KIRCT Admissions Team</p>
            <hr>
            <p style="font-size: 0.8em; color: #777;">This is an automated notification. Please do not reply to this email.</p>
        </div>
    `;
    await sendEmail(email, subject, html);
};

export const sendInterviewEmail = async (name, email, type, interviewDate, interviewTime, interviewVenue) => {
    console.log("INTERNAL: sendInterviewEmail", { name, email, type, interviewDate, interviewTime, interviewVenue });
    const subject = `Interview Invitation: ${type} Application`;
    const html = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <h2 style="color: #004d99;">Interview Invitation</h2>
            <p>Dear ${name},</p>
            <p>We are pleased to inform you that your <strong>${type}</strong> application has been shortlisted. We would like to invite you for an interview to discuss your application further.</p>
            <div style="background-color: #f9f9f9; padding: 15px; border-left: 5px solid #004d99; margin: 20px 0;">
                <p style="margin: 0;"><strong>Date:</strong> ${interviewDate || "To be communicated"}</p>
                <p style="margin: 0;"><strong>Time:</strong> ${interviewTime || "To be communicated"}</p>
                <p style="margin: 0;"><strong>Venue:</strong> ${interviewVenue || "To be communicated"}</p>
            </div>
            <p>Please ensure you are available at the scheduled time. If you have any questions, feel free to contact us.</p>
            <p>Best regards,<br>KIRCT Admissions Team</p>
            <hr>
            <p style="font-size: 0.8em; color: #777;">This is an automated notification. Please do not reply to this email.</p>
        </div>
    `;
    await sendEmail(email, subject, html);
};

export const sendRejectionEmail = async (name, email, type) => {
    const subject = `Application Status: ${type} Application`;
    const html = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <h2 style="color: #004d99;">Application Update</h2>
            <p>Dear ${name},</p>
            <p>Thank you for your interest in the <strong>${type}</strong> position at KIRCT. After careful consideration, we regret to inform you that we will not be moving forward with your application at this time.</p>
            <p>We appreciate the time and effort you put into your application and wish you the best in your future endeavors.</p>
            <p>Best regards,<br>KIRCT Admissions Team</p>
            <hr>
            <p style="font-size: 0.8em; color: #777;">This is an automated notification. Please do not reply to this email.</p>
        </div>
    `;
    await sendEmail(email, subject, html);
};

export const sendApprovalEmail = async (name, email, type, startDate) => {
    const subject = `Congratulations! Application Approved: ${type}`;
    const html = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <h2 style="color: #00802b;">Congratulations!</h2>
            <p>Dear ${name},</p>
            
            <p>We are excited to inform you that your <strong>${type}</strong> application has been <strong>Approved</strong>!</p>
            
            <div style="background-color: #f0fff4; padding: 15px; border-left: 5px solid #00802b; margin: 20px 0;">
                <p style="margin: 0;"><strong>Expected Start Date:</strong> <span style="font-size: 1.1em; color: #00802b;">${startDate || "To be communicated"}</span></p>
                <p style="margin: 10px 0 0 0; font-weight: bold; color: #d9534f;">
                    IMPORTANT: Please ensure you come prepared to complete all necessary documentation on this date.
                </p>
            </div>

            <p>Please ensure all relevant documents (Original Credentials, ID, etc.) are ready for submission on your starting date.</p>
            <p> Once again Welcome to the KIRCT team</p>
            <p>Best regards,<br>KIRCT Admissions Team</p>
            <hr>
            <p style="font-size: 0.8em; color: #777;">This is an automated notification. Please do not reply to this email.</p>
        </div>
    `;
    await sendEmail(email, subject, html);
};

// ─── Course Enrollment Emails ────────────────────────────────────────────────

/**
 * Sent to the student after successful payment / enrollment.
 */
export const sendEnrollmentConfirmationEmail = async ({
  studentName,
  studentEmail,
  courseTitle,
  courseMode,
  attendanceType,
  courseAddress,
  meetingUrl,
  classSchedule,
  amount,
}) => {
  const isPhysical = attendanceType === 'Physical';
  const isVirtual = attendanceType === 'Virtual';

  const venueBlock = isPhysical
    ? `<p style="margin:0"><strong>📍 Venue:</strong> ${courseAddress || 'To be communicated'}</p>`
    : isVirtual
    ? `<p style="margin:0"><strong>🔗 Meeting Link:</strong> <a href="${meetingUrl}" target="_blank">${meetingUrl || 'To be communicated'}</a></p>`
    : '';

  const subject = `✅ Enrollment Confirmed – ${courseTitle}`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 620px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
      <div style="background: #004d99; padding: 24px 32px;">
        <h1 style="color: #ffffff; margin: 0; font-size: 22px;">Enrollment Confirmed!</h1>
      </div>
      <div style="padding: 24px 32px; color: #333;">
        <p>Dear <strong>${studentName}</strong>,</p>
        <p>You have successfully enrolled in the following course at <strong>KIRCT</strong>. Welcome aboard!</p>

        <div style="background: #f4f8ff; border-left: 5px solid #004d99; padding: 16px; border-radius: 4px; margin: 20px 0;">
          <p style="margin:0 0 8px 0; font-size: 18px; font-weight: bold; color: #004d99;">${courseTitle}</p>
          <p style="margin:0"><strong>📚 Mode:</strong> ${courseMode}</p>
          <p style="margin:0"><strong>🎓 Attendance:</strong> ${attendanceType}</p>
          ${venueBlock}
          <p style="margin:0"><strong>🕒 Schedule:</strong> ${classSchedule || 'To be communicated'}</p>
          <p style="margin:0"><strong>💳 Amount Paid:</strong> ₦${Number(amount).toLocaleString()}</p>
        </div>

        <p>Please ensure you arrive on time and bring any requested materials. If you have any questions, do not hesitate to contact our team.</p>
        <p>We look forward to seeing you!</p>
        <p>Best regards,<br><strong>KIRCT Training Team</strong></p>
      </div>
      <div style="background: #f0f0f0; padding: 12px 32px; font-size: 12px; color: #888; text-align: center;">
        This is an automated notification. Please do not reply to this email.
      </div>
    </div>
  `;
  await sendEmail(studentEmail, subject, html);
};

/**
 * Sent to the course educator / admin after a student successfully enrolls.
 */
export const sendEnrollmentNotificationEmail = async ({
  educatorName,
  educatorEmail,
  studentName,
  studentEmail,
  courseTitle,
  attendanceType,
  amount,
}) => {
  const subject = `🎓 New Enrollment – ${courseTitle}`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 620px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
      <div style="background: #00802b; padding: 24px 32px;">
        <h1 style="color: #ffffff; margin: 0; font-size: 22px;">New Student Enrolled</h1>
      </div>
      <div style="padding: 24px 32px; color: #333;">
        <p>Dear <strong>${educatorName}</strong>,</p>
        <p>A new student has enrolled in your course.</p>

        <div style="background: #f4fff6; border-left: 5px solid #00802b; padding: 16px; border-radius: 4px; margin: 20px 0;">
          <p style="margin:0 0 8px 0; font-size: 16px; font-weight: bold; color: #00802b;">Enrollment Details</p>
          <p style="margin:0"><strong>📗 Course:</strong> ${courseTitle}</p>
          <p style="margin:0"><strong>👤 Student:</strong> ${studentName}</p>
          <p style="margin:0"><strong>📧 Student Email:</strong> ${studentEmail}</p>
          <p style="margin:0"><strong>🎓 Attendance Type:</strong> ${attendanceType}</p>
          <p style="margin:0"><strong>💳 Amount Paid:</strong> ₦${Number(amount).toLocaleString()}</p>
        </div>

        <p>You can view and manage this student's progress from the Educator Dashboard.</p>
        <p>Best regards,<br><strong>KIRCT System</strong></p>
      </div>
      <div style="background: #f0f0f0; padding: 12px 32px; font-size: 12px; color: #888; text-align: center;">
        This is an automated notification. Please do not reply to this email.
      </div>
    </div>
  `;
  await sendEmail(educatorEmail, subject, html);
};
