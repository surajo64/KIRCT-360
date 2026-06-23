import axios from 'axios';
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const HAMISU_SIG_PATH = path.join(__dirname, '..', 'public', 'signatures', 'hamisu_signature.png');
const BASHEER_SIG_PATH = path.join(__dirname, '..', 'public', 'signatures', 'basheer_signature.png');

const SEAL_IMAGE_URL = "https://res.cloudinary.com/dyii5iyqq/image/upload/v1756986671/logo_arebic.png";

/**
 * Draws geometric background patterns
 */
export const drawGeometricBackground = (doc, pageWidth, pageHeight) => {
    // Top-left corner
    doc.save()
        .moveTo(0, 0).lineTo(200, 0).lineTo(0, 200).fill("#001F3F") // Dark Navy
        .moveTo(0, 0).lineTo(150, 0).lineTo(0, 150).fill("#003366") // Slightly lighter navy
        .moveTo(0, 0).lineTo(80, 0).lineTo(0, 80).fill("#0074D9")   // Light blue tip
        .restore();

    // Bottom-right corner
    doc.save()
        .moveTo(pageWidth, pageHeight).lineTo(pageWidth - 200, pageHeight).lineTo(pageWidth, pageHeight - 200).fill("#001F3F")
        .moveTo(pageWidth, pageHeight).lineTo(pageWidth - 150, pageHeight).lineTo(pageWidth, pageHeight - 150).fill("#003366")
        .moveTo(pageWidth, pageHeight).lineTo(pageWidth - 80, pageHeight).lineTo(pageWidth, pageHeight - 80).fill("#0074D9")
        .restore();
};

/**
 * Fetches and draws the institutional logo
 */
export const drawLogo = async (doc, pageWidth) => {
    try {
        const logoResponse = await axios.get(SEAL_IMAGE_URL, {
            responseType: "arraybuffer",
            timeout: 5000,
        });
        const logoBuffer = Buffer.from(logoResponse.data, "binary");
        doc.image(logoBuffer, pageWidth / 2 - 35, 30, { width: 70 });
    } catch (error) {
        console.error("Certificate logo failed to load:", error.message);
    }
};

/**
 * Draws the institution header section
 */
export const drawInstitutionHeader = (doc, pageWidth) => {
    doc.moveDown(5.0);
    doc.font("Helvetica-Bold")
        .fontSize(24)
        .fillColor("#002147")
        .text("KANO INDEPENDENT RESEARCH CENTRE TRUST(KIRCT)", 0, 125, {
            align: "center",
            characterSpacing: 0.2,
        });

    doc.moveDown(0.3);
    doc.font("Helvetica-Oblique")
        .fontSize(18)
        .fillColor("#0056B3")
        .text("National Bioinformatics Workshop Series", {
            align: "center",
            characterSpacing: 2,
        });
};

/**
 * Draws the main certification text with refined layout
 */
export const drawCertificationText = (doc, user, course, today, pageWidth) => {
    doc.moveDown(1.5);
    doc.fontSize(16)
        .fillColor("#555")
        .font("Helvetica-Oblique")
        .text("On the Recommendation of the Faculty Certifies that", {
            align: "center",
        });

    // Recipient Name
    doc.moveDown(1.0);
    doc.fontSize(42)
        .fillColor("#000000")
        .font("Times-BoldItalic")
        .text(user.name, { align: "center" });

    // Name Underline
    const nameWidth = doc.widthOfString(user.name);
    const underlineY = doc.y - 2;
    doc.save()
        .moveTo(pageWidth / 2 - nameWidth / 2 - 30, underlineY)
        .lineTo(pageWidth / 2 + nameWidth / 2 + 30, underlineY)
        .lineWidth(2)
        .stroke("#0074D9")
        .restore();

    // Achievement text
    doc.moveDown(0.5);
    doc.fontSize(16)
        .fillColor("#333")
        .font("Helvetica")
        .text("Has successfully completed the one-week professional training course", { align: "center" });

    // Course Title
    doc.moveDown(0.3);
    doc.font("Helvetica-Bold")
        .fontSize(18)
        .fillColor("#000")
        .text(`"${course.courseTitle.toUpperCase()}"`, 80, doc.y, {
            align: "center",
            width: pageWidth - 160,
            lineGap: 4,
        });

    // Assessment text
    doc.moveDown(0.2);
    doc.fontSize(16)
        .fillColor("#333")
        .font("Helvetica-Bold") // Re-adding Bold as per original for assessment
        .text("and Passed the end of Course Assessment.", 0, doc.y, {
            align: "center",
            width: pageWidth
        });

    // Details (Location and Date)
    doc.moveDown(0.3);
    doc.font("Helvetica-Bold")
        .text("Held at KIRCT", 0, doc.y, {
            align: "center",
            width: pageWidth
        });

    // Dynamic Date Formatting (Month Year)
    let certDate = today;
    if (course.courseEndDate) {
        certDate = new Date(course.courseEndDate).toLocaleDateString("en-GB", {
            month: "long",
            year: "numeric"
        });
    } else {
        // Fallback to today but just month/year
        certDate = new Date().toLocaleDateString("en-GB", {
            month: "long",
            year: "numeric"
        });
    }

    doc.moveDown(0.2);
    doc.text(`${certDate}.`, 0, doc.y, {
        align: "center",
        width: pageWidth
    });
};

