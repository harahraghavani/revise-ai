"use server";

import { smoothStream, streamText } from "ai";
import { createStreamableValue } from "ai/rsc";
import { googleProvider } from "../utility/models";

export const generateStreamedTextData = async ({
  prompt,
  model,
  systemPrompt,
}) => {
  try {
    // ------ GOOGLE PROVIDER ------
    const google = googleProvider();
    const generativeModel = google(model);

    let stream = createStreamableValue("");

    (async () => {
      const { textStream } = await streamText({
        model: generativeModel,
        prompt,
        system: systemPrompt,
        // experimental_transform: smoothStream(),
        experimental_transform: smoothStream({
          delayInMs: 15, // Adjust for smoother streaming
          chunking: "word", // Stream word by word for natural reading
        }),
        temperature: 0.7, // Add temperature for controlled creativity
        maxTokens: 1000, // Set a reasonable token limit
        topP: 0.95, // Control diversity of responses
      });

      for await (const delta of textStream) {
        stream.update(delta);
      }

      stream.done();
    })();

    return { output: stream.value };
  } catch (error) {
    return {
      output: null,
      isError: true,
      error: error.message || "An unexpected error occurred.",
    };
  }
};
