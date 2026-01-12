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
  FileText,
  Brain,
  BarChart3,
  Download,
  CheckCircle2,
  Rocket,
  Shield,
  Zap,
  Users,
  Star,
  TrendingUp,
  FileCheck,
  Briefcase,
  Target,
  Award,
  Eye
} from "lucide-react";

function HomePage() {
  const user = useSelector((state) => state.editUser.userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleGetStartedClick = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/auth/sign-in");
    }
  };

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Content",
      description: "Generate professional resume content with advanced AI that understands your industry",
      color: "from-purple-500 to-pink-600",
      delay: "0s"
    },
    {
      icon: FileCheck,
      title: "ATS Optimization",
      description: "Ensure your resume passes Applicant Tracking Systems with smart formatting",
      color: "from-blue-500 to-cyan-600",
      delay: "0.1s"
    },
    {
      icon: BarChart3,
      title: "Skill Gap Analysis",
      description: "Compare your skills with job requirements and get personalized recommendations",
      color: "from-emerald-500 to-teal-600",
      delay: "0.2s"
    },
    {
      icon: Download,
      title: "Instant Export",
      description: "Download your professional resume as PDF with one click, ready to send",
      color: "from-orange-500 to-red-600",
      delay: "0.3s"
    }
  ];

  const stats = [
    { icon: Users, value: "50K+", label: "Active Users", color: "text-blue-500" },
    { icon: FileText, value: "100K+", label: "Resumes Created", color: "text-purple-500" },
    { icon: Star, value: "4.9/5", label: "User Rating", color: "text-yellow-500" },
    { icon: TrendingUp, value: "85%", label: "Success Rate", color: "text-emerald-500" }
  ];

  const benefits = [
    { icon: Rocket, text: "Build in Minutes" },
    { icon: Shield, text: "100% Secure" },
    { icon: Zap, text: "AI-Powered" },
    { icon: Award, text: "Professional Quality" }
  ];

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <Header user={user} />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background with Gradient Mesh */}
        <div className="absolute inset-0">
          {/* Base gradient with professional colors */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-950 dark:via-blue-950/50 dark:to-indigo-950/50" />
          
          {/* Animated mesh gradient layers */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/40 via-transparent to-transparent dark:from-blue-900/20 animate-pulse" />
            <div className="absolute inset-0 bg-gradient-to-bl from-purple-100/40 via-transparent to-transparent dark:from-purple-900/20 animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-100/30 via-transparent to-transparent dark:from-cyan-900/15 animate-pulse" style={{ animationDelay: '2s' }} />
          </div>
          
          {/* Animated gradient orbs with professional colors */}
          <div 
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/40 to-indigo-500/40 dark:from-blue-600/30 dark:to-indigo-700/30 rounded-full blur-3xl animate-pulse"
            style={{ 
              transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
              transition: 'transform 0.3s ease-out'
            }}
          />
          <div 
            className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-purple-400/35 to-pink-400/35 dark:from-purple-600/25 dark:to-pink-600/25 rounded-full blur-3xl animate-pulse"
            style={{ 
              animationDelay: '1s',
              transform: `translate(${mousePosition.x * -0.015}px, ${mousePosition.y * -0.015}px)`,
              transition: 'transform 0.3s ease-out'
            }}
          />
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-cyan-400/30 to-blue-500/30 dark:from-cyan-600/20 dark:to-blue-700/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: '2s' }}
          />
          
          {/* Additional color accent orbs */}
          <div className="absolute top-10 right-20 w-64 h-64 bg-gradient-to-br from-indigo-300/25 to-blue-400/25 dark:from-indigo-700/15 dark:to-blue-800/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '0.5s' }} />
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-violet-300/25 to-purple-400/25 dark:from-violet-700/15 dark:to-purple-800/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1.5s' }} />
          
          {/* Floating resume icons */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute opacity-10 dark:opacity-5"
              style={{
                left: `${10 + i * 12}%`,
                top: `${15 + (i % 3) * 25}%`,
                animation: `float ${5 + i * 0.5}s ease-in-out infinite`,
                animationDelay: `${i * 0.3}s`
              }}
            >
              <FileText className="w-8 h-8 text-primary" />
            </div>
          ))}
          
          {/* Grid pattern with color tint */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.05)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
          
          {/* Radial gradient overlay for depth */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(255,255,255,0.1)_100%)] dark:bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)]" />
        </div>

        <div className="relative z-10 w-full px-6 py-20 md:py-32 mx-auto max-w-7xl">
          <div className="text-center max-w-5xl mx-auto">
            {/* Floating Badge */}
            <div 
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-primary/20 shadow-lg shadow-primary/10 mb-8 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}
            >
              <Sparkles className="h-5 w-5 text-primary animate-pulse" />
              <span className="text-sm font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                AI-Powered Resume Builder
              </span>
            </div>

            {/* Main Heading with Staggered Animation */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight mb-8">
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap justify-center gap-x-4 md:gap-x-6">
                  <span 
                    className={`inline-block transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-12'}`}
                    style={{ transitionDelay: '0.2s' }}
                  >
                    <span className="bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                      Build Your
                    </span>
                  </span>
                </div>
                <div className="flex flex-wrap justify-center gap-x-4 md:gap-x-6">
                  <span 
                    className={`inline-block transition-all duration-700 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
                    style={{ transitionDelay: '0.4s' }}
                  >
                    <span className="bg-gradient-to-r from-primary via-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient-flow bg-[length:200%_auto]">
                      Dream Career
                    </span>
                  </span>
                </div>
                <div className="flex flex-wrap justify-center gap-x-4 md:gap-x-6">
                  <span 
                    className={`inline-block transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                    style={{ transitionDelay: '0.6s' }}
                  >
                    <span className="bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                      with AI
                    </span>
                  </span>
                </div>
              </div>
            </h1>

            {/* Subheading */}
            <p 
              className={`text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: '0.8s' }}
            >
              Create professional, ATS-optimized resumes in minutes with our intelligent AI assistant. 
              Stand out from the competition and land your dream job.
            </p>

            {/* CTA Buttons */}
            <div 
              className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: '1s' }}
            >
              <Button
                size="lg"
                onClick={handleGetStartedClick}
                className="group px-10 py-7 text-lg font-bold bg-gradient-to-r from-primary via-blue-600 to-purple-600 hover:from-primary/90 hover:via-blue-600/90 hover:to-purple-600/90 shadow-2xl shadow-primary/40 hover:shadow-primary/60 hover:scale-105 transition-all duration-500 rounded-2xl border-2 border-white/20"
              >
                <Rocket className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                Start Building For Free
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/demo")}
                className="group px-10 py-7 text-lg font-bold border-2 hover:bg-primary/10 hover:border-primary shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-500 rounded-2xl"
              >
                <Eye className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                View Demo Resumes
              </Button>
            </div>

            {/* Benefits Grid */}
            <div 
              className={`grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-3xl mx-auto transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: '1.2s' }}
            >
              {benefits.map((benefit, index) => {
                const IconComponent = benefit.icon;
                return (
                  <div 
                    key={index} 
                    className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border border-border hover:border-primary/50 hover:shadow-lg hover:scale-105 transition-all duration-300"
                  >
                    <IconComponent className="h-6 w-6 text-primary" />
                    <span className="text-sm font-semibold text-foreground">{benefit.text}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Animated Resume Preview */}
          <div 
            className={`mt-24 relative transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
            style={{ transitionDelay: '1.4s' }}
          >
            <div className="flex justify-center items-center gap-6">
              {/* Resume Card with Floating Animation */}
              <div 
                className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border-2 border-primary/20 p-8 hover:shadow-primary/20 hover:scale-105 transition-all duration-500"
                style={{ animation: 'float 6s ease-in-out infinite' }}
              >
                {/* Resume Header */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center">
                    <FileText className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="h-4 bg-gradient-to-r from-primary to-blue-500 rounded w-2/3 mb-2" />
                    <div className="h-3 bg-muted rounded w-1/2" />
                  </div>
                </div>
                
                {/* Resume Content */}
                <div className="space-y-4">
                  <div className="h-px bg-border" />
                  <div className="space-y-2">
                    <div className="h-3 bg-muted rounded w-full" />
                    <div className="h-3 bg-muted rounded w-5/6" />
                    <div className="h-3 bg-muted rounded w-4/5" />
                  </div>
                  <div className="h-px bg-border" />
                  <div className="flex gap-2 flex-wrap">
                    <div className="h-6 px-3 bg-primary/20 rounded-full flex items-center">
                      <div className="h-2 w-12 bg-primary/40 rounded" />
                    </div>
                    <div className="h-6 px-3 bg-blue-500/20 rounded-full flex items-center">
                      <div className="h-2 w-16 bg-blue-500/40 rounded" />
                    </div>
                    <div className="h-6 px-3 bg-purple-500/20 rounded-full flex items-center">
                      <div className="h-2 w-14 bg-purple-500/40 rounded" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Stats Section */}
      <section className="py-20 border-y border-border bg-muted/30 backdrop-blur-sm">
        <div className="px-6 mx-auto max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div 
                  key={index} 
                  className="text-center group hover:scale-110 transition-all duration-500"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-blue-500/10 mb-4 group-hover:shadow-lg group-hover:shadow-primary/20 transition-all duration-300">
                    <IconComponent className={`h-8 w-8 ${stat.color}`} />
                  </div>
                  <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 relative overflow-hidden">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/50 dark:from-blue-950/20 dark:via-purple-950/10 dark:to-pink-950/20" />
        
        <div className="px-6 mx-auto max-w-7xl relative">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Briefcase className="h-5 w-5 text-primary" />
              <span className="text-sm font-bold text-primary">Powerful Features</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
              Everything You Need to{" "}
              <span className="bg-gradient-to-r from-primary via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Succeed
              </span>
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              Our AI-powered platform provides all the tools you need to create a winning resume
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className="group relative p-[2px] rounded-3xl transition-all duration-500 hover:-translate-y-3"
                  style={{ animationDelay: feature.delay }}
                >
                  {/* Animated gradient border */}
                  <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient-rotate`} />
                  
                  {/* Glow effect */}
                  <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-30 blur-2xl transition-all duration-500`} />
                  
                  {/* Card content */}
                  <div className="relative h-full p-8 rounded-3xl bg-white dark:bg-slate-900 overflow-hidden">
                    {/* Animated gradient mesh background */}
                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500`}>
                      <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} animate-gradient-mesh`} />
                    </div>
                    
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    </div>
                    
                    <div className="relative">
                      {/* Icon with gradient background */}
                      <div className="relative mb-6">
                        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.color} blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-500`} />
                        <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-xl`}>
                          <IconComponent className="h-8 w-8 text-white" />
                        </div>
                      </div>
                      
                      <h3 className="font-bold text-xl mb-3 group-hover:text-primary transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        {/* Multi-layered gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-950 dark:via-indigo-950/50 dark:to-purple-950/50" />
        
        {/* Animated mesh gradients */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/30 via-transparent to-transparent dark:from-blue-900/15 animate-pulse" />
          <div className="absolute inset-0 bg-gradient-to-bl from-purple-100/30 via-transparent to-transparent dark:from-purple-900/15 animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        
        {/* Gradient orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/30 to-indigo-500/30 dark:from-blue-600/20 dark:to-indigo-700/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-400/30 to-pink-500/30 dark:from-purple-600/20 dark:to-pink-700/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-indigo-400/25 to-blue-500/25 dark:from-indigo-600/15 dark:to-blue-700/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }} />
        
        <div className="relative px-6 mx-auto max-w-5xl text-center">
          <Target className="w-16 h-16 text-primary mx-auto mb-8 animate-pulse" />
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8">
            Ready to Build Your{" "}
            <span className="bg-gradient-to-r from-primary via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Dream Resume
            </span>
            ?
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Join thousands of professionals who have transformed their careers with our AI-powered resume builder. 
            Start creating your perfect resume today — completely free!
          </p>
          <Button
            size="lg"
            onClick={handleGetStartedClick}
            className="group px-12 py-8 text-xl font-bold bg-gradient-to-r from-primary via-blue-600 to-purple-600 hover:from-primary/90 hover:via-blue-600/90 hover:to-purple-600/90 shadow-2xl shadow-primary/40 hover:shadow-primary/60 hover:scale-110 transition-all duration-500 rounded-2xl border-2 border-white/20"
          >
            <Rocket className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
            Get Started Now — It&apos;s Free
            <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-3 transition-transform duration-300" />
          </Button>
          
          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-8 mt-12">
            {[
              { icon: Shield, text: "100% Secure" },
              { icon: CheckCircle2, text: "No Credit Card" },
              { icon: Zap, text: "Instant Access" }
            ].map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div key={index} className="flex items-center gap-2 text-muted-foreground">
                  <IconComponent className="h-5 w-5 text-primary" />
                  <span className="font-semibold">{item.text}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 backdrop-blur-sm">
        <div className="px-6 py-12 mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-lg">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <span className="font-black text-xl bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                AI Resume Builder
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} AI Resume Builder. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes gradient-flow {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes gradient-rotate {
          0% { 
            background-position: 0% 50%;
            filter: hue-rotate(0deg);
          }
          50% { 
            background-position: 100% 50%;
            filter: hue-rotate(20deg);
          }
          100% { 
            background-position: 0% 50%;
            filter: hue-rotate(0deg);
          }
        }
        @keyframes gradient-mesh {
          0%, 100% { 
            transform: scale(1) rotate(0deg);
            opacity: 0.5;
          }
          50% { 
            transform: scale(1.1) rotate(5deg);
            opacity: 0.8;
          }
        }
        .animate-gradient-flow {
          animation: gradient-flow 3s ease infinite;
        }
        .animate-gradient-rotate {
          background-size: 200% 200%;
          animation: gradient-rotate 4s ease infinite;
        }
        .animate-gradient-mesh {
          animation: gradient-mesh 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default HomePage;
