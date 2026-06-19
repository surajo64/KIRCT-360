import PDFDocument from "pdfkit";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const SEAL_IMAGE_URL = "https://res.cloudinary.com/dyii5iyqq/image/upload/v1756986671/logo_arebic.png";

async function generateSampleCertificate() {
    const user = { name: "Ibrahim Mohammed" };
    const course = { courseTitle: "Bioinformatics" };
    const certificateId = uuidv4().slice(0, 8).toUpperCase();
    const today = new Date().toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    const doc = new PDFDocument({
        size: "A4",
        layout: "landscape",
        margins: { top: 0, left: 0, right: 0, bottom: 0 },
    });

    const outputFilePath = "sample_certificate.pdf";
    const stream = fs.createWriteStream(outputFilePath);
    doc.pipe(stream);

    const pageWidth = doc.page.width;
    const pageHeight = doc.page.height;

    // --- Background Design ---
    doc.save()
        .moveTo(0, 0)
        .lineTo(120, 0)
        .lineTo(0, 120)
        .fill("#001F3F");

    doc.moveTo(pageWidth, 0)
        .lineTo(pageWidth - 80, 0)
        .lineTo(pageWidth, 80)
        .fill("#001F3F");

    doc.moveTo(0, pageHeight)
        .lineTo(150, pageHeight)
        .lineTo(0, pageHeight - 150)
        .fill("#001F3F");

    doc.moveTo(0, pageHeight)
        .lineTo(180, pageHeight)
        .lineTo(0, pageHeight - 180)
        .opacity(0.3)
        .fill("#0074D9");
    doc.restore();

    doc.save()
        .moveTo(pageWidth, pageHeight)
        .lineTo(pageWidth - 120, pageHeight)
        .lineTo(pageWidth, pageHeight - 120)
        .fill("#001F3F");
    doc.restore();

    // --- Content Layer ---

    try {
        const logoResponse = await axios.get(SEAL_IMAGE_URL, { responseType: "arraybuffer" });
        const logoBuffer = Buffer.from(logoResponse.data, "binary");
        doc.image(logoBuffer, pageWidth / 2 - 40, 40, { width: 80 });
    } catch (e) {
        console.warn("Logo failed to load");
    }

    doc.fontSize(20).fillColor("#001F3F").font("Helvetica-Bold");
    doc.text("KANO INDEPENDENT RESEARCH CENTRE TRUST", 0, 130, { align: "center" });

    doc.moveDown(0.8);
    doc.fontSize(28).fillColor("#000").font("Helvetica-Bold");
    doc.text("CERTIFICATE OF ATTENDANCE", { align: "center", characterSpacing: 1 });

    doc.moveDown(1.2);
    doc.fontSize(14).fillColor("#555").font("Helvetica");
    doc.text("Presented to :", { align: "center" });

    doc.moveDown(0.5);
    doc.fontSize(38).fillColor("#000").font("Times-Bold");
    doc.text(user.name.toUpperCase(), { align: "center" });

    doc.moveDown(1.5);
    doc.fontSize(16).fillColor("#333").font("Helvetica");
    const courseInfo = `For completing a training on ${course.courseTitle}, held on ${today}.`;
    doc.text(courseInfo, 80, doc.y, {
        align: "center",
        width: pageWidth - 160,
        lineGap: 4
    });

    const sealX = pageWidth - 180;
    const sealY = pageHeight - 200;
    doc.save();
    doc.circle(sealX, sealY, 45).fill("#C00000");
    doc.circle(sealX, sealY, 40).lineWidth(2).stroke("#FFF");
    doc.restore();

    const sigY = pageHeight - 120;
    const sigWidth = 220;

    doc.fontSize(12).fillColor("#000").font("Helvetica-Bold");
    doc.moveTo(100, sigY).lineTo(100 + sigWidth, sigY).stroke();
    doc.text("Basheer Isah Waziri (MBBS, PhD)", 100, sigY + 10, { width: sigWidth, align: "center" });
    doc.fontSize(10).fillColor("#555").font("Helvetica");
    doc.text("Program Coordinator", 100, sigY + 25, { width: sigWidth, align: "center" });

    doc.fontSize(12).fillColor("#000").font("Helvetica-Bold");
    doc.moveTo(pageWidth - 320, sigY).lineTo(pageWidth - 100, sigY).stroke();
    doc.text("Prof. Hamisu Salihu (M.D, PhD)", pageWidth - 320, sigY + 10, { width: sigWidth, align: "center" });
    doc.fontSize(10).fillColor("#555").font("Helvetica");
    doc.text("CEO/Director General", pageWidth - 320, sigY + 25, { width: sigWidth, align: "center" });

    doc.fontSize(8).fillColor("#999").text(`Certificate ID: ${certificateId}`, 50, pageHeight - 30);

    doc.end();

    stream.on("finish", () => {
        console.log(`Certificate generated: ${outputFilePath}`);
    });
}

generateSampleCertificate();
