import React from "react";

// Executive Template - Professional, bold headers, emphasis on leadership
function ExecutiveTemplate({ resumeData }) {
  const themeColor = resumeData?.themeColor || "#1E40AF";

  return (
    <div className="shadow-lg h-full p-14 bg-white">
      {/* Header - Bold Executive Style */}
      <div className="mb-6 pb-4 border-b-4" style={{ borderColor: themeColor }}>
        <div className="flex items-start gap-6">
          {/* Profile Picture */}
          {resumeData?.profilePicture && (
            <img
              src={resumeData.profilePicture}
              alt="Profile"
              className="w-24 h-24 rounded object-cover"
              style={{ border: `3px solid ${themeColor}` }}
            />
          )}
          <div className="flex-1">
            <h1
              className="font-bold text-3xl uppercase tracking-wide"
              style={{ color: themeColor }}
            >
              {resumeData?.firstName} {resumeData?.lastName}
            </h1>
            <p className="text-base font-semibold mt-2 uppercase tracking-wider" style={{ color: themeColor }}>
              {resumeData?.jobTitle}
            </p>
            <div className="flex gap-6 mt-3 text-xs text-black">
              <span>{resumeData?.phone}</span>
              <span>{resumeData?.email}</span>
              <span>{resumeData?.address}</span>
            </div>
            {/* Social Links */}
            {(resumeData?.githubUrl || resumeData?.linkedinUrl || resumeData?.websiteUrl) && (
              <div className="flex gap-4 mt-2 text-xs">
                {resumeData?.githubUrl && (
                  <a href={resumeData.githubUrl} className="hover:underline font-medium" style={{ color: themeColor }}>
                    GitHub
                  </a>
                )}
                {resumeData?.linkedinUrl && (
                  <a href={resumeData.linkedinUrl} className="hover:underline font-medium" style={{ color: themeColor }}>
                    LinkedIn
                  </a>
                )}
                {resumeData?.websiteUrl && (
                  <a href={resumeData.websiteUrl} className="hover:underline font-medium" style={{ color: themeColor }}>
                    Website
                  </a>
                )}
              </div>
            )}
          </div>
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
          <p className="text-xs leading-relaxed text-black">{resumeData.summary}</p>
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
                  <h3 className="text-sm font-bold text-black">{edu.degree} in {edu.major}</h3>
                  <p className="text-xs text-gray-600">{edu.universityName}</p>
                  {edu.grade && (
                    <p className="text-xs text-gray-500">
                      {edu.gradeType || 'CGPA'}: {edu.grade}
                    </p>
                  )}
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
        <div className="mb-6">
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

      {/* Certifications */}
      {resumeData?.certifications && resumeData.certifications.length > 0 && (
        <div className="mb-4">
          <h2 
            className="font-bold text-base mb-3 uppercase tracking-wide pb-1 border-b-2" 
            style={{ color: themeColor, borderColor: themeColor }}
          >
            Certifications & Credentials
          </h2>
          {resumeData.certifications.map((cert, index) => (
            <div key={index} className="mt-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-sm font-bold text-black">{cert.certificationName}</h3>
                  <p className="text-xs font-semibold text-gray-700">{cert.issuingOrganization}</p>
                </div>
                <span className="text-xs text-gray-500 font-medium">
                  {cert.issueDate}{cert.expirationDate ? ` - ${cert.expirationDate}` : ''}
                </span>
              </div>
              {cert.credentialId && (
                <p className="text-xs text-gray-500">ID: {cert.credentialId}</p>
              )}
              {cert.credentialUrl && (
                <a href={cert.credentialUrl} className="text-xs font-medium hover:underline" style={{ color: themeColor }}>
                  Verify Credential →
                </a>
              )}
              {cert.description && (
                <p className="text-xs text-black mt-1">{cert.description}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ExecutiveTemplate;

