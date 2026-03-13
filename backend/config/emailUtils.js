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
