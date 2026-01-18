import { useState } from "react";
import { Upload, Loader, FileText, Sparkles, AlertCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createNewResume, updateThisResume } from "@/Services/resumeAPI";
import { useNavigate } from "react-router-dom";
import { AIChatSession } from "@/Services/AiModel";
import { toast } from "sonner";
import axios from "axios";
import { VITE_API_URL } from "@/config/config";
import resumeTemplates from "@/data/resumeTemplates";

// AI prompt to extract structured resume data from text
const RESUME_PARSER_PROMPT = `You are an expert resume parser. Extract structured information from the following resume text.

Resume Text:
{resumeText}

Parse this resume and respond ONLY with a JSON object in this exact format:
{
  "firstName": "First name",
  "lastName": "Last name",
  "email": "email@example.com",
  "phone": "Phone number",
  "address": "City, State or full address",
  "jobTitle": "Current/Target job title",
  "summary": "Professional summary (if found, otherwise create a brief 2-3 sentence summary based on experience)",
  "githubUrl": "GitHub URL if found",
  "linkedinUrl": "LinkedIn URL if found",
  "websiteUrl": "Personal website if found",
  "experience": [
    {
      "title": "Job Title",
      "companyName": "Company Name",
      "city": "City",
      "state": "State",
      "startDate": "Start date (format: YYYY-MM or Month Year)",
      "endDate": "End date or Present",
      "currentlyWorking": "true or false",
      "workSummary": "Job responsibilities and achievements as HTML bullet points like <ul><li>Achievement 1</li><li>Achievement 2</li></ul>"
    }
  ],
  "education": [
    {
      "universityName": "University/College Name",
      "degree": "Degree Type (e.g., Bachelor of Science)",
      "major": "Field of Study",
      "startDate": "Start Year",
      "endDate": "End Year or Expected",
      "grade": "GPA/CGPA/Percentage if mentioned",
      "gradeType": "CGPA, GPA, or Percentage"
    }
  ],
  "skills": [
    {"name": "Skill 1", "rating": 4},
    {"name": "Skill 2", "rating": 3}
  ],
  "projects": [
    {
      "projectName": "Project Name",
      "techStack": "Technologies used",
      "projectSummary": "Project description as HTML"
    }
  ],
  "certifications": [
    {
      "certificationName": "Certification Name",
      "issuingOrganization": "Issuing Organization",
      "issueDate": "Issue Date",
      "expirationDate": "Expiration Date if any",
      "credentialId": "Credential ID if any",
      "credentialUrl": "Verification URL if any"
    }
  ]
}

Important:
- Extract ALL information you can find
- For missing fields, use empty strings ""
- For arrays, use empty arrays [] if no data found
- Rate skills 1-5 based on context (senior=5, mentioned=3, basic=2)
- Format dates consistently
- If no summary exists, generate one based on experience
- Parse work experience bullet points into HTML format`;

