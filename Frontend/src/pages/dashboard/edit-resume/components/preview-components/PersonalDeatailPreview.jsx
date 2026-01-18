import React from "react";

function PersonalDeatailPreview({ resumeInfo }) {
  return (
    <div>
      {/* Profile Picture */}
      {resumeInfo?.profilePicture && (
        <div className="flex justify-center mb-3">
          <img
            src={resumeInfo.profilePicture}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover border-2"
            style={{ borderColor: resumeInfo?.themeColor }}
          />
        </div>
      )}
      <h2
        className="font-bold text-xl text-center"
        style={{
          color: resumeInfo?.themeColor,
        }}
      >
        {resumeInfo?.firstName} {resumeInfo?.lastName}
      </h2>
      <h2 className="text-center text-sm font-medium text-black">
        {resumeInfo?.jobTitle}
      </h2>
      <h2
        className="text-center font-normal text-xs"
        style={{
          color: resumeInfo?.themeColor,
        }}
      >
        {resumeInfo?.address}
      </h2>

      <div className="flex justify-between">
        <h2
          className="font-normal text-xs"
          style={{
            color: resumeInfo?.themeColor,
          }}
        >
          {resumeInfo?.phone}
        </h2>
        <h2
          className="font-normal text-xs"
          style={{
            color: resumeInfo?.themeColor,
          }}
        >
          {resumeInfo?.email}
        </h2>
      </div>
      
      {/* Social Links */}
      {(resumeInfo?.githubUrl || resumeInfo?.linkedinUrl || resumeInfo?.websiteUrl) && (
        <div className="flex justify-center gap-3 mt-1">
          {resumeInfo?.githubUrl && (
            <a
              href={resumeInfo.githubUrl}
              className="text-xs hover:underline"
              style={{ color: resumeInfo?.themeColor }}
            >
              GitHub
            </a>
          )}
          {resumeInfo?.linkedinUrl && (
            <a
              href={resumeInfo.linkedinUrl}
              className="text-xs hover:underline"
              style={{ color: resumeInfo?.themeColor }}
            >
              LinkedIn
            </a>
          )}
          {resumeInfo?.websiteUrl && (
            <a
              href={resumeInfo.websiteUrl}
              className="text-xs hover:underline"
              style={{ color: resumeInfo?.themeColor }}
            >
              Website
            </a>
          )}
        </div>
      )}
      
      <hr
        className="border-[1.5px] my-2"
        style={{
          borderColor: resumeInfo?.themeColor,
        }}
      />
    </div>
  );
}

export default PersonalDeatailPreview;

