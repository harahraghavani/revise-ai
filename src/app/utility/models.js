import { createGoogleGenerativeAI } from "@ai-sdk/google";

export const googleProvider = () => {
  const google = createGoogleGenerativeAI({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_GEMERATIVE_AI_API_KEY || "",
  });

  return google;
};
