import React from "react";
import { Eye, Edit, Trash2, Loader2, FileText } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteThisResume } from "@/Services/resumeAPI";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

function ResumeCard({ resume, refreshData }) {
  const [loading, setLoading] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const navigate = useNavigate();

  // Use the resume's theme color or a default
  const themeColor = resume.themeColor || "#3F5E96";

  const handleDelete = async () => {
    setLoading(true);
    console.log("Delete Resume with ID", resume._id);
    try {
      await deleteThisResume(resume._id);
      toast("Resume deleted successfully");
    } catch (error) {
      console.error("Error deleting resume:", error.message);
      toast(error.message);
    } finally {
      setLoading(false);
      setOpenAlert(false);
      refreshData();
    }
  };

  return (
    <div className="group relative rounded-2xl overflow-hidden h-[300px] card-hover bg-card border border-border shadow-md">
      {/* Gradient Top Bar */}
      <div 
        className="h-2 w-full"
        style={{ backgroundColor: themeColor }}
      />
      
      {/* Main Content */}
      <div className="p-5 flex flex-col h-[calc(100%-8px)]">
        {/* Header with Icon */}
        <div className="flex items-start gap-3 mb-4">
          <div 
            className="p-3 rounded-xl shrink-0"
            style={{ backgroundColor: `${themeColor}20` }}
          >
            <FileText 
              className="h-6 w-6" 
              style={{ color: themeColor }}
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-lg line-clamp-2 group-hover:text-primary transition-colors">
              {resume.title || "Untitled Resume"}
            </h3>
            {resume.jobTitle && (
              <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                {resume.jobTitle}
              </p>
            )}
          </div>
        </div>

        {/* Resume Preview Placeholder */}
        <div className="flex-1 mb-4 rounded-lg bg-muted/50 dark:bg-muted/30 border border-border/50 flex items-center justify-center overflow-hidden">
          <div className="text-center p-4">
            <div 
              className="w-10 h-14 mx-auto mb-2 rounded border-2 flex items-center justify-center"
              style={{ borderColor: themeColor }}
            >
              <div className="space-y-1">
                <div className="w-6 h-0.5 rounded" style={{ backgroundColor: themeColor }} />
                <div className="w-4 h-0.5 bg-muted-foreground/30 rounded" />
                <div className="w-5 h-0.5 bg-muted-foreground/30 rounded" />
                <div className="w-3 h-0.5 bg-muted-foreground/30 rounded" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              {resume.firstName || "Your"} {resume.lastName || "Resume"}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between gap-2 pt-3 border-t border-border">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(`/dashboard/view-resume/${resume._id}`)}
            className="flex-1 gap-2 hover:bg-primary/10 hover:text-primary"
          >
            <Eye className="h-4 w-4" />
            <span className="hidden sm:inline">View</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(`/dashboard/edit-resume/${resume._id}`)}
            className="flex-1 gap-2 hover:bg-blue-500/10 hover:text-blue-600"
          >
            <Edit className="h-4 w-4" />
            <span className="hidden sm:inline">Edit</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setOpenAlert(true)}
            className="flex-1 gap-2 hover:bg-destructive/10 hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
            <span className="hidden sm:inline">Delete</span>
          </Button>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={openAlert} onClose={() => setOpenAlert(false)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Resume?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              resume "{resume.title}" and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpenAlert(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete} 
              disabled={loading}
              className="bg-destructive hover:bg-destructive/90"
            >
              {loading ? (
                <Loader2 className="animate-spin h-4 w-4" />
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default ResumeCard;

