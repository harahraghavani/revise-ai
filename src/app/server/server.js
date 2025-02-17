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
        experimental_transform: smoothStream(),
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