/**
 * Draws the professional red seal
 */
export const drawSeal = (doc, pageWidth, pageHeight) => {
    const sealX = pageWidth / 2;
    const sealY = pageHeight - 90; // Moved down (was -95)

    doc.save();
    const innerRadius = 50;
    const outerRadius = 60;
    const points = 50;

    doc.moveTo(sealX + outerRadius, sealY);
    for (let i = 0; i < points * 2; i++) {
        const angle = (i * Math.PI) / points;
        const radius = i % 2 === 0 ? outerRadius : innerRadius;
        doc.lineTo(sealX + radius * Math.cos(angle), sealY + radius * Math.sin(angle));
    }
    doc.fill("#C00000");
    doc.restore();
};

/**
 * Draws the signatories section
 */
export const drawSignatories = (doc, pageWidth, pageHeight) => {
    const sigY = pageHeight - 85;
    const margin = 130;
    const sigWidth = 210; // Increased width to prevent name wrapping

    // Left Signature - Program Coordinator (Dr. Basheer)
    try {
        doc.image(BASHEER_SIG_PATH, margin + (sigWidth / 2) - 60, sigY - 65, { width: 120 });
    } catch (error) {
        console.error("Basheer signature failed to load:", error.message);
    }

    doc.fontSize(12)
        .fillColor("#000")
        .font("Helvetica-Bold");
    doc.moveTo(margin, sigY).lineTo(margin + sigWidth, sigY).lineWidth(1).stroke("#000"); // Moved line to start at margin
    doc.text("Dr. Basheer Isah Waziri (MBBS, PhD)", margin, sigY + 10, {
        width: sigWidth,
        align: "center",
    });
    doc.fontSize(11)
        .font("Helvetica")
        .text("Program Coordinator", margin, sigY + 28, {
            width: sigWidth,
            align: "center",
        });

    // Right Signature - CEO/Director General (Prof. Hamisu)
    try {
        doc.image(HAMISU_SIG_PATH, (pageWidth - margin - sigWidth) + (sigWidth / 2) - 60, sigY - 65, { width: 120 });
    } catch (error) {
        console.error("Hamisu signature failed to load:", error.message);
    }

    const rightStartX = pageWidth - margin - sigWidth;
    doc.moveTo(rightStartX, sigY).lineTo(rightStartX + sigWidth, sigY).stroke("#000");
    doc.fontSize(12)
        .font("Helvetica-Bold")
        .text("Prof. Hamisu Salihu (M.D, PhD)", rightStartX, sigY + 10, {
            width: sigWidth,
            align: "center",
        });
    doc.fontSize(11)
        .font("Helvetica")
        .text("CEO/Director General", rightStartX, sigY + 28, {
            width: sigWidth,
            align: "center",
        });
};

/**
 * Draws the certificate ID footer
 */
export const drawCertificateFooter = (doc, pageWidth, certificateId) => {
    doc.fontSize(10)
        .fillColor("#777")
        .text(`ID: ${certificateId}`, pageWidth - 140, 30, {
            width: 110,
            align: "right"
        });
};

/**
 * Master function to build all certificate content
 */
export const buildCertificateContent = async (doc, user, course, certificateId, today) => {
    const pageWidth = doc.page.width;
    const pageHeight = doc.page.height;

    drawGeometricBackground(doc, pageWidth, pageHeight);
    await drawLogo(doc, pageWidth);
    drawInstitutionHeader(doc, pageWidth);
    drawCertificationText(doc, user, course, today, pageWidth);
    drawSeal(doc, pageWidth, pageHeight);
    drawSignatories(doc, pageWidth, pageHeight);
    drawCertificateFooter(doc, pageWidth, certificateId);
};

/**
 * Uploads a PDF buffer to Cloudinary with explicit .pdf extension
 * and updates the course progress record.
 */
export const uploadCertificateToCloudinary = (pdfBuffer, progress, certificateId) => {
    return new Promise((resolve, reject) => {
        let isPromiseDone = false;

        const uploadStream = cloudinary.uploader.upload_stream(
            {
                resource_type: "raw",
                folder: "certificates",
                public_id: certificateId + ".pdf",
                access_mode: "public",
            },
            async (err, result) => {
                if (isPromiseDone) return;
                if (err) {
                    isPromiseDone = true;
                    return reject(err);
                }
                isPromiseDone = true;
                progress.certificateUrl = result.secure_url;
                await progress.save();
                resolve({ certificateUrl: result.secure_url });
            }
        );

        streamifier.createReadStream(pdfBuffer).pipe(uploadStream);
    });
};

