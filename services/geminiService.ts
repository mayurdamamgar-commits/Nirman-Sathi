import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real app, you'd handle this more gracefully.
  // For this context, we assume the key is present.
  console.warn("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

// Helper to convert File object to a Gemini-compatible format
const fileToGenerativePart = async (file: File) => {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
};

export const generateSiteReport = async (data: { [key: string]: string | number }): Promise<string> => {
  try {
    const details = `
- Project: ${data.project}
- Date: ${data.date}
- Skilled Labor: ${data.skilledLabor}
- Unskilled Labor: ${data.unskilledLabor}
- Materials Received: ${data.materials || 'None'}
- Equipment Used: ${data.equipment || 'None'}
- Key Activities Performed: ${data.activities || 'None'}

Rough Field Notes for context:
---
${data.notes || 'No specific notes provided.'}
---
`;

    const prompt = `You are an expert project manager. Your task is to analyze the following structured data and rough notes from a construction site and generate a professional, well-formatted Daily Progress Report (DPR). The report must be in markdown format.

The DPR should have the following sections:
1.  **Project Details:** Include the Project Name and Date.
2.  **Labor Summary:** State the number of skilled and unskilled laborers on site.
3.  **Work Progress Summary:** Synthesize the "Key Activities" and "Rough Field Notes" to provide a concise summary of the work completed today.
4.  **Materials Log:** List the materials received.
5.  **Equipment Log:** List the equipment used.
6.  **Remarks & Issues:** Identify and list any issues, delays, or important remarks mentioned in the "Rough Field Notes". If none, state "No issues reported".

Here is the data for today's report:
${details}
`;
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating site report:", error);
    return "Error: Could not generate the report. Please try again.";
  }
};

export const generateMixDesign = async (params: { [key: string]: string }): Promise<string> => {
  try {
    const paramString = Object.entries(params).map(([key, value]) => `- ${key}: ${value}`).join('\n');
    const prompt = `Generate a professional concrete mix design report based on the following parameters. The report should follow the general principles of IS 10262:2009. Include sections for: \n1. Stipulations for Proportioning\n2. Test Data for Materials\n3. Target Strength for Mix Proportioning\n4. Selection of Water-Cement Ratio\n5. Calculation of Cement Content\n6. Proportion of Volume of Coarse and Fine Aggregate\n7. Final Mix Proportions for trial per cubic meter of concrete.\n\nParameters:\n${paramString}`;
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-pro',
        contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating mix design:", error);
    return "Error: Could not generate the mix design. Please try again.";
  }
};

export const generateFloorPlanDescription = async (constraints: { [key: string]: string }): Promise<string> => {
    try {
        const constraintString = Object.entries(constraints).map(([key, value]) => `- ${key}: ${value}`).join('\n');
        const prompt = `Generate a descriptive floor plan concept for a residential building. Be creative but practical. The output should be a detailed text description in markdown format, including:\n- A brief overview of the design philosophy.\n- A room-by-room layout description.\n- Mention of key features and Vastu compliance considerations (e.g., kitchen in South-East, master bedroom in South-West).\n\nConstraints:\n${constraintString}`;
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error generating floor plan description:", error);
        return "Error: Could not generate the floor plan description.";
    }
};

export const generateBOQ = async (description: string): Promise<string> => {
    try {
        const prompt = `Based on the following floor plan description, generate a simplified Bill of Quantities (BOQ). The response must be a JSON object. The JSON should be an array of objects, where each object represents a work item and has the following properties: "item", "quantity" (a number), and "unit" (a string). \n\nFloor Plan Description:\n${description}`;
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-pro',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            item: { type: Type.STRING },
                            quantity: { type: Type.NUMBER },
                            unit: { type: Type.STRING }
                        },
                        required: ["item", "quantity", "unit"]
                    }
                }
            }
        });

        return response.text;
    } catch (error) {
        console.error("Error generating BOQ:", error);
        return "Error: Could not generate the Bill of Quantities.";
    }
};

export const recommendMaterials = async (imageFile: File, style: string): Promise<string> => {
    try {
        const imagePart = await fileToGenerativePart(imageFile);
        const prompt = `Based on this inspiration image for a building's ${style} design, recommend suitable construction and finishing materials available in the Indian market. For each recommendation, provide a description, potential use (e.g., flooring, wall cladding), and general cost category (e.g., Budget-friendly, Mid-range, Premium). Format the output in markdown.`;
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: { parts: [imagePart, { text: prompt }] },
        });

        return response.text;
    } catch (error) {
        console.error("Error recommending materials:", error);
        return "Error: Could not recommend materials.";
    }
};