function UploadResume() {
  const [isDialogOpen, setOpenDialog] = useState(false);
  const [resumeTitle, setResumeTitle] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState(resumeTemplates[0]);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [parsingStatus, setParsingStatus] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const validTypes = [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ];
      
      if (!validTypes.includes(file.type)) {
        toast.error("Please upload a PDF or DOCX file.");
        return;
      }
      
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size should be less than 5MB.");
        return;
      }
      
      setUploadedFile(file);
      setError("");
      
      // Auto-generate title from filename
      const nameWithoutExt = file.name.replace(/\.[^/.]+$/, "");
      setResumeTitle(nameWithoutExt + " Resume");
    }
  };

  const parseAndCreateResume = async () => {
    if (!uploadedFile) {
      toast.error("Please upload a resume file first.");
      return;
    }
    
    if (!resumeTitle.trim()) {
      toast.error("Please enter a title for your resume.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Step 1: Extract text from the uploaded file
      setParsingStatus("Extracting text from resume...");
      
      const formData = new FormData();
      formData.append("resume", uploadedFile);
      
      let apiUrl = VITE_API_URL || "http://localhost:5001";
      if (apiUrl.endsWith('/')) {
        apiUrl = apiUrl.slice(0, -1);
      }
      
      const uploadRes = await axios.post(`${apiUrl}/api/analysis/extract-text`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      
      const resumeText = uploadRes.data.text;
      
      if (!resumeText || resumeText.length < 50) {
        throw new Error("Could not extract enough text from the resume. Please ensure the file is not image-based.");
      }

      // Step 2: Use AI to parse the resume text into structured data
      setParsingStatus("Analyzing resume with AI...");
      
      const prompt = RESUME_PARSER_PROMPT.replace("{resumeText}", resumeText);
      const result = await AIChatSession.sendMessage(prompt);
      const responseText = result.response.text();
      
      // Clean and parse the JSON response
      const cleanedText = responseText.replace(/```json/g, "").replace(/```/g, "").trim();
      let parsedData;
      
      try {
        parsedData = JSON.parse(cleanedText);
      } catch (parseError) {
        console.error("JSON Parse Error:", parseError);
        console.log("Raw response:", responseText);
        throw new Error("Failed to parse resume data. Please try again.");
      }

      // Step 3: Create a new resume with the parsed data
      setParsingStatus("Creating your editable resume...");
      
      const createData = {
        data: {
          title: resumeTitle,
          themeColor: selectedTemplate.themeColor,
          templateId: selectedTemplate.id,
        },
      };
      
      const createRes = await createNewResume(createData);
      const newResumeId = createRes.data.resume._id;

      // Step 4: Update the resume with parsed data
      setParsingStatus("Populating resume data...");
      
      const updateData = {
        data: {
          firstName: parsedData.firstName || "",
          lastName: parsedData.lastName || "",
          email: parsedData.email || "",
          phone: parsedData.phone || "",
          address: parsedData.address || "",
          jobTitle: parsedData.jobTitle || "",
          summary: parsedData.summary || "",
          githubUrl: parsedData.githubUrl || "",
          linkedinUrl: parsedData.linkedinUrl || "",
          websiteUrl: parsedData.websiteUrl || "",
          experience: parsedData.experience || [],
          education: parsedData.education || [],
          skills: parsedData.skills || [],
          projects: parsedData.projects || [],
          certifications: parsedData.certifications || [],
        },
      };
      
      await updateThisResume(newResumeId, updateData);

      toast.success("Resume parsed successfully! You can now edit it.");
      
      // Navigate to the edit page
      navigate(`/dashboard/edit-resume/${newResumeId}`);
      
    } catch (error) {
      console.error("Error parsing resume:", error);
      const errorMessage = error.response?.data?.message || error.message;
      setError(errorMessage);
      toast.error("Error: " + errorMessage);
    } finally {
      setLoading(false);
      setParsingStatus("");
    }
  };

  const resetDialog = () => {
    setUploadedFile(null);
    setResumeTitle("");
    setError("");
    setParsingStatus("");
    setSelectedTemplate(resumeTemplates[0]);
  };

  return (
    <>
      <div
        className="group relative p-8 flex flex-col items-center justify-center rounded-2xl h-[300px] cursor-pointer
          bg-gradient-to-br from-green-500/5 via-emerald-50/50 to-teal-50/50
          dark:from-green-500/10 dark:via-emerald-900/20 dark:to-teal-900/20
          border-2 border-dashed border-green-500/30 dark:border-green-500/40
          hover:border-green-500 hover:border-solid
          hover:shadow-lg hover:shadow-green-500/10
          transition-all duration-300 ease-out
          hover:-translate-y-1"
        onClick={() => {
          resetDialog();
          setOpenDialog(true);
        }}
      >
        {/* Background Glow */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-green-500/0 to-green-500/0 group-hover:from-green-500/5 group-hover:to-emerald-500/5 transition-all duration-300" />
        
        {/* Icon Container */}
        <div className="relative z-10 mb-4 p-4 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg shadow-green-500/30 group-hover:shadow-green-500/50 group-hover:scale-110 transition-all duration-300">
          <Upload className="h-8 w-8 text-white" />
        </div>
        
        {/* Text */}
        <h3 className="relative z-10 font-semibold text-lg text-foreground group-hover:text-green-600 transition-colors duration-300">
          Upload Resume
        </h3>
        <p className="relative z-10 text-sm text-muted-foreground mt-1 text-center">
          Import & edit existing resume
        </p>
      </div>

      <Dialog open={isDialogOpen}>
        <DialogContent setOpenDialog={setOpenDialog} className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg">
                <Upload className="h-5 w-5 text-white" />
              </div>
              <DialogTitle className="text-xl">Upload & Edit Resume</DialogTitle>
            </div>
            <DialogDescription className="text-base">
              Upload your existing resume (PDF or DOCX). We&apos;ll use AI to parse it and make it fully editable.
            </DialogDescription>
          </DialogHeader>

          {/* File Upload Area */}
          <div className="mt-4">
            <label className="text-sm font-medium mb-2 block">Upload Resume File</label>
            <div 
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer
                ${uploadedFile ? 'border-green-500 bg-green-50 dark:bg-green-950/20' : 'border-gray-300 hover:border-primary'}
                ${loading ? 'pointer-events-none opacity-60' : ''}`}
              onClick={() => !loading && document.getElementById('resume-upload-input').click()}
            >
              <input 
                type="file" 
                id="resume-upload-input" 
                className="hidden" 
                accept=".pdf,.docx"
                onChange={handleFileChange}
                disabled={loading}
              />
              {uploadedFile ? (
                <div className="flex flex-col items-center gap-2">
                  <FileText className="h-10 w-10 text-green-600" />
                  <span className="font-medium text-green-700">{uploadedFile.name}</span>
                  <span className="text-sm text-green-600">
                    ({(uploadedFile.size / 1024).toFixed(1)} KB) - Click to change
                  </span>
                </div>
              ) : (
                <>
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600 font-medium">Click to upload PDF or DOCX</p>
                  <p className="text-sm text-gray-400 mt-1">Maximum file size: 5MB</p>
                </>
              )}
            </div>
          </div>
          
          {/* Resume Title Input */}
          <div className="mt-4">
            <label className="text-sm font-medium mb-2 block">Resume Title</label>
            <Input
              className="h-12 text-base"
              type="text"
              placeholder="Ex: My Professional Resume"
              value={resumeTitle}
              onChange={(e) => setResumeTitle(e.target.value.trimStart())}
              disabled={loading}
            />
          </div>

          {/* Template Selection */}
          <div className="mt-4">
            <label className="text-sm font-medium mb-2 block">Choose Template</label>
            <div className="grid grid-cols-5 gap-2">
              {resumeTemplates.map((template) => (
                <div
                  key={template.id}
                  onClick={() => !loading && setSelectedTemplate(template)}
                  className={`cursor-pointer rounded-lg border-2 p-2 transition-all hover:shadow-md text-center ${
                    selectedTemplate.id === template.id
                      ? 'border-primary shadow-md bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  } ${loading ? 'pointer-events-none opacity-60' : ''}`}
                >
                  <div 
                    className="w-full h-8 rounded flex items-center justify-center text-xl mb-1"
                    style={{ backgroundColor: `${template.themeColor}20` }}
                  >
                    {template.icon}
                  </div>
                  <p className="text-xs font-medium truncate">{template.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Parsing Status */}
          {loading && parsingStatus && (
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg flex items-center gap-3">
              <Loader className="h-5 w-5 animate-spin text-blue-600" />
              <div>
                <p className="font-medium text-blue-700 dark:text-blue-400">{parsingStatus}</p>
                <p className="text-sm text-blue-600 dark:text-blue-500">This may take a moment...</p>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-4 bg-red-50 dark:bg-red-950/30 rounded-lg flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-red-700 dark:text-red-400">Error</p>
                <p className="text-sm text-red-600 dark:text-red-500">{error}</p>
              </div>
            </div>
          )}

          {/* Info Box */}
          <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-950/30 rounded-lg">
            <div className="flex items-start gap-3">
              <Sparkles className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-amber-700 dark:text-amber-400">AI-Powered Parsing</p>
                <p className="text-sm text-amber-600 dark:text-amber-500">
                  We&apos;ll extract your personal info, experience, education, skills, projects, and certifications. 
                  You can review and edit everything after parsing.
                </p>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="gap-3 flex justify-end mt-6">
            <Button 
              variant="outline" 
              onClick={() => setOpenDialog(false)}
              className="px-6"
              disabled={loading}
            >
              Cancel
            </Button>
            <Button 
              onClick={parseAndCreateResume} 
              disabled={!uploadedFile || !resumeTitle.trim() || loading}
              className="px-6 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-500/90 hover:to-emerald-600/90"
            >
              {loading ? (
                <>
                  <Loader className="animate-spin h-5 w-5 mr-2" />
                  Processing...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Parse & Edit Resume
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default UploadResume;
