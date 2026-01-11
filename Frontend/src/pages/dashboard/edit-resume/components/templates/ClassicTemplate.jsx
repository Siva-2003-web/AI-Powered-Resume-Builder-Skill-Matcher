import React from "react";

// Classic/Default Template - Single column, traditional layout
function ClassicTemplate({ resumeData }) {
  const themeColor = resumeData?.themeColor || "#000000";

  return (
    <div
      className="shadow-lg h-full p-14 border-t-[20px] bg-white"
      style={{ borderColor: themeColor }}
    >
      {/* Header - Personal Details */}
      <div className="text-center mb-6">
        <h1
          className="font-bold text-2xl"
          style={{ color: themeColor }}
        >
          {resumeData?.firstName} {resumeData?.lastName}
        </h1>
        <p className="text-sm font-medium mt-1">{resumeData?.jobTitle}</p>
        <p className="text-xs mt-1" style={{ color: themeColor }}>
          {resumeData?.address}
        </p>
        <div className="flex justify-center gap-4 mt-2 text-xs" style={{ color: themeColor }}>
          <span>{resumeData?.phone}</span>
          <span>{resumeData?.email}</span>
        </div>
      </div>

      <hr className="border-[1.5px] mb-4" style={{ borderColor: themeColor }} />

      {/* Summary */}
      {resumeData?.summary && (
        <div className="mb-4">
          <h2 className="font-bold text-sm mb-2" style={{ color: themeColor }}>
            Professional Summary
          </h2>
          <p className="text-xs leading-relaxed">{resumeData.summary}</p>
        </div>
      )}

      {/* Experience */}
      {resumeData?.experience && resumeData.experience.length > 0 && (
        <div className="mb-4">
          <h2 className="font-bold text-sm mb-2" style={{ color: themeColor }}>
            Work Experience
          </h2>
          <hr style={{ borderColor: themeColor }} />
          {resumeData.experience.map((exp, index) => (
            <div key={index} className="mt-3">
              <div className="flex justify-between items-center">
                <h3 className="text-xs font-bold">{exp.title}</h3>
                <span className="text-xs text-gray-500">
                  {exp.startDate} - {exp.endDate || "Present"}
                </span>
              </div>
              <p className="text-xs text-gray-600">{exp.companyName}, {exp.city}, {exp.state}</p>
              <div
                className="text-xs mt-1 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: exp.workSummary }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {resumeData?.projects && resumeData.projects.length > 0 && (
        <div className="mb-4">
          <h2 className="font-bold text-sm mb-2" style={{ color: themeColor }}>
            Projects
          </h2>
          <hr style={{ borderColor: themeColor }} />
          {resumeData.projects.map((project, index) => (
            <div key={index} className="mt-3">
              <h3 className="text-xs font-bold">{project.projectName}</h3>
              {project.techStack && (
                <p className="text-xs text-gray-600">Tech Stack: {project.techStack}</p>
              )}
              <div
                className="text-xs mt-1 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: project.projectSummary }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {resumeData?.education && resumeData.education.length > 0 && (
        <div className="mb-4">
          <h2 className="font-bold text-sm mb-2" style={{ color: themeColor }}>
            Education
          </h2>
          <hr style={{ borderColor: themeColor }} />
          {resumeData.education.map((edu, index) => (
            <div key={index} className="mt-3">
              <div className="flex justify-between items-center">
                <h3 className="text-xs font-bold">{edu.degree} in {edu.major}</h3>
                <span className="text-xs text-gray-500">
                  {edu.startDate} - {edu.endDate}
                </span>
              </div>
              <p className="text-xs text-gray-600">{edu.universityName}</p>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {resumeData?.skills && resumeData.skills.length > 0 && (
        <div className="mb-4">
          <h2 className="font-bold text-sm mb-2" style={{ color: themeColor }}>
            Skills
          </h2>
          <hr style={{ borderColor: themeColor }} />
          <div className="grid grid-cols-2 gap-2 mt-2">
            {resumeData.skills.map((skill, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="text-xs">{skill.name}</span>
                <div className="h-1.5 bg-gray-200 flex-1 rounded">
                  <div
                    className="h-1.5 rounded"
                    style={{
                      backgroundColor: themeColor,
                      width: `${(skill.rating || 0) * 20}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ClassicTemplate;
