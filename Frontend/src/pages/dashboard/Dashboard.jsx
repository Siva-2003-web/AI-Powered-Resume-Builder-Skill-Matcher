import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { getAllResumeData, getDemoResumes } from "@/Services/resumeAPI";
import AddResume from "./components/AddResume";
import ResumeCard from "./components/ResumeCard";
import { useNavigate } from "react-router-dom";
import { Target, Briefcase, Sparkles, ArrowRight } from "lucide-react";

function Dashboard() {
  const user = useSelector((state) => state.editUser.userData);
  const [resumeList, setResumeList] = React.useState([]);
  const [demoResumeList, setDemoResumeList] = React.useState([]);
  const navigate = useNavigate();

  const fetchAllResumeData = async () => {
    try {
      const resumes = await getAllResumeData();
      console.log(
        `Printing from DashBoard List of Resumes got from Backend`,
        resumes.data
      );
      setResumeList(resumes.data);
    } catch (error) {
      console.log("Error from dashboard", error.message);
    }
  };

  const fetchDemoResumes = async () => {
    try {
      const demos = await getDemoResumes();
      console.log("Demo resumes fetched:", demos.data);
      setDemoResumeList(demos.data);
    } catch (error) {
      console.log("Error fetching demo resumes:", error.message);
    }
  };

  useEffect(() => {
    fetchAllResumeData();
    fetchDemoResumes();
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="p-6 md:px-12 lg:px-20 xl:px-32 max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-10 animate-fade-in">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-6 w-6 text-primary animate-pulse" />
            <span className="text-primary font-medium">AI-Powered</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            Welcome back
            {user?.firstName && (
              <span className="text-gradient">, {user.firstName}</span>
            )}
            !
          </h1>
          <p className="text-muted-foreground text-lg">
            Build stunning, ATS-friendly resumes with the power of AI
          </p>
        </div>

        {/* AI Tools Section */}
        <div className="mb-12 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-bold text-2xl md:text-3xl">AI Tools</h2>
              <p className="text-muted-foreground">Powerful features to enhance your resume</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
            {/* Skill Gap Analysis Card */}
            <div
              onClick={() => navigate("/dashboard/skill-gap")}
              className="group relative p-6 rounded-2xl cursor-pointer overflow-hidden
                bg-gradient-to-br from-purple-500/10 via-purple-500/5 to-indigo-500/10
                dark:from-purple-500/20 dark:via-purple-500/10 dark:to-indigo-500/20
                border border-purple-200/50 dark:border-purple-500/30
                hover:border-purple-300 dark:hover:border-purple-400/50
                card-hover-glow shadow-lg"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-all duration-500" />
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl shadow-lg shadow-purple-500/30 group-hover:shadow-purple-500/50 transition-all duration-300">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">Skill Gap Analysis</h3>
                    <p className="text-sm text-muted-foreground">Identify missing skills</p>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">
                  Compare your skills against job descriptions and discover what skills you need to land your dream job.
                </p>
                <div className="flex items-center text-purple-600 dark:text-purple-400 font-medium group-hover:gap-2 transition-all">
                  <span>Analyze Now</span>
                  <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* Job Matcher Card */}
            <div
              onClick={() => navigate("/dashboard/job-matcher")}
              className="group relative p-6 rounded-2xl cursor-pointer overflow-hidden
                bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-cyan-500/10
                dark:from-blue-500/20 dark:via-blue-500/10 dark:to-cyan-500/20
                border border-blue-200/50 dark:border-blue-500/30
                hover:border-blue-300 dark:hover:border-blue-400/50
                card-hover-glow shadow-lg"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all duration-500" />
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-all duration-300">
                    <Briefcase className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">Job Matcher</h3>
                    <p className="text-sm text-muted-foreground">Check compatibility</p>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">
                  Match your resume against job roles and get a detailed compatibility score with improvement tips.
                </p>
                <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium group-hover:gap-2 transition-all">
                  <span>Match Resume</span>
                  <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Resumes Section */}
        <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-bold text-2xl md:text-3xl">My Resumes</h2>
              <p className="text-muted-foreground">Create and manage your AI-powered resumes</p>
            </div>
            <div className="hidden md:block">
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                {resumeList.length} resume{resumeList.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AddResume />
            {resumeList.length > 0 &&
              resumeList.map((resume, index) => (
                <div
                  key={resume._id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${0.1 * (index + 1)}s` }}
                >
                  <ResumeCard
                    resume={resume}
                    refreshData={fetchAllResumeData}
                  />
                </div>
              ))}
          </div>

          {/* Demo Resumes Section */}
          {demoResumeList.length > 0 && (
            <div className="mt-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-1 h-px bg-border"></div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
                  <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm font-bold text-blue-700 dark:text-blue-300">
                    Demo Resumes - Try Our Features
                  </span>
                </div>
                <div className="flex-1 h-px bg-border"></div>
              </div>
              
              <p className="text-center text-muted-foreground mb-6">
                Use these professional demo resumes to test Job Matcher, Skill Gap Analysis, and other features
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {demoResumeList.map((resume, index) => (
                  <div
                    key={resume._id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${0.1 * (index + 1)}s` }}
                  >
                    <ResumeCard
                      resume={resume}
                      refreshData={fetchDemoResumes}
                      isDemo={true}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
