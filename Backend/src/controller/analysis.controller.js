import mammoth from "mammoth";
import fs from "fs";
import * as mupdf from "mupdf";

// Extract text from PDF using mupdf
const extractPdfText = async (filePath) => {
  try {
    const fileData = fs.readFileSync(filePath);
    const doc = mupdf.Document.openDocument(fileData, "application/pdf");
    
    let text = "";
    const pageCount = doc.countPages();
    
    for (let i = 0; i < pageCount; i++) {
      const page = doc.loadPage(i);
      const pageText = page.toStructuredText("preserve-whitespace").asText();
      text += pageText + "\n";
    }
    
    return text;
  } catch (error) {
    console.error("MuPDF error:", error);
    throw new Error("Failed to parse PDF: " + error.message);
  }
};

export const extractText = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { mimetype, path: filePath } = req.file;
    let text = "";

    console.log("Processing file:", filePath, "Type:", mimetype);

    if (mimetype === "application/pdf") {
      text = await extractPdfText(filePath);
    } else if (
      mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      const result = await mammoth.extractRawText({ path: filePath });
      text = result.value;
    } else {
      // Cleanup file
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      return res.status(400).json({
        message: "Unsupported file type. Only PDF and DOCX are supported.",
      });
    }

    // Cleanup file
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Clean up extracted text
    text = text.replace(/\s+/g, " ").trim();

    console.log("Extracted text length:", text.length);
    console.log("First 200 chars:", text.substring(0, 200));

    if (!text || text.length < 5) {
      return res.status(400).json({
        message: "Could not extract meaningful text from the file. The file might be image-based or corrupted. Please try a different file.",
      });
    }

    return res.status(200).json({ text });
  } catch (error) {
    console.error("Error extracting text:", error);
    // Cleanup file if it exists
    if (req.file && req.file.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    return res.status(500).json({ 
      message: "Error parsing file", 
      error: error.message 
    });
  }
};
