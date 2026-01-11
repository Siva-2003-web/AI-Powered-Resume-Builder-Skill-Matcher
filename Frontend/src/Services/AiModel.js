import Groq from "groq-sdk";

const apiKey = import.meta.env.VITE_GROQ_API_KEY;

let chatSession = null;

try {
  const groq = new Groq({ apiKey: apiKey, dangerouslyAllowBrowser: true });
  
  const modelName = "llama-3.3-70b-versatile"; 

  chatSession = {
    sendMessage: async (prompt) => {
        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
            model: modelName,
        });

        const responseText = completion.choices[0]?.message?.content || "";
        
        return {
            response: {
                text: () => responseText
            }
        };
    }
  };

} catch (error) {
  console.error("AI Initialization Error:", error);
}

export const AIChatSession = chatSession;
export default AIChatSession;
