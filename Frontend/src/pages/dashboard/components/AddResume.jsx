import { useState } from "react";
import { Plus, Loader, FileText, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createNewResume } from "@/Services/resumeAPI";
import { useNavigate } from "react-router-dom";
import resumeTemplates from "@/data/resumeTemplates";

function AddResume() {
  const [isDialogOpen, setOpenDialog] = useState(false);
  const [resumetitle, setResumetitle] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState(resumeTemplates[0]);
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();

  const createResume = async () => {
    setLoading(true);
    if (resumetitle === "")
      return console.log("Please add a title to your resume");
    const data = {
      data: {
        title: resumetitle,
        themeColor: selectedTemplate.themeColor,
        templateId: selectedTemplate.id,
      },
    };
    console.log(`Creating Resume ${resumetitle} with template ${selectedTemplate.name}`);
    createNewResume(data)
      .then((res) => {
        console.log("Printing From AddResume Response of Create Resume", res);
        Navigate(`/dashboard/edit-resume/${res.data.resume._id}`);
      })
      .finally(() => {
        setLoading(false);
        setResumetitle("");
      });
  };

  return (
    <>
      <div
        className="group relative p-8 flex flex-col items-center justify-center rounded-2xl h-[300px] cursor-pointer
          bg-gradient-to-br from-primary/5 via-blue-50/50 to-indigo-50/50
          dark:from-primary/10 dark:via-blue-900/20 dark:to-indigo-900/20
          border-2 border-dashed border-primary/30 dark:border-primary/40
          hover:border-primary hover:border-solid
          hover:shadow-lg hover:shadow-primary/10
          transition-all duration-300 ease-out
          hover:-translate-y-1"
        onClick={() => setOpenDialog(true)}
      >
        {/* Background Glow */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-blue-500/5 transition-all duration-300" />
        
        {/* Icon Container */}
        <div className="relative z-10 mb-4 p-4 rounded-2xl bg-gradient-to-br from-primary to-blue-600 shadow-lg shadow-primary/30 group-hover:shadow-primary/50 group-hover:scale-110 transition-all duration-300">
          <Plus className="h-8 w-8 text-white" />
        </div>
        
        {/* Text */}
        <h3 className="relative z-10 font-semibold text-lg text-foreground group-hover:text-primary transition-colors duration-300">
          Create New Resume
        </h3>
        <p className="relative z-10 text-sm text-muted-foreground mt-1">
          Start from scratch
        </p>
      </div>

      <Dialog open={isDialogOpen}>
        <DialogContent setOpenDialog={setOpenDialog} className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-gradient-to-br from-primary to-blue-600 rounded-lg">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <DialogTitle className="text-xl">Create New Resume</DialogTitle>
            </div>
            <DialogDescription className="text-base">
              Choose a template and give your resume a title to get started.
            </DialogDescription>
          </DialogHeader>
          
          {/* Resume Title Input */}
          <div className="mt-4">
            <label className="text-sm font-medium mb-2 block">Resume Title</label>
            <Input
              className="h-12 text-base"
              type="text"
              placeholder="Ex: Software Engineer Resume"
              value={resumetitle}
              onChange={(e) => setResumetitle(e.target.value.trimStart())}
            />
          </div>

          {/* Template Selection */}
          <div className="mt-6">
            <label className="text-sm font-medium mb-3 block">Choose Template Design</label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {resumeTemplates.map((template) => (
                <div
                  key={template.id}
                  onClick={() => setSelectedTemplate(template)}
                  className={`relative cursor-pointer rounded-xl border-2 p-4 transition-all duration-300 hover:shadow-lg ${
                    selectedTemplate.id === template.id
                      ? 'border-primary shadow-lg shadow-primary/20 bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  {/* Selected Indicator */}
                  {selectedTemplate.id === template.id && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center shadow-lg">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}

                  {/* Template Preview */}
                  <div className="mb-3">
                    <div 
                      className="w-full h-24 rounded-lg flex items-center justify-center text-3xl"
                      style={{ backgroundColor: `${template.themeColor}15` }}
                    >
                      {template.icon}
                    </div>
                    <div 
                      className="h-1 w-full rounded-full mt-2"
                      style={{ backgroundColor: template.themeColor }}
                    />
                  </div>

                  {/* Template Info */}
                  <h4 className="font-semibold text-sm mb-1">{template.name}</h4>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {template.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Template Info */}
          <div className="mt-4 p-4 rounded-lg bg-muted/50 border border-border">
            <div className="flex items-center gap-3">
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
                style={{ backgroundColor: `${selectedTemplate.themeColor}20` }}
              >
                {selectedTemplate.icon}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Selected: {selectedTemplate.name}</p>
                <p className="text-xs text-muted-foreground">{selectedTemplate.description}</p>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="gap-3 flex justify-end mt-6">
            <Button 
              variant="outline" 
              onClick={() => setOpenDialog(false)}
              className="px-6"
            >
              Cancel
            </Button>
            <Button 
              onClick={createResume} 
              disabled={!resumetitle || loading}
              className="px-6 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90"
            >
              {loading ? (
                <Loader className="animate-spin h-5 w-5" />
              ) : (
                "Create Resume"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AddResume;
