import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addResumeData } from "@/features/resume/resumeFeatures";
import { Layout, LayoutList, Minimize2, Loader2, Briefcase, Palette } from "lucide-react";
import { useParams } from "react-router-dom";
import { updateThisResume } from "@/Services/resumeAPI";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const templates = [
  {
    id: "classic",
    name: "Classic",
    description: "Traditional single-column layout",
    icon: LayoutList,
  },
  {
    id: "modern",
    name: "Modern",
    description: "Two-column with sidebar",
    icon: Layout,
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Clean and elegant",
    icon: Minimize2,
  },
  {
    id: "executive",
    name: "Executive",
    description: "Professional and authoritative",
    icon: Briefcase,
  },
  {
    id: "creative",
    name: "Creative",
    description: "Bold and expressive design",
    icon: Palette,
  },
];

function TemplateSelector() {
  const dispatch = useDispatch();
  const resumeData = useSelector((state) => state.editResume.resumeData);
  const selectedTemplate = resumeData?.templateId || "classic";

  const { resume_id } = useParams();
  const [loading, setLoading] = React.useState(false);

  const handleTemplateChange = (templateId) => {
    dispatch(
      addResumeData({
        ...resumeData,
        templateId: templateId,
      })
    );
  };

  const onSave = () => {
    setLoading(true);
    const data = {
      data: {
        templateId: selectedTemplate,
      },
    };
    
    updateThisResume(resume_id, data)
      .then(() => {
        toast("Resume Template Updated", "success");
      })
      .catch(() => {
        toast("Server Error", "error");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="font-bold text-lg mb-2">Choose Template</h2>
          <p className="text-sm text-gray-500">
            Select a resume template that fits your style
          </p>
        </div>
        <Button onClick={onSave} disabled={loading}>
          {loading ? <Loader2 className="animate-spin" /> : "Save"}
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {templates.map((template) => {
          const IconComponent = template.icon;
          const isSelected = selectedTemplate === template.id;

          return (
            <div
              key={template.id}
              onClick={() => handleTemplateChange(template.id)}
              className={`
                p-4 rounded-lg border-2 cursor-pointer transition-all
                ${
                  isSelected
                    ? "border-primary bg-primary/5"
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }
              `}
            >
              <div className="flex flex-col items-center text-center">
                <div
                  className={`p-3 rounded-lg mb-2 ${
                    isSelected ? "bg-primary text-white" : "bg-gray-100 text-gray-600"
                  }`}
                >
                  <IconComponent className="h-6 w-6" />
                </div>
                <h3
                  className={`font-semibold text-sm ${
                    isSelected ? "text-primary" : "text-gray-700"
                  }`}
                >
                  {template.name}
                </h3>
                <p className="text-xs text-gray-500 mt-1">{template.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TemplateSelector;
