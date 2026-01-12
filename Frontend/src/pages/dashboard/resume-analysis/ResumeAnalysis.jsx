import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AIChatSession } from "@/Services/AiModel";
import { toast } from "sonner";
import { LoaderCircle, Upload, FileText, CheckCircle, AlertCircle, ArrowLeft, RotateCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { VITE_API_URL } from "@/config/config";

const ANALYSIS_PROMPT = `You are an expert HR and Resume Analyst. Analyze the following resume text and provide constructive feedback.
Resume Text:
{resumeText}

Provide a detailed analysis in the following JSON format ONLY:
{
  "score": 0, // Overall score out of 100
  "summary": "Professional summary of the candidate",
  "strengths": ["List of strong points"],
  "weaknesses": ["List of weak points or gaps"],
  "improvements": ["Actionable suggestions to improve the resume"],
  "skills_analysis": "Detailed feedback on the skills section",
  "experience_analysis": "Detailed feedback on the experience section"
}
Ensure the score is realistic based on industry standards.
`;

function ResumeAnalysis() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState("upload"); // upload, analyzing, result
  const [analysis, setAnalysis] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      const fileType = selectedFile.type;
      const validTypes = [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ];

      if (!validTypes.includes(fileType)) {
        toast.error("Please upload a PDF or DOCX file.");
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        const selectedFile = e.dataTransfer.files[0];
        const fileType = selectedFile.type;
        const validTypes = [
          "application/pdf",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ];
  
        if (!validTypes.includes(fileType)) {
          toast.error("Please upload a PDF or DOCX file.");
          return;
        }
        setFile(selectedFile);
    }
  };

  const analyzeResume = async () => {
    if (!file) {
        toast.error("Please select a file first.");
        return;
    }

    setLoading(true);
    setStep("analyzing");
    setAnalysis(null);

    try {
      // 1. Extract Text
      const formData = new FormData();
      formData.append("resume", file);
      
      // Use direct URL or configured one
      let apiUrl = VITE_API_URL || "http://localhost:5001"; // Fallback
      if (apiUrl.endsWith('/')) {
        apiUrl = apiUrl.slice(0, -1);
      }
      
      const uploadRes = await axios.post(`${apiUrl}/api/analysis/extract-text`, formData, {
        headers: { 
            "Content-Type": "multipart/form-data" 
        }
      });
      
      const text = uploadRes.data.text;
      
      if (!text || text.length < 50) {
        throw new Error("Could not extract enough text from the resume.");
      }

      // 2. Analyze with AI
      const prompt = ANALYSIS_PROMPT.replace("{resumeText}", text);
      const result = await AIChatSession.sendMessage(prompt);
      const responseText = result.response.text();
      
      // Attempt to clean markdown json wrapping if present
      const cleanedText = responseText.replace(/```json/g, "").replace(/```/g, "").trim();
      
      const jsonResponse = JSON.parse(cleanedText);
      
      setAnalysis(jsonResponse);
      setStep("result");
      toast.success("Resume analyzed successfully!");
      
    } catch (error) {
      console.error("Analysis Error:", error);
      toast.error(error.message || "Analysis failed. Please try again.");
      setStep("upload");
    } finally {
      setLoading(false);
    }
  };

  const resetAnalysis = () => {
    setFile(null);
    setAnalysis(null);
    setStep("upload");
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="p-10 md:px-20 lg:px-32 bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
            <Button variant="outline" size="icon" onClick={() => navigate("/dashboard")}>
                <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
                <h2 className="font-bold text-3xl">AI Resume Analysis</h2>
                <p className="text-gray-500">Upload your existing resume for a comprehensive AI review</p>
            </div>
        </div>

        <div className="max-w-4xl mx-auto">
            
            {/* Upload Step */}
            {step === "upload" && (
                <div 
                    className="bg-white rounded-xl shadow-lg p-10 border-2 border-dashed border-gray-300 text-center hover:border-primary transition-colors"
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                >
                    <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Upload className="h-10 w-10 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Upload your Resume</h3>
                    <p className="text-gray-500 mb-6">Drag & drop or browse to upload (PDF, DOCX)</p>
                    
                    <input 
                        type="file" 
                        id="resume-upload" 
                        className="hidden" 
                        accept=".pdf,.docx"
                        onChange={handleFileChange}
                    />
                    
                    {!file ? (
                        <label htmlFor="resume-upload">
                            <Button className="cursor-pointer" asChild>
                                <span>Browse Files</span>
                            </Button>
                        </label>
                    ) : (
                        <div className="flex items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-2">
                             <div className="flex items-center gap-2 p-3 bg-gray-100 rounded-lg">
                                <FileText className="h-5 w-5 text-gray-600" />
                                <span className="font-medium">{file.name}</span>
                                <span className="text-xs text-gray-500">({(file.size / 1024).toFixed(1)} KB)</span>
                            </div>
                            <Button onClick={analyzeResume} disabled={loading}>
                                {loading && <LoaderCircle className="animate-spin mr-2 h-4 w-4" />}
                                Start Analysis
                            </Button>
                            <Button variant="ghost" onClick={() => setFile(null)} size="icon">
                                <AlertCircle className="h-4 w-4 text-red-500" />
                            </Button>
                        </div>
                    )}
                </div>
            )}

            {/* Analyzing Step */}
            {step === "analyzing" && (
                <div className="bg-white rounded-xl shadow-lg p-16 text-center">
                    <LoaderCircle className="animate-spin h-16 w-16 text-primary mx-auto mb-6" />
                    <h3 className="text-2xl font-bold mb-2">Analyzing Resume...</h3>
                    <p className="text-gray-500">Our AI is reading your resume and identifying strengths & weaknesses.</p>
                </div>
            )}

            {/* Result Step */}
            {step === "result" && analysis && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                    {/* Overview Card */}
                    <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col md:flex-row items-center justify-between gap-6 border-l-4 border-l-primary">
                        <div>
                            <h3 className="text-2xl font-bold mb-2">Analysis Report</h3>
                            <p className="text-gray-600 max-w-xl">{analysis.summary}</p>
                        </div>
                        <div className="text-center min-w-[150px]">
                            <div className="text-sm text-gray-500 uppercase tracking-wider font-semibold mb-1">Resume Score</div>
                            <div className={`text-6xl font-bold ${getScoreColor(analysis.score)}`}>
                                {analysis.score}
                            </div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Strengths */}
                        <div className="bg-white rounded-xl shadow p-6">
                            <h4 className="font-bold text-lg mb-4 flex items-center gap-2 text-green-700">
                                <CheckCircle className="h-5 w-5" /> Strengths
                            </h4>
                            <ul className="space-y-2">
                                {analysis.strengths.map((item, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                                        <span className="mt-1 block h-1.5 w-1.5 rounded-full bg-green-500" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Weaknesses */}
                        <div className="bg-white rounded-xl shadow p-6">
                            <h4 className="font-bold text-lg mb-4 flex items-center gap-2 text-red-700">
                                <AlertCircle className="h-5 w-5" /> Areas for Improvement
                            </h4>
                            <ul className="space-y-2">
                                {analysis.weaknesses.map((item, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                                        <span className="mt-1 block h-1.5 w-1.5 rounded-full bg-red-500" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Detailed Analysis */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white rounded-xl shadow p-6">
                             <h4 className="font-bold text-lg mb-3">Skills Analysis</h4>
                             <p className="text-gray-700 text-sm leading-relaxed">{analysis.skills_analysis}</p>
                        </div>
                        <div className="bg-white rounded-xl shadow p-6">
                             <h4 className="font-bold text-lg mb-3">Experience Analysis</h4>
                             <p className="text-gray-700 text-sm leading-relaxed">{analysis.experience_analysis}</p>
                        </div>
                    </div>

                    {/* Action Items */}
                    <div className="bg-blue-50 rounded-xl shadow p-6 border border-blue-100">
                        <h4 className="font-bold text-lg mb-4 text-blue-800">Recommended Improvements</h4>
                        <div className="space-y-3">
                            {analysis.improvements.map((item, i) => (
                                <div key={i} className="flex items-center gap-3 bg-white p-3 rounded-lg border border-blue-100/50">
                                    <div className="bg-blue-100 text-blue-600 w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0">
                                        {i + 1}
                                    </div>
                                    <span className="text-blue-900 text-sm">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-center pt-6">
                        <Button onClick={resetAnalysis} variant="outline" className="gap-2">
                            <RotateCcw className="h-4 w-4" /> Analyze Another Resume
                        </Button>
                    </div>
                </div>
            )}
        </div>
    </div>
  );
}

export default ResumeAnalysis;
