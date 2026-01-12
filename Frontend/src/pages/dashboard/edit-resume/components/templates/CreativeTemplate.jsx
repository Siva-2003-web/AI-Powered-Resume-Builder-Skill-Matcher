import React from "react";

// Creative Template - Colorful, modern, with visual flair
function CreativeTemplate({ resumeData }) {
  const themeColor = resumeData?.themeColor || "#EC4899";

  return (
    <div className="shadow-lg h-full bg-white">
      {/* Colorful Header Section */}
      <div className="p-10 text-white" style={{ backgroundColor: themeColor }}>
        <h1 className="font-bold text-3xl">
          {resumeData?.firstName} {resumeData?.lastName}
        </h1>
        <p className="text-lg font-medium mt-2 opacity-90">{resumeData?.jobTitle}</p>
        <div className="flex gap-4 mt-3 text-sm opacity-80">
          <span>{resumeData?.phone}</span>
          <span>•</span>
          <span>{resumeData?.email}</span>
          <span>•</span>
          <span>{resumeData?.address}</span>
        </div>
      </div>

      <div className="p-10">
        {/* Summary */}
        {resumeData?.summary && (
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-2 h-8 rounded" style={{ backgroundColor: themeColor }}></div>
              <h2 className="font-bold text-lg" style={{ color: themeColor }}>
                About Me
              </h2>
            </div>
            <p className="text-xs leading-relaxed text-gray-700 ml-5">{resumeData.summary}</p>
          </div>
        )}

        {/* Experience */}
        {resumeData?.experience && resumeData.experience.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-2 h-8 rounded" style={{ backgroundColor: themeColor }}></div>
              <h2 className="font-bold text-lg" style={{ color: themeColor }}>
                Experience
              </h2>
            </div>
            {resumeData.experience.map((exp, index) => (
              <div key={index} className="mt-4 ml-5 relative pl-4 border-l-2" style={{ borderColor: `${themeColor}40` }}>
                <div 
                  className="absolute -left-2 top-1 w-3 h-3 rounded-full" 
                  style={{ backgroundColor: themeColor }}
                ></div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-bold text-gray-800">{exp.title}</h3>
                    <p className="text-xs font-semibold" style={{ color: themeColor }}>{exp.companyName}</p>
                    <p className="text-xs text-gray-500">{exp.city}, {exp.state}</p>
                  </div>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
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

        {/* Projects */}
        {resumeData?.projects && resumeData.projects.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-2 h-8 rounded" style={{ backgroundColor: themeColor }}></div>
              <h2 className="font-bold text-lg" style={{ color: themeColor }}>
                Projects
              </h2>
            </div>
            {resumeData.projects.map((project, index) => (
              <div key={index} className="mt-3 ml-5 p-3 rounded-lg" style={{ backgroundColor: `${themeColor}10` }}>
                <h3 className="text-sm font-bold" style={{ color: themeColor }}>{project.projectName}</h3>
                {project.techStack && (
                  <p className="text-xs text-gray-600 mt-1">
                    <span className="font-semibold">Tech:</span> {project.techStack}
                  </p>
                )}
                <div
                  className="text-xs mt-2 leading-relaxed text-gray-600"
                  dangerouslySetInnerHTML={{ __html: project.projectSummary }}
                />
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {resumeData?.education && resumeData.education.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-2 h-8 rounded" style={{ backgroundColor: themeColor }}></div>
              <h2 className="font-bold text-lg" style={{ color: themeColor }}>
                Education
              </h2>
            </div>
            {resumeData.education.map((edu, index) => (
              <div key={index} className="mt-3 ml-5">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-bold text-gray-800">{edu.degree} in {edu.major}</h3>
                    <p className="text-xs text-gray-600">{edu.universityName}</p>
                  </div>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {edu.startDate} - {edu.endDate}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {resumeData?.skills && resumeData.skills.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-2 h-8 rounded" style={{ backgroundColor: themeColor }}></div>
              <h2 className="font-bold text-lg" style={{ color: themeColor }}>
                Skills
              </h2>
            </div>
            <div className="flex flex-wrap gap-2 ml-5">
              {resumeData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full text-xs font-medium text-white"
                  style={{ backgroundColor: themeColor }}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreativeTemplate;
