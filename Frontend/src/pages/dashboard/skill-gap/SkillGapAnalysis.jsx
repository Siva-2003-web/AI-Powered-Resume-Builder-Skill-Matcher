import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { AIChatSession } from "@/Services/AiModel";
import { toast } from "sonner";
import { LoaderCircle, Sparkles, CheckCircle2, XCircle, ArrowLeft } from "lucide-react";
import { useSelector } from "react-redux";
import { getAllResumeData, getDemoResumes } from "@/Services/resumeAPI";
import { useNavigate } from "react-router-dom";

const SKILL_GAP_PROMPT = `You are a career advisor AI. Analyze how well the candidate's skills match the job requirements.

**Candidate's Current Skills:**
{userSkills}

**Target Job Description:**
{jobDescription}

Analyze carefully and respond ONLY with a JSON object in this exact format:
{
  "matchingSkills": ["skill1", "skill2"],
  "missingSkills": ["skill3", "skill4"],
  "matchPercentage": 65,
  "recommendations": [
    {"skill": "skill3", "suggestion": "Take an online course on..."},
    {"skill": "skill4", "suggestion": "Practice by building..."}
  ],
  "summary": "Brief 2-3 sentence analysis of the candidate's fit for this role"
}

Be thorough in your analysis. Match percentage should reflect how well the candidate's skills cover what's needed for the job.`;

