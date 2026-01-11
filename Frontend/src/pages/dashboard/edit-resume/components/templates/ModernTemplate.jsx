import React from "react";

// Modern Template - Two-column layout with sidebar for skills and contact
function ModernTemplate({ resumeData }) {
  const themeColor = resumeData?.themeColor || "#3b82f6";

  return (
    <div className="shadow-lg h-full bg-white flex">
      {/* Left Sidebar */}
      <div
        className="w-1/3 p-6 text-white"
        style={{ backgroundColor: themeColor }}
      >
        {/* Profile Section */}
        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-white/20 rounded-full mx-auto mb-3 flex items-center justify-center">
            <span className="text-2xl font-bold">
              {resumeData?.firstName?.[0]}{resumeData?.lastName?.[0]}
            </span>
          </div>
          <h1 className="font-bold text-lg">
            {resumeData?.firstName} {resumeData?.lastName}
          </h1>
          <p className="text-xs opacity-90 mt-1">{resumeData?.jobTitle}</p>
        </div>

        {/* Contact */}
        <div className="mb-6">
          <h2 className="font-bold text-sm mb-3 border-b border-white/30 pb-1">
            Contact
          </h2>
          <div className="space-y-2 text-xs">
            {resumeData?.phone && (
              <div className="flex items-center gap-2">
                <span>📞</span>
                <span>{resumeData.phone}</span>
              </div>
            )}
            {resumeData?.email && (
              <div className="flex items-center gap-2">
                <span>✉️</span>
                <span className="break-all">{resumeData.email}</span>
              </div>
            )}
            {resumeData?.address && (
              <div className="flex items-center gap-2">
                <span>📍</span>
                <span>{resumeData.address}</span>
              </div>
            )}
          </div>
        </div>

        {/* Skills */}
        {resumeData?.skills && resumeData.skills.length > 0 && (
          <div className="mb-6">
            <h2 className="font-bold text-sm mb-3 border-b border-white/30 pb-1">
              Skills
            </h2>
            <div className="space-y-2">
              {resumeData.skills.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between text-xs mb-1">
                    <span>{skill.name}</span>
                  </div>
                  <div className="h-1.5 bg-white/30 rounded">
                    <div
                      className="h-1.5 bg-white rounded"
                      style={{ width: `${(skill.rating || 0) * 20}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {resumeData?.education && resumeData.education.length > 0 && (
          <div>
            <h2 className="font-bold text-sm mb-3 border-b border-white/30 pb-1">
              Education
            </h2>
            <div className="space-y-3">
              {resumeData.education.map((edu, index) => (
                <div key={index} className="text-xs">
                  <p className="font-semibold">{edu.degree}</p>
                  <p className="opacity-90">{edu.major}</p>
                  <p className="opacity-75">{edu.universityName}</p>
                  <p className="opacity-60 text-[10px]">
                    {edu.startDate} - {edu.endDate}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Content */}
      <div className="w-2/3 p-6">
        {/* Summary */}
        {resumeData?.summary && (
          <div className="mb-6">
            <h2
              className="font-bold text-sm mb-2 border-b-2 pb-1"
              style={{ color: themeColor, borderColor: themeColor }}
            >
              About Me
            </h2>
            <p className="text-xs leading-relaxed text-gray-700">
              {resumeData.summary}
            </p>
          </div>
        )}

        {/* Experience */}
        {resumeData?.experience && resumeData.experience.length > 0 && (
          <div className="mb-6">
            <h2
              className="font-bold text-sm mb-2 border-b-2 pb-1"
              style={{ color: themeColor, borderColor: themeColor }}
            >
              Work Experience
            </h2>
            <div className="space-y-4">
              {resumeData.experience.map((exp, index) => (
                <div key={index} className="relative pl-4 border-l-2" style={{ borderColor: themeColor }}>
                  <div
                    className="absolute w-2 h-2 rounded-full -left-[5px] top-1"
                    style={{ backgroundColor: themeColor }}
                  />
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xs font-bold">{exp.title}</h3>
                      <p className="text-xs text-gray-600">
                        {exp.companyName} | {exp.city}, {exp.state}
                      </p>
                    </div>
                    <span className="text-[10px] text-gray-500">
                      {exp.startDate} - {exp.endDate || "Present"}
                    </span>
                  </div>
                  <div
                    className="text-xs mt-1 text-gray-600 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: exp.workSummary }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {resumeData?.projects && resumeData.projects.length > 0 && (
          <div>
            <h2
              className="font-bold text-sm mb-2 border-b-2 pb-1"
              style={{ color: themeColor, borderColor: themeColor }}
            >
              Projects
            </h2>
            <div className="space-y-3">
              {resumeData.projects.map((project, index) => (
                <div key={index}>
                  <h3 className="text-xs font-bold" style={{ color: themeColor }}>
                    {project.projectName}
                  </h3>
                  {project.techStack && (
                    <p className="text-xs text-gray-500">Tech: {project.techStack}</p>
                  )}
                  <div
                    className="text-xs text-gray-600 mt-1"
                    dangerouslySetInnerHTML={{ __html: project.projectSummary }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ModernTemplate;
