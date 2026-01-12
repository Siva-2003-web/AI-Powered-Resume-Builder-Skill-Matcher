import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AIChatSession } from "@/Services/AiModel";
import { toast } from "sonner";
import { LoaderCircle, Sparkles, ArrowLeft, TrendingUp, BookOpen, Briefcase, GraduationCap } from "lucide-react";
import { getAllResumeData, getDemoResumes } from "@/Services/resumeAPI";
import { useNavigate } from "react-router-dom";

const JOB_MATCH_PROMPT = `You are an expert HR recruiter and career advisor. Analyze how well this resume matches the job description.

**Resume Data:**
Name: {name}
Job Title: {jobTitle}
Summary: {summary}
Skills: {skills}
Experience: {experience}
Education: {education}
Projects: {projects}

**Job Description:**
{jobDescription}

Provide a comprehensive analysis and respond ONLY with a JSON object in this exact format:
{
  "overallScore": 72,
  "breakdown": {
    "skills": { 
      "score": 65, 
      "feedback": "Specific feedback about skills match",
      "strengths": ["strength1", "strength2"],
      "gaps": ["gap1", "gap2"]
    },
    "experience": { 
      "score": 80, 
      "feedback": "Specific feedback about experience relevance",
      "strengths": ["strength1"],
      "gaps": ["gap1"]
    },
    "education": { 
      "score": 70, 
      "feedback": "Specific feedback about education fit",
      "strengths": ["strength1"],
      "gaps": []
    }
  },
  "improvements": [
    "Actionable improvement suggestion 1",
    "Actionable improvement suggestion 2",
    "Actionable improvement suggestion 3"
  ],
  "summary": "2-3 sentence overall assessment of the candidate's fit for this role"
}

Be honest and constructive in your feedback. Scores should be between 0-100.`;

