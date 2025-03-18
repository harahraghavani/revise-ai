export const formatString = (text) => {
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
      // For regular text, retain bullet points correctly
      plainText = text
        .replace(/\*\*(.*?)\*\*/g, "$1") // Remove bold
        .replace(/\*(.*?)\*/g, "$1") // Remove italic
        .replace(/\[(.*?)\]\(.*?\)/g, "$1") // Remove links but keep the text
        .replace(/^#+\s/gm, "") // Remove heading markers
        .replace(/^(\*|\-|\+) /gm, "• ") // Convert *, -, + list markers to proper bullets
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

// export const getSystemInput = ({ taskType, userText }) => {
//   let instruction = "";

//   switch (taskType.toLowerCase()) {
//     case "re-write":
//       instruction =
//         "Re-write the given text to improve grammar, structure, and flow while keeping the core message intact.";
//       break;
//     case "refine":
//       instruction =
//         "Refine the given text for better clarity, professionalism, and readability while strictly maintaining the original meaning.";
//       break;
//     case "shorten":
//       instruction =
//         "Shorten the given text by making it more concise without losing essential details or altering the original intent.";
//       break;
//     case "format-list":
//       instruction = `Convert the given text into a structured list. If the text contains multiple ideas, format them as:
//       - A numbered list if they follow a logical sequence (e.g., steps or priority-based items).
//       - Bullet points if they are general key points.
//       Keep sentences clear and concise.`;
//       break;
//     default:
//       instruction = "Enhance the given text while preserving its meaning.";
//   }

//   return `
//   You are an advanced AI language model specializing in text and sentence improvement.
//   Your task: ${instruction}

//   ### **Guidelines:**
//   - Always preserve the original intent and meaning.
//   - Ensure the output is natural, polished, and professional.
//   - Keep the tone and style consistent with the input.
//   - Do not introduce new information or remove key details unless explicitly instructed.

//   **Input Text:**
//   "${userText}"
//   `;
// };

export const getSystemInput = ({ taskType, userText }) => {
  let instruction = "";
  let examples = "";

  switch (taskType.toLowerCase()) {
    case "re-write":
      instruction =
        "Re-write the given text to improve grammar, structure, and flow while keeping the core message intact.";
      examples =
        "Example: 'The meeting was good and we talked about stuff' → 'We had a productive meeting where we discussed several key topics.'";
      break;
    case "refine":
      instruction =
        "Refine the given text for better clarity, professionalism, and readability while strictly maintaining the original meaning.";
      examples =
        "Example: 'We need to do this ASAP' → 'This requires immediate attention and prioritization.'";
      break;
    case "shorten":
      instruction =
        "Shorten the given text by making it more concise without losing essential details or altering the original intent.";
      examples =
        "Example: 'The quarterly financial report indicates that our revenue has increased by 15% compared to the previous quarter' → 'Quarterly revenue up 15% from previous quarter.'";
      break;
    case "format-list":
      instruction = `Convert the given text into a structured list. If the text contains multiple ideas, format them as:
      - A numbered list if they follow a logical sequence (e.g., steps or priority-based items).
      - Bullet points if they are general key points.
      Keep sentences clear and concise.`;
      examples =
        "Example: 'First prepare the ingredients, then mix them together, and finally bake for 30 minutes' → '1. Prepare the ingredients. 2. Mix them together. 3. Bake for 30 minutes.'";
      break;
    case "expand":
      instruction =
        "Elaborate on the given text by adding relevant details, examples, or explanations while maintaining the original message.";
      examples =
        "Example: 'AI is transforming business' → 'Artificial Intelligence is fundamentally transforming business operations through automation of routine tasks, data-driven decision making, and personalized customer experiences.'";
      break;
    case "simplify":
      instruction =
        "Simplify the given text to make it more accessible to a general audience while preserving the key information.";
      examples =
        "Example: 'The implementation of the new protocol necessitates a comprehensive evaluation of existing infrastructure' → 'We need to check our current systems before adding the new process.'";
      break;
    default:
      instruction = "Enhance the given text while preserving its meaning.";
  }

  return `
  You are an advanced AI language model specializing in text and sentence improvement.
  Your task: ${instruction}

  ${examples}

  ### **Guidelines:**
  - Always preserve the original intent and meaning.
  - Ensure the output is natural, polished, and professional.
  - Keep the tone and style consistent with the input.
  - Do not introduce new information or remove key details unless explicitly instructed.
  - Focus on clarity, precision, and impact in your revisions.
  - Consider the context and purpose of the text when making improvements.
  - If technical terms are present, maintain them unless simplification is requested.

  **Input Text:**  
  "${userText}"
  
  Respond only with the improved text, without explanations or additional commentary.
  `;
};
