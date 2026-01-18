import React from "react";

// Minimal Template - Clean, lots of whitespace, elegant typography
function MinimalTemplate({ resumeData }) {
  const themeColor = resumeData?.themeColor || "#18181b";

  return (
    <div className="shadow-lg h-full p-12 bg-white">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-start gap-6">
          {/* Profile Picture */}
          {resumeData?.profilePicture && (
            <img
              src={resumeData.profilePicture}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover"
              style={{ border: `2px solid ${themeColor}` }}
            />
          )}
          <div className="flex-1">
            <h1 className="text-3xl font-extralight tracking-wide" style={{ color: themeColor }}>
              {resumeData?.firstName?.toUpperCase()} {resumeData?.lastName?.toUpperCase()}
            </h1>
            <p className="text-sm text-gray-500 mt-1 tracking-widest uppercase">
              {resumeData?.jobTitle}
            </p>
            <div className="flex gap-6 mt-3 text-xs text-gray-400">
              {resumeData?.email && <span>{resumeData.email}</span>}
              {resumeData?.phone && <span>{resumeData.phone}</span>}
              {resumeData?.address && <span>{resumeData.address}</span>}
            </div>
            {/* Social Links */}
            {(resumeData?.githubUrl || resumeData?.linkedinUrl || resumeData?.websiteUrl) && (
              <div className="flex gap-6 mt-2 text-xs">
                {resumeData?.githubUrl && (
                  <a href={resumeData.githubUrl} className="hover:underline" style={{ color: themeColor }}>
                    GitHub
                  </a>
                )}
                {resumeData?.linkedinUrl && (
                  <a href={resumeData.linkedinUrl} className="hover:underline" style={{ color: themeColor }}>
                    LinkedIn
                  </a>
                )}
                {resumeData?.websiteUrl && (
                  <a href={resumeData.websiteUrl} className="hover:underline" style={{ color: themeColor }}>
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
        <div className="mb-8">
          <p className="text-xs leading-relaxed text-black max-w-2xl">
            {resumeData.summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {resumeData?.experience && resumeData.experience.length > 0 && (
        <div className="mb-8">
          <h2
            className="text-xs font-bold tracking-widest uppercase mb-4 pb-2 border-b"
            style={{ color: themeColor, borderColor: themeColor }}
          >
            Experience
          </h2>
          <div className="space-y-6">
            {resumeData.experience.map((exp, index) => (
              <div key={index} className="grid grid-cols-[120px_1fr] gap-4">
                <div className="text-[10px] text-gray-400">
                  <p>{exp.startDate}</p>
                  <p>{exp.endDate || "Present"}</p>
                </div>
                <div>
                  <h3 className="text-xs font-semibold">{exp.title}</h3>
                  <p className="text-xs text-gray-500 mb-2">
                    {exp.companyName}, {exp.city}
                  </p>
                  <div
                    className="text-xs text-gray-600 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: exp.workSummary }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {resumeData?.projects && resumeData.projects.length > 0 && (
        <div className="mb-8">
          <h2
            className="text-xs font-bold tracking-widest uppercase mb-4 pb-2 border-b"
            style={{ color: themeColor, borderColor: themeColor }}
          >
            Projects
          </h2>
          <div className="space-y-4">
            {resumeData.projects.map((project, index) => (
              <div key={index}>
                <h3 className="text-xs font-semibold">{project.projectName}</h3>
                {project.techStack && (
                  <p className="text-[10px] text-gray-500">Tech: {project.techStack}</p>
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

      {/* Two Column Section: Education & Skills */}
      <div className="grid grid-cols-2 gap-8">
        {/* Education */}
        {resumeData?.education && resumeData.education.length > 0 && (
          <div>
            <h2
              className="text-xs font-bold tracking-widest uppercase mb-4 pb-2 border-b"
              style={{ color: themeColor, borderColor: themeColor }}
            >
              Education
            </h2>
            <div className="space-y-3">
              {resumeData.education.map((edu, index) => (
                <div key={index}>
                  <p className="text-xs font-semibold text-black">{edu.degree}</p>
                  <p className="text-xs text-gray-500">{edu.major}</p>
                  <p className="text-[10px] text-gray-400">{edu.universityName}</p>
                  <p className="text-[10px] text-gray-400">
                    {edu.startDate} — {edu.endDate}
                  </p>
                  {edu.grade && (
                    <p className="text-[10px] text-gray-500">
                      {edu.gradeType || 'CGPA'}: {edu.grade}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {resumeData?.skills && resumeData.skills.length > 0 && (
          <div>
            <h2
              className="text-xs font-bold tracking-widest uppercase mb-4 pb-2 border-b"
              style={{ color: themeColor, borderColor: themeColor }}
            >
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {resumeData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="text-[10px] px-2 py-1 border rounded"
                  style={{ borderColor: themeColor, color: themeColor }}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Certifications */}
      {resumeData?.certifications && resumeData.certifications.length > 0 && (
        <div className="mb-8">
          <h2
            className="text-xs font-bold tracking-widest uppercase mb-4 pb-2 border-b"
            style={{ color: themeColor, borderColor: themeColor }}
          >
            Certifications
          </h2>
          <div className="space-y-4">
            {resumeData.certifications.map((cert, index) => (
              <div key={index}>
                <h3 className="text-xs font-semibold text-black">{cert.certificationName}</h3>
                <p className="text-xs text-gray-500">{cert.issuingOrganization}</p>
                <p className="text-[10px] text-gray-400">
                  {cert.issueDate}{cert.expirationDate ? ` — ${cert.expirationDate}` : ''}
                </p>
                {cert.credentialUrl && (
                  <a href={cert.credentialUrl} className="text-[10px] hover:underline" style={{ color: themeColor }}>
                    Verify
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default MinimalTemplate;

