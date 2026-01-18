import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { addResumeData } from "@/features/resume/resumeFeatures";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import { LoaderCircle, Upload, User, Github, Linkedin, Globe, X } from "lucide-react";
import { toast } from "sonner";
import { updateThisResume } from "@/Services/resumeAPI";

function PersonalDetails({ resumeInfo, enanbledNext }) {
  const { resume_id } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const fileInputRef = useRef(null);
  const [formData, setFormData] = React.useState({
    firstName: resumeInfo?.firstName || "",
    lastName: resumeInfo?.lastName || "",
    jobTitle: resumeInfo?.jobTitle || "",
    address: resumeInfo?.address || "",
    phone: resumeInfo?.phone || "",
    email: resumeInfo?.email || "",
    profilePicture: resumeInfo?.profilePicture || "",
    githubUrl: resumeInfo?.githubUrl || "",
    linkedinUrl: resumeInfo?.linkedinUrl || "",
    websiteUrl: resumeInfo?.websiteUrl || "",
  });

  const handleInputChange = (e) => {
    enanbledNext(false);
    dispatch(
      addResumeData({
        ...resumeInfo,
        [e.target.name]: e.target.value,
      })
    );
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Image size should be less than 2MB");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        enanbledNext(false);
        dispatch(
          addResumeData({
            ...resumeInfo,
            profilePicture: base64String,
          })
        );
        setFormData({
          ...formData,
          profilePicture: base64String,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeProfilePicture = () => {
    enanbledNext(false);
    dispatch(
      addResumeData({
        ...resumeInfo,
        profilePicture: "",
      })
    );
    setFormData({
      ...formData,
      profilePicture: "",
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onSave = async (e) => {
    setLoading(true);
    e.preventDefault();
    console.log("Personal Details Save Started");
    const data = {
      data: {
        firstName: e.target.firstName.value,
        lastName: e.target.lastName.value,
        jobTitle: e.target.jobTitle.value,
        address: e.target.address.value,
        phone: e.target.phone.value,
        email: e.target.email.value,
        profilePicture: formData.profilePicture,
        githubUrl: e.target.githubUrl?.value || "",
        linkedinUrl: e.target.linkedinUrl?.value || "",
        websiteUrl: e.target.websiteUrl?.value || "",
      },
    };
    if (resume_id) {
      try {
        const response = await updateThisResume(resume_id, data);
        toast("Resume Updated", "success");
      } catch (error) {
        toast(error.message, `failed`);
        console.log(error.message);
      } finally {
        enanbledNext(true);
        setLoading(false);
      }
    }
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Personal Detail</h2>
      <p>Get Started with the basic information</p>

      <form onSubmit={onSave}>
        {/* Profile Picture Section */}
        <div className="mt-5 mb-5">
          <label className="text-sm font-semibold block mb-2">Profile Picture (Optional)</label>
          <div className="flex items-center gap-4">
            {formData.profilePicture ? (
              <div className="relative">
                <img
                  src={formData.profilePicture}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border-2 border-primary shadow-md"
                />
                <button
                  type="button"
                  onClick={removeProfilePicture}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center">
                <User className="w-10 h-10 text-gray-400" />
              </div>
            )}
            <div>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="profile-upload"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2"
              >
                <Upload className="w-4 h-4" />
                {formData.profilePicture ? "Change Photo" : "Upload Photo"}
              </Button>
              <p className="text-xs text-gray-500 mt-1">Max size: 2MB</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 mt-5 gap-3">
          <div>
            <label className="text-sm">First Name</label>
            <Input
              name="firstName"
              defaultValue={resumeInfo?.firstName}
              required
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="text-sm">Last Name</label>
            <Input
              name="lastName"
              required
              onChange={handleInputChange}
              defaultValue={resumeInfo?.lastName}
            />
          </div>
          <div className="col-span-2">
            <label className="text-sm">Job Title</label>
            <Input
              name="jobTitle"
              defaultValue={resumeInfo?.jobTitle}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-2">
            <label className="text-sm">Address</label>
            <Input
              name="address"
              required
              defaultValue={resumeInfo?.address}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="text-sm">Phone</label>
            <Input
              name="phone"
              required
              defaultValue={resumeInfo?.phone}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="text-sm">Email</label>
            <Input
              name="email"
              required
              defaultValue={resumeInfo?.email}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Social Links Section */}
        <div className="mt-5 pt-5 border-t">
          <h3 className="font-semibold text-md mb-3 flex items-center gap-2">
            <Globe className="w-4 h-4" />
            Social Links (Optional)
          </h3>
          <div className="grid grid-cols-1 gap-3">
            <div>
              <label className="text-sm flex items-center gap-2">
                <Github className="w-4 h-4" />
                GitHub URL
              </label>
              <Input
                name="githubUrl"
                placeholder="https://github.com/yourusername"
                defaultValue={resumeInfo?.githubUrl}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="text-sm flex items-center gap-2">
                <Linkedin className="w-4 h-4" />
                LinkedIn URL
              </label>
              <Input
                name="linkedinUrl"
                placeholder="https://linkedin.com/in/yourusername"
                defaultValue={resumeInfo?.linkedinUrl}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="text-sm flex items-center gap-2">
                <Globe className="w-4 h-4" />
                Website URL
              </label>
              <Input
                name="websiteUrl"
                placeholder="https://yourwebsite.com"
                defaultValue={resumeInfo?.websiteUrl}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        <div className="mt-3 flex justify-end">
          <Button type="submit" disabled={loading}>
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default PersonalDetails;

