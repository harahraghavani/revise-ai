export const formateString = (text) => {
  if (text) {
    // Check if the text is a code block
    const isCodeBlock = text.startsWith("```") && text.endsWith("```");

    let plainText;
    if (isCodeBlock) {
      // For code blocks, remove the backticks and language identifier
      plainText = text
        .replace(/^```[\w-]*\n/, "") // Remove opening ```language
        .replace(/```$/, "") // Remove closing ```
        .trim();
    } else {
      // For regular text, remove Markdown formatting
      plainText = text
        .replace(/\*\*(.*?)\*\*/g, "$1") // Remove bold
        .replace(/\*(.*?)\*/g, "$1") // Remove italic
        .replace(/\[(.*?)\]$$.*?$$/g, "$1") // Remove links
        .replace(/^#+\s/gm, "") // Remove heading markers
        .replace(/^[-*+]\s/gm, "") // Remove list item markers
        .trim();
    }

    return plainText;
  }
};

export const truncateText = (text, maxLength = 100) => {
  if (text) {
    if (text?.length <= maxLength) return text;
    return text?.slice(0, maxLength) + "...";
  } else {
    return "Generated Image";
  }
};

export const getSystemInput = ({ taskType, userText }) => {
  let instruction = "";

  switch (taskType.toLowerCase()) {
    case "re-write":
      instruction =
        "Re-write the given text to improve grammar, structure, and flow while keeping the core message intact.";
      break;
    case "refine":
      instruction =
        "Refine the given text for better clarity, professionalism, and readability while strictly maintaining the original meaning.";
      break;
    case "shorten":
      instruction =
        "Shorten the given text by making it more concise without losing essential details or altering the original intent.";
      break;
    default:
      instruction = "Enhance the given text while preserving its meaning.";
  }

  return `
  You are an advanced AI language model specializing in text enhancement.
  Your task: ${instruction}

  ### **Guidelines:**
  - Always preserve the original intent and meaning.
  - Ensure the output is natural, polished, and professional.
  - Keep the tone and style consistent with the input.
  - Do not introduce new information or remove key details unless explicitly instructed.

  **Input Text:**  
  "${userText}"
  `;
};
