import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getResumeData } from "@/Services/resumeAPI";
import ResumePreview from "../../edit-resume/components/PreviewPage";
import { useDispatch, useSelector } from "react-redux";
import { addResumeData } from "@/features/resume/resumeFeatures";
import { RWebShare } from "react-web-share";
import { toast } from "sonner";
import { Download, Share2, LoaderCircle } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function ViewResume() {
  const [downloading, setDownloading] = useState(false);
  const { resume_id } = useParams();
  const dispatch = useDispatch();
  const resumeData = useSelector((state) => state.editResume.resumeData);

  useEffect(() => {
    fetchResumeInfo();
  }, []);

  const fetchResumeInfo = async () => {
    const response = await getResumeData(resume_id);
    dispatch(addResumeData(response.data));
  };

  const HandleDownload = async () => {
    setDownloading(true);
    toast("Generating PDF...");

    try {
      const element = document.getElementById("resume-preview-container");
      
      if (!element) {
        toast("Error: Could not find resume preview");
        setDownloading(false);
        return;
      }

      // Capture the element as a canvas with high quality
      const canvas = await html2canvas(element, {
        scale: 2, // Higher scale for better quality
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");

      // Create PDF in A4 size
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      // Calculate dimensions to fit the page
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0;

      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );

      // Generate filename from user's name
      const firstName = resumeData?.firstName || "Resume";
      const lastName = resumeData?.lastName || "";
      const filename = `${firstName}_${lastName}_Resume.pdf`.replace(/\s+/g, "_");

      pdf.save(filename);
      toast("Resume downloaded successfully!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast("Error generating PDF. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div id="noPrint">
          <div className="my-10 mx-10 md:mx-20 lg:mx-36">
            <h2 className="text-center text-2xl font-medium">
              Congrats! Your Ultimate AI Resume is ready!
            </h2>
            <p className="text-center text-gray-400">
              Now you are ready to download your resume and you can share the unique
              resume URL with your friends and family
            </p>
            <div className="flex justify-center gap-4 my-10">
              <Button 
                onClick={HandleDownload} 
                disabled={downloading}
                className="flex items-center gap-2"
              >
                {downloading ? (
                  <>
                    <LoaderCircle className="animate-spin h-4 w-4" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4" />
                    Download PDF
                  </>
                )}
              </Button>
              <RWebShare
                data={{
                  text: "Check out my resume!",
                  url: import.meta.env.VITE_BASE_URL + "/dashboard/view-resume/" + resume_id,
                  title: "My Resume",
                }}
                onClick={() => toast("Resume Shared Successfully")}
              >
                <Button variant="outline" className="flex items-center gap-2">
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
              </RWebShare>
            </div>
          </div>
        </div>
        <div
          id="resume-preview-container"
          className="bg-white rounded-lg shadow-lg"
          style={{ width: "210mm", minHeight: "297mm" }}
        >
          <ResumePreview />
        </div>
      </div>
    </>
  );
}

export default ViewResume;

