import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { LoaderCircle, Sparkles } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addResumeData } from "@/features/resume/resumeFeatures";
import { updateResumeData } from "@/Services/GlobalApi";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { updateThisResume } from "@/Services/resumeAPI";
import { AIChatSession } from "@/Services/AiModel";

const SKILLS_PROMPT = `For the job title "{jobTitle}", suggest the top 10 most important and relevant skills that a candidate should have.
Include a mix of technical skills and soft skills.
Respond ONLY with a JSON object in this exact format:
{
  "skills": [
    {"name": "Skill Name 1", "rating": 4},
    {"name": "Skill Name 2", "rating": 5}
  ]
}
The rating should be between 1-5 representing typical proficiency level needed.`;

function Skills({ resumeInfo, enanbledNext }) {
  const [loading, setLoading] = React.useState(false);
  const [aiLoading, setAiLoading] = React.useState(false);
  const [skillsList, setSkillsList] = React.useState(
    resumeInfo?.skills || [
      {
        name: "",
        rating: 0,
      },
    ]
  );
  const dispatch = useDispatch();
  const { resume_id } = useParams();

  useEffect(() => {
    try {
      dispatch(addResumeData({ ...resumeInfo, skills: skillsList }));
    } catch (error) {
      console.log("error in experience context update", error);
    }
  }, [skillsList]);

  const AddNewSkills = () => {
    const list = [...skillsList];
    list.push({ name: "", rating: 0 });
    setSkillsList(list);
  };

  const RemoveSkills = () => {
    const list = [...skillsList];
    list.pop();
    setSkillsList(list);
  };

  const handleChange = (index, key, value) => {
    const list = [...skillsList];
    const newListData = {
      ...list[index],
      [key]: value,
    };
    list[index] = newListData;
    setSkillsList(list);
  };

  const GenerateSkillsFromAI = async () => {
    if (!resumeInfo?.jobTitle) {
      toast("Please add Job Title first in Personal Details section");
      return;
    }
    
    setAiLoading(true);
    const prompt = SKILLS_PROMPT.replace("{jobTitle}", resumeInfo.jobTitle);
    
    try {
      const result = await AIChatSession.sendMessage(prompt);
      const responseText = result.response.text();
      console.log("AI Skills Response:", responseText);
      
      const parsedResponse = JSON.parse(responseText);
      
      if (parsedResponse.skills && Array.isArray(parsedResponse.skills)) {
        setSkillsList(parsedResponse.skills);
        toast("Skills generated successfully!");
      } else {
        toast("Invalid response format from AI");
      }
    } catch (error) {
      console.error("Error generating skills:", error);
      toast("Error generating skills: " + error.message);
    } finally {
      setAiLoading(false);
    }
  };

  const onSave = () => {
    setLoading(true);
    const data = {
      data: {
        skills: skillsList,
      },
    };

    if (resume_id) {
      console.log("Started Updating Skills");
      updateThisResume(resume_id, data)
        .then((data) => {
          toast("Resume Updated", "success");
        })
        .catch((error) => {
          toast("Error updating resume", `${error.message}`);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };
  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="font-bold text-lg">Skills</h2>
          <p>Add Your top professional key skills</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={GenerateSkillsFromAI}
          disabled={aiLoading}
          className="border-primary text-primary flex gap-2"
        >
          {aiLoading ? (
            <LoaderCircle className="animate-spin h-4 w-4" />
          ) : (
            <>
              <Sparkles className="h-4 w-4" /> Generate from AI
            </>
          )}
        </Button>
      </div>

      <div>
        {skillsList.map((item, index) => (
          <div
            key={index}
            className="flex justify-between mb-2 border rounded-lg p-3 "
          >
            <div>
              <label className="text-xs">Name</label>
              <Input
                className="w-full"
                defaultValue={item.name}
                onChange={(e) => handleChange(index, "name", e.target.value)}
              />
            </div>
            <Rating
              style={{ maxWidth: 120 }}
              value={item.rating}
              onChange={(v) => handleChange(index, "rating", v)}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={AddNewSkills}
            className="text-primary"
          >
            {" "}
            + Add More Skill
          </Button>
          <Button
            variant="outline"
            onClick={RemoveSkills}
            className="text-primary"
          >
            {" "}
            - Remove
          </Button>
        </div>
        <Button disabled={loading} onClick={onSave}>
          {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
        </Button>
      </div>
    </div>
  );
}

export default Skills;
