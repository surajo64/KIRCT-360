
import PDFDocument from "pdfkit";
import fs from "fs";
import { buildCertificateContent } from "./utils/certificateHelper.js";

async function testGeneration() {
    const user = { name: "Surajo Umar Danja" };
    const course = {
        courseTitle: "PHASE-I: HANDS-ON BASIC BIOINFORMATICS TRAINING",
        courseEndDate: new Date("2026-06-30")
    };
    const certificateId = "TEST-1234";
    const today = "21 June 2026";

    const doc = new PDFDocument({
        size: "A4",
        layout: "landscape",
        margins: { top: 0, left: 0, right: 0, bottom: 0 },
    });

    const outputFilePath = "./test_certificate_refined.pdf";
    const stream = fs.createWriteStream(outputFilePath);
    doc.pipe(stream);

    console.log("Building certificate content...");
    try {
        await buildCertificateContent(doc, user, course, certificateId, today);
        doc.end();
        console.log("Certificate stream ended.");
    } catch (err) {
        console.error("Failed to build certificate:", err);
        process.exit(1);
    }

    stream.on("finish", () => {
        console.log(`Test certificate generated: ${outputFilePath}`);
        process.exit(0);
    });
}

testGeneration();
