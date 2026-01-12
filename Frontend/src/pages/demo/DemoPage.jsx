import React, { useEffect, useState } from "react";
import { getDemoResumes } from "@/Services/resumeAPI";
import { useNavigate } from "react-router-dom";
import { 
  FileText, 
  ArrowRight, 
  Sparkles, 
  Eye,
  Download,
  Code,
  Palette,
  Briefcase,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/custom/Header";
import { useSelector } from "react-redux";

function DemoPage() {
  const [demoResumes, setDemoResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const user = useSelector((state) => state.editUser.userData);

  useEffect(() => {
    const fetchDemos = async () => {
      try {
        setLoading(true);
        const response = await getDemoResumes();
        setDemoResumes(response.data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching demo resumes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDemos();
  }, []);

  const getResumeIcon = (title) => {
    if (title.toLowerCase().includes("developer") || title.toLowerCase().includes("full stack")) {
      return Code;
    } else if (title.toLowerCase().includes("designer") || title.toLowerCase().includes("ui")) {
      return Palette;
    } else {
      return Briefcase;
    }
  };

  const handleViewResume = (resumeId) => {
    // Navigate to view resume page
    navigate(`/dashboard/view-resume/${resumeId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <Header user={user} />
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading demo resumes...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <Header user={user} />
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="text-center max-w-md">
            <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Error Loading Demos</h2>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header user={user} />
      
      <div className="p-6 md:px-12 lg:px-20 xl:px-32 max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="mb-12 text-center animate-fade-in">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-6 w-6 text-primary animate-pulse" />
            <span className="text-primary font-medium">Demo Resumes</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Explore Our{" "}
            <span className="text-gradient">Professional Templates</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
            Check out these sample resumes to see what you can create with our AI-powered resume builder. 
            Each template is professionally designed and ATS-optimized.
          </p>
          
          {!user && (
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
              <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <span className="text-sm text-blue-700 dark:text-blue-300">
                Sign in to create your own resume based on these templates
              </span>
            </div>
          )}
        </div>

        {/* Demo Resumes Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {demoResumes.map((resume, index) => {
            const IconComponent = getResumeIcon(resume.title);
            
            return (
              <div
                key={resume._id}
                className="group relative p-6 rounded-2xl bg-white dark:bg-slate-900 border border-border hover:border-primary/50 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Demo Badge */}
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                  <span className="text-xs font-bold text-primary">DEMO</span>
                </div>

                {/* Resume Icon */}
                <div className="mb-4">
                  <div 
                    className="w-16 h-16 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: resume.themeColor + '20' }}
                  >
                    <IconComponent 
                      className="w-8 h-8" 
                      style={{ color: resume.themeColor }}
                    />
                  </div>
                </div>

                {/* Resume Info */}
                <h3 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors">
                  {resume.title}
                </h3>
                
                <div className="mb-4">
                  <p className="font-semibold text-lg">
                    {resume.firstName} {resume.lastName}
                  </p>
                  <p className="text-sm text-muted-foreground">{resume.jobTitle}</p>
                </div>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {resume.summary}
                </p>

                {/* Skills Preview */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {resume.skills.slice(0, 3).map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 text-xs rounded-full bg-muted text-muted-foreground"
                    >
                      {skill.name}
                    </span>
                  ))}
                  {resume.skills.length > 3 && (
                    <span className="px-2 py-1 text-xs rounded-full bg-muted text-muted-foreground">
                      +{resume.skills.length - 3} more
                    </span>
                  )}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 mb-4 p-3 rounded-lg bg-muted/50">
                  <div className="text-center">
                    <div className="text-lg font-bold text-primary">
                      {resume.experience?.length || 0}
                    </div>
                    <div className="text-xs text-muted-foreground">Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-primary">
                      {resume.skills?.length || 0}
                    </div>
                    <div className="text-xs text-muted-foreground">Skills</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-primary">
                      {resume.projects?.length || 0}
                    </div>
                    <div className="text-xs text-muted-foreground">Projects</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleViewResume(resume._id)}
                    className="flex-1 group/btn"
                    variant="default"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Resume
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-primary/10 via-blue-500/10 to-purple-500/10 border border-primary/20">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Create Your Own?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            {user 
              ? "Start building your professional resume now with our AI-powered tools"
              : "Sign in to create your own professional resume using our AI-powered builder"
            }
          </p>
          <Button
            size="lg"
            onClick={() => navigate(user ? "/dashboard" : "/auth/sign-in")}
            className="group px-8 py-6 text-lg font-bold"
          >
            <Sparkles className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
            {user ? "Go to Dashboard" : "Get Started Free"}
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DemoPage;
