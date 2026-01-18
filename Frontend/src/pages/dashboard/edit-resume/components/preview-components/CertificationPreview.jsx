// CertificationPreview component

function CertificationPreview({ resumeInfo }) {
  return (
    <div className="my-6">
      {resumeInfo?.certifications && resumeInfo.certifications.length > 0 && (
        <>
          <h2
            className="text-center font-bold text-sm mb-2"
            style={{
              color: resumeInfo?.themeColor,
            }}
          >
            Certifications
          </h2>
          <hr
            style={{
              borderColor: resumeInfo?.themeColor,
            }}
          />

          {resumeInfo.certifications.map((cert, index) => (
            <div key={index} className="my-3">
              <h2 className="text-xs font-bold text-black">
                {cert?.certificationName}
              </h2>
              <h2 className="text-xs text-gray-600">
                {cert?.issuingOrganization}
              </h2>
              <h2 className="text-xs text-gray-500">
                {cert?.issueDate}
                {cert?.expirationDate ? ` - ${cert.expirationDate}` : ''}
              </h2>
              {cert?.credentialId && (
                <p className="text-xs text-gray-400">
                  ID: {cert.credentialId}
                </p>
              )}
              {cert?.credentialUrl && (
                <a
                  href={cert.credentialUrl}
                  className="text-xs hover:underline"
                  style={{ color: resumeInfo?.themeColor }}
                >
                  View Credential
                </a>
              )}
              {cert?.description && (
                <p className="text-xs text-black mt-1">{cert.description}</p>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default CertificationPreview;