function SkillGapAnalysis() {
  const navigate = useNavigate();
  const [jobDescription, setJobDescription] = useState("");
  const [userSkills, setUserSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchingSkills, setFetchingSkills] = useState(true);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [selectedResumeId, setSelectedResumeId] = useState("");
  const [resumeList, setResumeList] = useState([]);

  // Fetch user's resumes on mount
  useEffect(() => {
    const fetchResumes = async () => {
      try {
        // Fetch both user resumes and demo resumes
        const [userResponse, demoResponse] = await Promise.all([
          getAllResumeData(),
          getDemoResumes()
        ]);
        
        const userResumes = userResponse.data || [];
        const demoResumes = demoResponse.data || [];
        
        // Combine resumes with demo resumes at the end
        const allResumes = [...userResumes, ...demoResumes];
        setResumeList(allResumes);
        
        if (allResumes.length > 0) {
          setSelectedResumeId(allResumes[0]._id);
          setUserSkills(allResumes[0].skills || []);
        }
      } catch (error) {
        console.error("Error fetching resumes:", error);
        toast("Error fetching resumes");
      } finally {
        setFetchingSkills(false);
      }
    };
    fetchResumes();
  }, []);

  // Update skills when resume selection changes
  const handleResumeChange = (e) => {
    const resumeId = e.target.value;
    setSelectedResumeId(resumeId);
    const selectedResume = resumeList.find((r) => r._id === resumeId);
    if (selectedResume) {
      setUserSkills(selectedResume.skills || []);
    }
    setAnalysisResult(null);
  };

  const analyzeSkillGap = async () => {
    if (!jobDescription.trim()) {
      toast("Please enter a job description");
      return;
    }

    if (!userSkills || userSkills.length === 0) {
      toast("No skills found in selected resume. Please add skills first.");
      return;
    }

    setLoading(true);
    setAnalysisResult(null);

    const skillsString = userSkills.map((s) => s.name).join(", ");
    const prompt = SKILL_GAP_PROMPT
      .replace("{userSkills}", skillsString)
      .replace("{jobDescription}", jobDescription);

    try {
      const result = await AIChatSession.sendMessage(prompt);
      const responseText = result.response.text();
      console.log("Skill Gap Analysis Response:", responseText);

      const parsed = JSON.parse(responseText);
      setAnalysisResult(parsed);
      toast("Analysis complete!");
    } catch (error) {
      console.error("Error analyzing skills:", error);
      if (error.message.includes("404") || error.message.includes("not found")) {
        toast.error("API Key Error: Model not enabled. Please check your Google Cloud Console.");
      } else {
        toast.error("Error analyzing skills: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10 md:px-20 lg:px-32">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" onClick={() => navigate("/dashboard")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h2 className="font-bold text-3xl">Skill Gap Analysis</h2>
          <p className="text-gray-500">
            Compare your skills against a job description to identify gaps
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Column - Input */}
        <div className="space-y-6">
          {/* Resume Selector */}
          <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4">
            <h3 className="font-bold text-lg mb-3">1. Select Your Resume</h3>
            {fetchingSkills ? (
              <div className="flex items-center gap-2 text-gray-500">
                <LoaderCircle className="animate-spin h-4 w-4" />
                Loading resumes...
              </div>
            ) : (
              <select
                className="w-full p-2 border rounded-lg"
                value={selectedResumeId}
                onChange={handleResumeChange}
              >
                {resumeList.map((resume) => (
                  <option key={resume._id} value={resume._id}>
                    {resume.isDemo ? "🌟 DEMO: " : ""}{resume.title || resume.firstName + "'s Resume"}
                  </option>
                ))}
              </select>
            )}

            {/* Display current skills */}
            {userSkills && userSkills.length > 0 && (
              <div className="mt-4">
                <p className="text-sm text-gray-500 mb-2">Your current skills:</p>
                <div className="flex flex-wrap gap-2">
                  {userSkills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Job Description Input */}
          <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4">
            <h3 className="font-bold text-lg mb-3">2. Paste Job Description</h3>
            <Textarea
              placeholder="Paste the full job description here..."
              className="min-h-[200px]"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
          </div>

          {/* Analyze Button */}
          <Button
            className="w-full"
            size="lg"
            onClick={analyzeSkillGap}
            disabled={loading}
          >
            {loading ? (
              <>
                <LoaderCircle className="animate-spin mr-2 h-4 w-4" />
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Analyze Skill Gap
              </>
            )}
          </Button>
        </div>

        {/* Right Column - Results */}
        <div>
          {!analysisResult && !loading && (
            <div className="h-full flex items-center justify-center border-2 border-dashed rounded-lg p-10">
              <p className="text-gray-400 text-center">
                Your analysis results will appear here after you click "Analyze Skill Gap"
              </p>
            </div>
          )}

          {loading && (
            <div className="h-full flex items-center justify-center border-2 border-dashed rounded-lg p-10">
              <div className="text-center">
                <LoaderCircle className="animate-spin h-12 w-12 mx-auto text-primary mb-4" />
                <p className="text-gray-500">Analyzing your skills against the job requirements...</p>
              </div>
            </div>
          )}

          {analysisResult && (
            <div className="space-y-6">
              {/* Match Percentage */}
              <div className="p-5 shadow-lg rounded-lg bg-gradient-to-r from-primary/10 to-primary/5">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-lg">Match Score</h3>
                  <span
                    className={`text-4xl font-bold ${
                      analysisResult.matchPercentage >= 70
                        ? "text-green-600"
                        : analysisResult.matchPercentage >= 50
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {analysisResult.matchPercentage}%
                  </span>
                </div>
                <p className="text-gray-600 mt-2">{analysisResult.summary}</p>
              </div>

              {/* Matching Skills */}
              <div className="p-5 shadow-lg rounded-lg border-l-4 border-l-green-500">
                <h3 className="font-bold text-lg flex items-center gap-2 text-green-700">
                  <CheckCircle2 className="h-5 w-5" />
                  Matching Skills ({analysisResult.matchingSkills?.length || 0})
                </h3>
                <div className="flex flex-wrap gap-2 mt-3">
                  {analysisResult.matchingSkills?.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                  {(!analysisResult.matchingSkills || analysisResult.matchingSkills.length === 0) && (
                    <p className="text-gray-500">No matching skills found</p>
                  )}
                </div>
              </div>

              {/* Missing Skills */}
              <div className="p-5 shadow-lg rounded-lg border-l-4 border-l-red-500">
                <h3 className="font-bold text-lg flex items-center gap-2 text-red-700">
                  <XCircle className="h-5 w-5" />
                  Missing Skills ({analysisResult.missingSkills?.length || 0})
                </h3>
                <div className="flex flex-wrap gap-2 mt-3">
                  {analysisResult.missingSkills?.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                  {(!analysisResult.missingSkills || analysisResult.missingSkills.length === 0) && (
                    <p className="text-gray-500">No skill gaps found!</p>
                  )}
                </div>
              </div>

              {/* Recommendations */}
              {analysisResult.recommendations && analysisResult.recommendations.length > 0 && (
                <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4">
                  <h3 className="font-bold text-lg mb-3">Recommendations</h3>
                  <div className="space-y-3">
                    {analysisResult.recommendations.map((rec, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg">
                        <p className="font-semibold text-primary">{rec.skill}</p>
                        <p className="text-gray-600 text-sm">{rec.suggestion}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SkillGapAnalysis;