function JobMatcher() {
  const navigate = useNavigate();
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchingResumes, setFetchingResumes] = useState(true);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [selectedResumeId, setSelectedResumeId] = useState("");
  const [selectedResume, setSelectedResume] = useState(null);
  const [resumeList, setResumeList] = useState([]);

  // Fetch user's resumes and demo resumes on mount
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
          setSelectedResume(allResumes[0]);
        }
      } catch (error) {
        console.error("Error fetching resumes:", error);
        toast("Error fetching resumes");
      } finally {
        setFetchingResumes(false);
      }
    };
    fetchResumes();
  }, []);

  // Update selected resume when selection changes
  const handleResumeChange = (e) => {
    const resumeId = e.target.value;
    setSelectedResumeId(resumeId);
    const resume = resumeList.find((r) => r._id === resumeId);
    setSelectedResume(resume);
    setAnalysisResult(null);
  };

  const formatExperience = (experience) => {
    if (!experience || experience.length === 0) return "No experience listed";
    return experience.map(exp => 
      `${exp.title} at ${exp.companyName} (${exp.startDate} - ${exp.endDate || 'Present'}): ${exp.workSummary || ''}`
    ).join("; ");
  };

  const formatEducation = (education) => {
    if (!education || education.length === 0) return "No education listed";
    return education.map(edu => 
      `${edu.degree} in ${edu.major} from ${edu.universityName} (${edu.startDate} - ${edu.endDate})`
    ).join("; ");
  };

  const formatProjects = (projects) => {
    if (!projects || projects.length === 0) return "No projects listed";
    return projects.map(proj => 
      `${proj.name}: ${proj.description || ''}`
    ).join("; ");
  };

  const analyzeMatch = async () => {
    if (!jobDescription.trim()) {
      toast("Please enter a job description");
      return;
    }

    if (!selectedResume) {
      toast("Please select a resume to analyze");
      return;
    }

    setLoading(true);
    setAnalysisResult(null);

    const prompt = JOB_MATCH_PROMPT
      .replace("{name}", `${selectedResume.firstName || ''} ${selectedResume.lastName || ''}`)
      .replace("{jobTitle}", selectedResume.jobTitle || "Not specified")
      .replace("{summary}", selectedResume.summary || "No summary")
      .replace("{skills}", selectedResume.skills?.map(s => s.name).join(", ") || "No skills listed")
      .replace("{experience}", formatExperience(selectedResume.experience))
      .replace("{education}", formatEducation(selectedResume.education))
      .replace("{projects}", formatProjects(selectedResume.projects))
      .replace("{jobDescription}", jobDescription);

    try {
      const result = await AIChatSession.sendMessage(prompt);
      const responseText = result.response.text();
      console.log("Job Matcher Response:", responseText);

      const parsed = JSON.parse(responseText);
      setAnalysisResult(parsed);
      toast("Analysis complete!");
    } catch (error) {
      console.error("Error analyzing resume:", error);
      if (error.message.includes("404") || error.message.includes("not found")) {
        toast.error("API Key Error: Model not enabled. Please check Google AI Studio.");
      } else {
        toast.error("Error analyzing resume: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 70) return "text-green-600";
    if (score >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBg = (score) => {
    if (score >= 70) return "bg-green-100";
    if (score >= 50) return "bg-yellow-100";
    return "bg-red-100";
  };

  return (
    <div className="p-10 md:px-20 lg:px-32">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" onClick={() => navigate("/dashboard")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h2 className="font-bold text-3xl">Job Role Matcher</h2>
          <p className="text-gray-500">
            Match your resume against a job description and get a compatibility score
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Column - Input */}
        <div className="space-y-6">
          {/* Resume Selector */}
          <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4">
            <h3 className="font-bold text-lg mb-3">1. Select Your Resume</h3>
            {fetchingResumes ? (
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
                    {resume.isDemo ? "🌟 DEMO: " : ""}{resume.title || `${resume.firstName}'s Resume`} - {resume.jobTitle || "No title"}
                  </option>
                ))}
              </select>
            )}

            {/* Resume Preview */}
            {selectedResume && (
              <div className="mt-4 p-3 bg-gray-50 rounded-lg text-sm">
                <p><strong>Name:</strong> {selectedResume.firstName} {selectedResume.lastName}</p>
                <p><strong>Target Role:</strong> {selectedResume.jobTitle || "Not specified"}</p>
                <p><strong>Skills:</strong> {selectedResume.skills?.length || 0} skills listed</p>
                <p><strong>Experience:</strong> {selectedResume.experience?.length || 0} positions</p>
              </div>
            )}
          </div>

          {/* Job Description Input */}
          <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4">
            <h3 className="font-bold text-lg mb-3">2. Paste Job Description</h3>
            <Textarea
              placeholder="Paste the full job description here including requirements, responsibilities, and qualifications..."
              className="min-h-[250px]"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
          </div>

          {/* Analyze Button */}
          <Button
            className="w-full"
            size="lg"
            onClick={analyzeMatch}
            disabled={loading}
          >
            {loading ? (
              <>
                <LoaderCircle className="animate-spin mr-2 h-4 w-4" />
                Analyzing Resume...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Match Resume to Job
              </>
            )}
          </Button>
        </div>

        {/* Right Column - Results */}
        <div>
          {!analysisResult && !loading && (
            <div className="h-full flex items-center justify-center border-2 border-dashed rounded-lg p-10">
              <p className="text-gray-400 text-center">
                Your compatibility analysis will appear here after you click "Match Resume to Job"
              </p>
            </div>
          )}

          {loading && (
            <div className="h-full flex items-center justify-center border-2 border-dashed rounded-lg p-10">
              <div className="text-center">
                <LoaderCircle className="animate-spin h-12 w-12 mx-auto text-primary mb-4" />
                <p className="text-gray-500">Analyzing your resume against the job requirements...</p>
                <p className="text-gray-400 text-sm mt-2">This may take a few seconds</p>
              </div>
            </div>
          )}

          {analysisResult && (
            <div className="space-y-6">
              {/* Overall Score */}
              <div className="p-6 shadow-lg rounded-lg bg-gradient-to-r from-primary/10 to-primary/5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-xl">Overall Match Score</h3>
                  <div className={`text-5xl font-bold ${getScoreColor(analysisResult.overallScore)}`}>
                    {analysisResult.overallScore}%
                  </div>
                </div>
                <p className="text-gray-600">{analysisResult.summary}</p>
              </div>

              {/* Score Breakdown */}
              <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4">
                <h3 className="font-bold text-lg mb-4">Score Breakdown</h3>
                <div className="space-y-4">
                  {/* Skills Score */}
                  {analysisResult.breakdown?.skills && (
                    <div className="p-4 rounded-lg bg-gray-50">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-5 w-5 text-blue-600" />
                          <span className="font-semibold">Skills</span>
                        </div>
                        <span className={`font-bold ${getScoreColor(analysisResult.breakdown.skills.score)}`}>
                          {analysisResult.breakdown.skills.score}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div 
                          className={`h-2 rounded-full ${analysisResult.breakdown.skills.score >= 70 ? 'bg-green-500' : analysisResult.breakdown.skills.score >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
                          style={{ width: `${analysisResult.breakdown.skills.score}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-600">{analysisResult.breakdown.skills.feedback}</p>
                    </div>
                  )}

                  {/* Experience Score */}
                  {analysisResult.breakdown?.experience && (
                    <div className="p-4 rounded-lg bg-gray-50">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Briefcase className="h-5 w-5 text-purple-600" />
                          <span className="font-semibold">Experience</span>
                        </div>
                        <span className={`font-bold ${getScoreColor(analysisResult.breakdown.experience.score)}`}>
                          {analysisResult.breakdown.experience.score}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div 
                          className={`h-2 rounded-full ${analysisResult.breakdown.experience.score >= 70 ? 'bg-green-500' : analysisResult.breakdown.experience.score >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
                          style={{ width: `${analysisResult.breakdown.experience.score}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-600">{analysisResult.breakdown.experience.feedback}</p>
                    </div>
                  )}

                  {/* Education Score */}
                  {analysisResult.breakdown?.education && (
                    <div className="p-4 rounded-lg bg-gray-50">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <GraduationCap className="h-5 w-5 text-orange-600" />
                          <span className="font-semibold">Education</span>
                        </div>
                        <span className={`font-bold ${getScoreColor(analysisResult.breakdown.education.score)}`}>
                          {analysisResult.breakdown.education.score}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div 
                          className={`h-2 rounded-full ${analysisResult.breakdown.education.score >= 70 ? 'bg-green-500' : analysisResult.breakdown.education.score >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
                          style={{ width: `${analysisResult.breakdown.education.score}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-600">{analysisResult.breakdown.education.feedback}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Improvements */}
              {analysisResult.improvements && analysisResult.improvements.length > 0 && (
                <div className="p-5 shadow-lg rounded-lg border-l-4 border-l-blue-500">
                  <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-blue-600" />
                    Suggested Improvements
                  </h3>
                  <ul className="space-y-2">
                    {analysisResult.improvements.map((improvement, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold flex-shrink-0">
                          {index + 1}
                        </span>
                        <span className="text-gray-700">{improvement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default JobMatcher;
