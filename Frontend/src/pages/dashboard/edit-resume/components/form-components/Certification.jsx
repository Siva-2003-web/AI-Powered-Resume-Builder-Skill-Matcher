import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LoaderCircle, Award } from "lucide-react";
import { useDispatch } from "react-redux";
import { addResumeData } from "@/features/resume/resumeFeatures";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { updateThisResume } from "@/Services/resumeAPI";

const formFields = {
  certificationName: "",
  issuingOrganization: "",
  issueDate: "",
  expirationDate: "",
  credentialId: "",
  credentialUrl: "",
  description: "",
};

function Certification({ resumeInfo, enanbledNext, enanbledPrev }) {
  const [certificationList, setCertificationList] = React.useState(
    resumeInfo?.certifications || [{ ...formFields }]
  );
  const { resume_id } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    dispatch(addResumeData({ ...resumeInfo, certifications: certificationList }));
  }, [certificationList]);

  const AddNewCertification = () => {
    setCertificationList([...certificationList, { ...formFields }]);
  };

  const RemoveCertification = () => {
    setCertificationList((certificationList) => certificationList.slice(0, -1));
  };

  const onSave = () => {
    setLoading(true);
    const data = {
      data: {
        certifications: certificationList,
      },
    };
    if (resume_id) {
      console.log("Started Updating Certifications");
      updateThisResume(resume_id, data)
        .then((data) => {
          toast("Certifications Updated", "success");
          enanbledNext(true); // Re-enable next after saving
        })
        .catch((error) => {
          toast("Error updating certifications", `${error.message}`);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const handleChange = (e, index) => {
    // Don't disable next button - certifications are optional
    const { name, value } = e.target;
    const list = [...certificationList];
    const newListData = {
      ...list[index],
      [name]: value,
    };
    list[index] = newListData;
    setCertificationList(list);
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <div className="flex items-center gap-2 mb-2">
        <Award className="w-6 h-6 text-primary" />
        <h2 className="font-bold text-lg">Certifications</h2>
      </div>
      <p className="text-gray-600">Add your professional certifications and credentials (Optional)</p>

      <div>
        {certificationList.map((item, index) => (
          <div key={index}>
            <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
              <div className="col-span-2">
                <label className="text-sm">Certification Name *</label>
                <Input
                  name="certificationName"
                  placeholder="e.g., AWS Solutions Architect"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item?.certificationName}
                />
              </div>
              <div className="col-span-2">
                <label className="text-sm">Issuing Organization *</label>
                <Input
                  name="issuingOrganization"
                  placeholder="e.g., Amazon Web Services"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item?.issuingOrganization}
                />
              </div>
              <div>
                <label className="text-sm">Issue Date</label>
                <Input
                  type="date"
                  name="issueDate"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item?.issueDate}
                />
              </div>
              <div>
                <label className="text-sm">Expiration Date (Optional)</label>
                <Input
                  type="date"
                  name="expirationDate"
                  placeholder="Leave blank if no expiration"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item?.expirationDate}
                />
              </div>
              <div>
                <label className="text-sm">Credential ID (Optional)</label>
                <Input
                  name="credentialId"
                  placeholder="e.g., ABC123XYZ"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item?.credentialId}
                />
              </div>
              <div>
                <label className="text-sm">Credential URL (Optional)</label>
                <Input
                  name="credentialUrl"
                  placeholder="https://verify.example.com/..."
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item?.credentialUrl}
                />
              </div>
              <div className="col-span-2">
                <label className="text-sm">Description (Optional)</label>
                <Textarea
                  name="description"
                  placeholder="Brief description of the certification..."
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item?.description}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={AddNewCertification}
            className="text-primary"
          >
            + Add More Certification
          </Button>
          <Button
            variant="outline"
            onClick={RemoveCertification}
            className="text-primary"
            disabled={certificationList.length <= 1}
          >
            - Remove
          </Button>
        </div>
        <Button disabled={loading} onClick={() => onSave()}>
          {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
        </Button>
      </div>
    </div>
  );
}

export default Certification;
