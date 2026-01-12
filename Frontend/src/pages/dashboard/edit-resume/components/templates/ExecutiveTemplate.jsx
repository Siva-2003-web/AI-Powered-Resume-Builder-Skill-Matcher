import React from "react";

// Executive Template - Professional, bold headers, emphasis on leadership
function ExecutiveTemplate({ resumeData }) {
  const themeColor = resumeData?.themeColor || "#1E40AF";

  return (
    <div className="shadow-lg h-full p-14 bg-white">
      {/* Header - Bold Executive Style */}
      <div className="mb-6 pb-4 border-b-4" style={{ borderColor: themeColor }}>
        <h1
          className="font-bold text-3xl uppercase tracking-wide"
          style={{ color: themeColor }}
        >
          {resumeData?.firstName} {resumeData?.lastName}
        </h1>
        <p className="text-base font-semibold mt-2 uppercase tracking-wider" style={{ color: themeColor }}>
          {resumeData?.jobTitle}
        </p>
        <div className="flex gap-6 mt-3 text-xs text-gray-600">
          <span>{resumeData?.phone}</span>
          <span>{resumeData?.email}</span>
          <span>{resumeData?.address}</span>
        </div>
      </div>

      {/* Summary */}
      {resumeData?.summary && (
        <div className="mb-6">
          <h2 
            className="font-bold text-base mb-3 uppercase tracking-wide pb-1 border-b-2" 
            style={{ color: themeColor, borderColor: themeColor }}
          >
            Executive Summary
          </h2>
          <p className="text-xs leading-relaxed text-gray-700">{resumeData.summary}</p>
        </div>
      )}

      {/* Experience */}
      {resumeData?.experience && resumeData.experience.length > 0 && (
        <div className="mb-6">
          <h2 
            className="font-bold text-base mb-3 uppercase tracking-wide pb-1 border-b-2" 
            style={{ color: themeColor, borderColor: themeColor }}
          >
            Professional Experience
          </h2>
          {resumeData.experience.map((exp, index) => (
            <div key={index} className="mt-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-sm font-bold" style={{ color: themeColor }}>{exp.title}</h3>
                  <p className="text-xs font-semibold text-gray-700">{exp.companyName}</p>
                  <p className="text-xs text-gray-500">{exp.city}, {exp.state}</p>
                </div>
                <span className="text-xs text-gray-500 font-medium">
                  {exp.startDate} - {exp.endDate || "Present"}
                </span>
              </div>
              <div
                className="text-xs mt-2 leading-relaxed text-gray-600"
                dangerouslySetInnerHTML={{ __html: exp.workSummary }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {resumeData?.education && resumeData.education.length > 0 && (
        <div className="mb-6">
          <h2 
            className="font-bold text-base mb-3 uppercase tracking-wide pb-1 border-b-2" 
            style={{ color: themeColor, borderColor: themeColor }}
          >
            Education
          </h2>
          {resumeData.education.map((edu, index) => (
            <div key={index} className="mt-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-sm font-bold">{edu.degree} in {edu.major}</h3>
                  <p className="text-xs text-gray-600">{edu.universityName}</p>
                </div>
                <span className="text-xs text-gray-500">
                  {edu.startDate} - {edu.endDate}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {resumeData?.skills && resumeData.skills.length > 0 && (
        <div className="mb-6">
          <h2 
            className="font-bold text-base mb-3 uppercase tracking-wide pb-1 border-b-2" 
            style={{ color: themeColor, borderColor: themeColor }}
          >
            Core Competencies
          </h2>
          <div className="grid grid-cols-3 gap-3 mt-2">
            {resumeData.skills.map((skill, index) => (
              <div key={index} className="text-xs font-medium text-gray-700">
                • {skill.name}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {resumeData?.projects && resumeData.projects.length > 0 && (
        <div className="mb-4">
          <h2 
            className="font-bold text-base mb-3 uppercase tracking-wide pb-1 border-b-2" 
            style={{ color: themeColor, borderColor: themeColor }}
          >
            Key Initiatives
          </h2>
          {resumeData.projects.map((project, index) => (
            <div key={index} className="mt-3">
              <h3 className="text-sm font-bold" style={{ color: themeColor }}>{project.projectName}</h3>
              {project.techStack && (
                <p className="text-xs text-gray-600 italic">Technologies: {project.techStack}</p>
              )}
              <div
                className="text-xs mt-1 leading-relaxed text-gray-600"
                dangerouslySetInnerHTML={{ __html: project.projectSummary }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ExecutiveTemplate;
