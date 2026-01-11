import { AIChatSession } from "./AiModel";

const RESUME_PARSE_PROMPT = `You are a resume parser. Extract the following information from the resume text and return it as a JSON object. If any field is not found, leave it as an empty string or empty array.

Return ONLY a valid JSON object with this exact structure (no markdown, no explanation):
{
  "firstName": "",
  "lastName": "",
  "jobTitle": "",
  "address": "",
  "phone": "",
  "email": "",
  "summary": "",
  "experience": [
    {
      "title": "",
      "companyName": "",
      "city": "",
      "state": "",
      "startDate": "",
      "endDate": "",
      "workSummary": ""
    }
  ],
  "education": [
    {
      "universityName": "",
      "degree": "",
      "major": "",
      "startDate": "",
      "endDate": "",
      "description": ""
    }
  ],
  "skills": [
    {
      "name": "",
      "rating": 80
    }
  ],
  "projects": [
    {
      "name": "",
      "description": "",
      "technologies": "",
      "link": ""
    }
  ]
}

Resume Text:
`;

// Extract text from PDF using pdf.js with dynamic import
export async function extractTextFromPDF(file) {
  // Dynamically import pdfjs-dist and set worker
  const pdfjsLib = await import("pdfjs-dist");
  
  // Set worker source to a compatible CDN version
  pdfjsLib.GlobalWorkerOptions.workerSrc = 
    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
  
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = async (event) => {
      try {
        const typedArray = new Uint8Array(event.target.result);
        
        const pdf = await pdfjsLib.getDocument(typedArray).promise;
        let fullText = "";
        
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          const pageText = textContent.items.map((item) => item.str).join(" ");
          fullText += pageText + "\n";
        }
        
        resolve(fullText);
      } catch (error) {
        console.error("PDF extraction error:", error);
        // Fallback: Try basic text extraction
        try {
          const text = await extractTextBasic(file);
          resolve(text);
        } catch {
          reject(error);
        }
      }
    };
    
    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });
}

// Basic text extraction fallback
async function extractTextBasic(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        // Try to get any readable text from the file
        const arrayBuffer = e.target.result;
        const uint8Array = new Uint8Array(arrayBuffer);
        const decoder = new TextDecoder("utf-8", { fatal: false });
        let text = decoder.decode(uint8Array);
        
        // Clean up binary garbage and keep readable text
        text = text
          .replace(/[^\x20-\x7E\n\r\t]/g, " ")
          .replace(/\s+/g, " ")
          .trim();
        
        resolve(text);
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
}

// Extract text from Word document
export async function extractTextFromWord(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = async (event) => {
      try {
        const arrayBuffer = event.target.result;
        const uint8Array = new Uint8Array(arrayBuffer);
        
        let text = "";
        const decoder = new TextDecoder("utf-8", { fatal: false });
        const content = decoder.decode(uint8Array);
        
        // Extract text from DOCX XML content
        const textMatches = content.match(/<w:t[^>]*>([^<]*)<\/w:t>/g);
        if (textMatches && textMatches.length > 0) {
          text = textMatches
            .map((match) => match.replace(/<[^>]+>/g, ""))
            .join(" ");
        } else {
          // Fallback: extract readable ASCII characters
          text = content
            .replace(/[^\x20-\x7E\n\r]/g, " ")
            .replace(/\s+/g, " ")
            .trim();
        }
        
        resolve(text);
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });
}

// Parse resume text using AI
export async function parseResumeWithAI(text) {
  try {
    // Trim text if too long (AI has token limits)
    const trimmedText = text.length > 8000 ? text.substring(0, 8000) : text;
    
    const prompt = RESUME_PARSE_PROMPT + trimmedText;
    const result = await AIChatSession.sendMessage(prompt);
    const responseText = await result.response.text();
    
    // Clean up the response - remove markdown code blocks if present
    let cleanedResponse = responseText
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();
    
    // Parse the JSON
    const parsedData = JSON.parse(cleanedResponse);
    return parsedData;
  } catch (error) {
    console.error("AI parsing error:", error);
    throw new Error("Failed to parse resume with AI");
  }
}

// Main function to parse a resume file
export async function parseResumeFile(file) {
  const fileType = file.type;
  let extractedText = "";
  
  console.log("Parsing file:", file.name, "Type:", fileType);
  
  if (fileType === "application/pdf") {
    extractedText = await extractTextFromPDF(file);
  } else if (
    fileType === "application/msword" ||
    fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    extractedText = await extractTextFromWord(file);
  } else {
    throw new Error("Unsupported file type");
  }
  
  console.log("Extracted text length:", extractedText.length);
  console.log("Extracted text preview:", extractedText.substring(0, 500));
  
  if (!extractedText || extractedText.trim().length < 20) {
    throw new Error("Could not extract enough text from the file");
  }
  
  // Parse with AI
  const parsedResume = await parseResumeWithAI(extractedText);
  return parsedResume;
}
