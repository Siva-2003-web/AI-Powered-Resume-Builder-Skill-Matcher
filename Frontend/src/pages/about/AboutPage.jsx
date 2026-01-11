/**
 * About Page Component
 * 
 * @author      [Your Name / Team Name]
 * @description Displays information about the SkillForge platform
 *              and the development team
 */

import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Sparkles, 
  ArrowLeft, 
  Code2, 
  Rocket, 
  Users, 
  Target,
  Zap,
  Heart,
  Github,
  Linkedin,
  Mail
} from "lucide-react";

function AboutPage() {
  const navigate = useNavigate();

  const teamMembers = [
    {
      name: "[Your Name]",
      role: "Full Stack Developer",
      description: "Passionate about building AI-powered solutions"
    }
  ];

  const techStack = [
    { name: "React 18", category: "Frontend" },
    { name: "Vite", category: "Build Tool" },
    { name: "TailwindCSS", category: "Styling" },
    { name: "Redux Toolkit", category: "State" },
    { name: "Node.js", category: "Backend" },
    { name: "Express", category: "API" },
    { name: "MongoDB", category: "Database" },
    { name: "Google Gemini", category: "AI" },
  ];

  const milestones = [
    { icon: Sparkles, title: "AI Integration", desc: "Gemini-powered content generation" },
    { icon: Target, title: "Skill Analysis", desc: "Job-resume matching algorithm" },
    { icon: Zap, title: "Real-time Preview", desc: "Instant resume visualization" },
    { icon: Rocket, title: "PDF Export", desc: "Professional document generation" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <h1 className="font-bold text-lg">About SkillForge</h1>
          <div className="w-20"></div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Code2 className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Built for Hackathon 2026</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
            <span className="bg-gradient-to-r from-primary via-blue-500 to-indigo-600 bg-clip-text text-transparent">
              SkillForge
            </span>
            <br />
            <span className="text-foreground">Resume Builder</span>
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            An intelligent, AI-powered platform designed to help job seekers create
            professional, ATS-optimized resumes with smart content generation and
            comprehensive skill gap analysis.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-12">Core Capabilities</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div 
                  key={index}
                  className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center mb-4">
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-12">Technology Stack</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {techStack.map((tech, index) => (
              <div 
                key={index}
                className="px-4 py-2 rounded-full bg-card border border-border hover:border-primary hover:bg-primary/5 transition-all duration-300"
              >
                <span className="text-sm font-medium">{tech.name}</span>
                <span className="text-xs text-muted-foreground ml-2">({tech.category})</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-12 flex items-center justify-center gap-2">
            <Users className="h-6 w-6 text-primary" />
            Meet the Team
          </h2>
          <div className="flex justify-center">
            {teamMembers.map((member, index) => (
              <div 
                key={index}
                className="p-8 rounded-2xl bg-card border border-border max-w-sm"
              >
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-blue-600 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl font-bold text-white">
                    {member.name.charAt(0)}
                  </span>
                </div>
                <h3 className="font-bold text-xl mb-1">{member.name}</h3>
                <p className="text-sm text-primary mb-3">{member.role}</p>
                <p className="text-sm text-muted-foreground">{member.description}</p>
                <div className="flex justify-center gap-3 mt-4">
                  <Button size="sm" variant="ghost" className="rounded-full">
                    <Github className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="rounded-full">
                    <Linkedin className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="rounded-full">
                    <Mail className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
            Built with <Heart className="h-4 w-4 text-red-500" /> for Hackathon 2026
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            © {new Date().getFullYear()} SkillForge. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default AboutPage;
