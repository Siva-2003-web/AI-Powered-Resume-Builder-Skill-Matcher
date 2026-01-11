import Header from "@/components/custom/Header";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { startUser } from "../../Services/login.js";
import { useDispatch, useSelector } from "react-redux";
import { addUserData } from "@/features/user/userFeatures.js";
import { 
  Sparkles, 
  ArrowRight, 
  Zap, 
  Target, 
  FileText, 
  Wand2,
  CheckCircle2,
  Star,
  Users,
  Award,
  TrendingUp
} from "lucide-react";

function HomePage() {
  const user = useSelector((state) => state.editUser.userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    const fetchResponse = async () => {
      try {
        const response = await startUser();
        if (response.statusCode == 200) {
          dispatch(addUserData(response.data));
        } else {
          dispatch(addUserData(""));
        }
      } catch (error) {
        console.log("Error:", error.message);
        dispatch(addUserData(""));
      }
    };
    fetchResponse();
  }, [dispatch]);

  const handleGetStartedClick = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/auth/sign-in");
    }
  };

  const features = [
    {
      icon: Wand2,
      title: "AI-Powered Writing",
      description: "Generate professional summaries, skills, and bullet points with cutting-edge AI",
      color: "from-violet-500 to-purple-600"
    },
    {
      icon: Target,
      title: "Skill Gap Analysis",
      description: "Compare your skills against job requirements and get improvement suggestions",
      color: "from-blue-500 to-cyan-600"
    },
    {
      icon: FileText,
      title: "Multiple Templates",
      description: "Choose from beautiful, ATS-friendly templates designed by recruiters",
      color: "from-primary to-blue-600"
    },
    {
      icon: Zap,
      title: "Instant PDF Export",
      description: "Download your polished resume as a high-quality PDF with one click",
      color: "from-orange-500 to-red-500"
    }
  ];

  const stats = [
    { icon: Users, value: "10,000+", label: "Resumes Created" },
    { icon: Star, value: "4.9", label: "User Rating" },
    { icon: Award, value: "95%", label: "Success Rate" },
    { icon: TrendingUp, value: "3x", label: "More Interviews" }
  ];

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <Header user={user} />
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Base gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-primary/20 to-slate-900 dark:from-slate-950 dark:via-primary/10 dark:to-slate-950" />
          
          {/* Animated mesh gradient */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/40 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-blue-600/30 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-indigo-600/20 via-transparent to-transparent" />
          </div>
          
          {/* Floating particles/orbs */}
          <div 
            className={`absolute top-1/4 -left-20 w-80 h-80 bg-primary/30 rounded-full blur-3xl transition-all duration-1000 ${isLoaded ? 'opacity-60 translate-x-0' : 'opacity-0 -translate-x-20'}`}
            style={{ animation: 'float 8s ease-in-out infinite' }}
          />
          <div 
            className={`absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-500/25 rounded-full blur-3xl transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-50 translate-x-0' : 'opacity-0 translate-x-20'}`}
            style={{ animation: 'float 10s ease-in-out infinite', animationDelay: '2s' }}
          />
          <div 
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-40 scale-100' : 'opacity-0 scale-50'}`}
            style={{ animation: 'float 6s ease-in-out infinite', animationDelay: '1s' }}
          />
          
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
          
          {/* Shine effect */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        </div>

        <div className="relative z-10 w-full px-6 py-20 md:py-32 mx-auto max-w-7xl">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div 
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
            >
              <Sparkles className="h-4 w-4 text-primary animate-pulse" />
              <span className="text-sm font-semibold text-white">AI-Powered Resume Builder</span>
            </div>

            {/* Main Heading - Animated Words */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 text-white">
              {/* First line: Build resumes with */}
              <span className="flex flex-wrap justify-center gap-x-4 md:gap-x-6">
                <span 
                  className={`inline-block transition-all duration-700 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}
                  style={{ transitionDelay: '0.2s' }}
                >
                  Build
                </span>
                <span 
                  className={`inline-block text-primary transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-12'}`}
                  style={{ transitionDelay: '0.4s' }}
                >
                  resumes
                </span>
                <span 
                  className={`inline-block transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                  style={{ transitionDelay: '0.6s' }}
                >
                  with
                </span>
              </span>
              
              {/* Second line: Good skills */}
              <span className="block mt-4">
                <span 
                  className={`inline-block mr-4 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}
                  style={{ transitionDelay: '0.8s' }}
                >
                  <span className="bg-gradient-to-r from-primary via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    Good
                  </span>
                </span>
                <span 
                  className={`inline-block transition-all duration-700 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
                  style={{ transitionDelay: '1s' }}
                >
                  <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent animate-pulse">
                    skills
                  </span>
                </span>
              </span>
            </h1>

            {/* Subheading */}
            <p 
              className={`text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-12 leading-relaxed transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: '1.2s' }}
            >
              Create stunning, ATS-optimized resumes in minutes using advanced AI. 
              Get personalized suggestions and stand out from the competition.
            </p>

            {/* CTA Button */}
            <div 
              className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: '1.4s' }}
            >
              <Button
                size="lg"
                onClick={handleGetStartedClick}
                className="group px-10 py-7 text-lg font-semibold bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-500/90 shadow-2xl shadow-primary/40 hover:shadow-primary/60 hover:scale-105 transition-all duration-500 rounded-2xl border border-white/10"
              >
                Start Building For Free
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
              </Button>
            </div>

            {/* Trust Indicators */}
            <div 
              className={`flex flex-wrap items-center justify-center gap-6 md:gap-8 mt-14 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: '1.6s' }}
            >
              {[
                "100% Free",
                "No Credit Card",
                "ATS-Friendly",
                "AI-Powered"
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-gray-400">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Floating Resume Cards */}
          <div 
            className={`mt-20 relative transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
            style={{ transitionDelay: '1.8s' }}
          >
            <div className="flex justify-center items-end gap-4 md:gap-8">
              {/* Left Card */}
              <div 
                className="hidden md:block w-48 h-64 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-4 transform -rotate-6 hover:rotate-0 hover:scale-105 transition-all duration-500"
                style={{ animation: 'float 6s ease-in-out infinite' }}
              >
                <div className="w-full h-3 bg-primary/40 rounded mb-3" />
                <div className="w-3/4 h-2 bg-white/20 rounded mb-2" />
                <div className="w-full h-2 bg-white/20 rounded mb-2" />
                <div className="w-5/6 h-2 bg-white/20 rounded mb-4" />
                <div className="flex gap-2 flex-wrap">
                  <div className="h-4 w-10 bg-primary/30 rounded" />
                  <div className="h-4 w-12 bg-primary/30 rounded" />
                </div>
              </div>
              
              {/* Center Card - Main */}
              <div 
                className="w-64 md:w-72 h-80 md:h-96 bg-white/10 backdrop-blur-lg rounded-2xl border-2 border-primary/40 p-6 transform hover:scale-105 transition-all duration-500 z-10 shadow-2xl shadow-primary/20"
                style={{ animation: 'float 5s ease-in-out infinite', animationDelay: '0.5s' }}
              >
                <div className="w-full h-4 bg-gradient-to-r from-primary to-blue-400 rounded mb-4" />
                <div className="w-2/3 h-2 bg-white/30 rounded mx-auto mb-4" />
                <div className="h-px bg-white/20 mb-4" />
                <div className="space-y-2 mb-4">
                  <div className="w-full h-2 bg-white/20 rounded" />
                  <div className="w-5/6 h-2 bg-white/20 rounded" />
                  <div className="w-4/5 h-2 bg-white/20 rounded" />
                </div>
                <div className="w-1/2 h-3 bg-primary/40 rounded mb-3" />
                <div className="flex gap-2 flex-wrap">
                  <div className="h-5 w-12 bg-primary/30 rounded-full" />
                  <div className="h-5 w-14 bg-primary/30 rounded-full" />
                  <div className="h-5 w-10 bg-primary/30 rounded-full" />
                </div>
              </div>
              
              {/* Right Card */}
              <div 
                className="hidden md:block w-48 h-64 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-4 transform rotate-6 hover:rotate-0 hover:scale-105 transition-all duration-500"
                style={{ animation: 'float 7s ease-in-out infinite', animationDelay: '1s' }}
              >
                <div className="w-full h-3 bg-blue-500/40 rounded mb-3" />
                <div className="w-3/4 h-2 bg-white/20 rounded mb-2" />
                <div className="w-full h-2 bg-white/20 rounded mb-2" />
                <div className="w-5/6 h-2 bg-white/20 rounded mb-4" />
                <div className="flex gap-2 flex-wrap">
                  <div className="h-4 w-10 bg-blue-500/30 rounded" />
                  <div className="h-4 w-12 bg-blue-500/30 rounded" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-border bg-muted/30">
        <div className="px-6 mx-auto max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div 
                  key={index} 
                  className={`text-center transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${2 + index * 0.1}s` }}
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-3">
                    <IconComponent className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative">
        <div className="px-6 mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Zap className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Powerful Features</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Everything You Need to{" "}
              <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
                Succeed
              </span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Powerful AI features designed to help you create the perfect resume
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className="group p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border hover:border-primary/50 transition-all duration-500 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2"
                >
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                    <IconComponent className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="font-bold text-xl mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-blue-500/5 to-indigo-500/5" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        
        <div className="relative px-6 mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Build Your{" "}
            <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
              Perfect Resume
            </span>
            ?
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Join thousands of professionals who have transformed their job search with our AI-powered resume builder.
          </p>
          <Button
            size="lg"
            onClick={handleGetStartedClick}
            className="group px-12 py-7 text-lg font-semibold bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-500/90 shadow-2xl shadow-primary/30 hover:shadow-primary/50 hover:scale-105 transition-all duration-500 rounded-2xl"
          >
            Get Started Now — It&apos;s Free
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 backdrop-blur-sm">
        <div className="px-6 py-8 mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-blue-500" />
            <span className="font-bold text-lg">AI Resume Builder</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} AI Resume Builder. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
