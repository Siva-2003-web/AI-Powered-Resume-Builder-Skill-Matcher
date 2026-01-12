import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import ClassicTemplate from "./templates/ClassicTemplate";
import ModernTemplate from "./templates/ModernTemplate";
import MinimalTemplate from "./templates/MinimalTemplate";
import ExecutiveTemplate from "./templates/ExecutiveTemplate";
import CreativeTemplate from "./templates/CreativeTemplate";

// Template mapping
const templates = {
  classic: ClassicTemplate,
  modern: ModernTemplate,
  minimal: MinimalTemplate,
  executive: ExecutiveTemplate,
  creative: CreativeTemplate,
};

function PreviewPage() {
  const resumeData = useSelector((state) => state.editResume.resumeData);
  
  useEffect(() => {
    console.log("PreviewPage rendered");
  }, [resumeData]);

  // Get the selected template component, default to Classic if not set
  const templateId = resumeData?.templateId || "classic";
  const TemplateComponent = templates[templateId] || ClassicTemplate;

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <TemplateComponent resumeData={resumeData} />
    </div>
  );
}

export default PreviewPage;

