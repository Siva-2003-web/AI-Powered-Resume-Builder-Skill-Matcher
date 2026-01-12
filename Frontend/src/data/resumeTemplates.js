// Resume template definitions
export const resumeTemplates = [
  {
    id: "modern-professional",
    name: "Modern Professional",
    description: "Clean and modern design perfect for tech and corporate roles",
    themeColor: "#8B5CF6", // Purple
    preview: "modern",
    icon: "💼"
  },
  {
    id: "classic-blue",
    name: "Classic Blue",
    description: "Traditional and trustworthy design for corporate positions",
    themeColor: "#3B82F6", // Blue
    preview: "classic",
    icon: "📘"
  },
  {
    id: "creative-pink",
    name: "Creative Pink",
    description: "Bold and creative design for design and creative roles",
    themeColor: "#EC4899", // Pink
    preview: "creative",
    icon: "🎨"
  },
  {
    id: "elegant-green",
    name: "Elegant Green",
    description: "Fresh and professional design for business and finance",
    themeColor: "#10B981", // Green
    preview: "elegant",
    icon: "🌿"
  },
  {
    id: "executive-navy",
    name: "Executive Navy",
    description: "Sophisticated design for executive and leadership roles",
    themeColor: "#1E40AF", // Navy Blue
    preview: "executive",
    icon: "👔"
  }
];

export const getTemplateById = (id) => {
  return resumeTemplates.find(template => template.id === id) || resumeTemplates[0];
};

export const getTemplateByColor = (color) => {
  return resumeTemplates.find(template => template.themeColor === color) || resumeTemplates[0];
};

export default resumeTemplates;
