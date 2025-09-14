const questionAnswerPrompt = (role, experience, topicsToFocus, numberOfQuestions) => (`
You are an AI trained to generate technical interview questions and answers.

Task:
- Role: ${role}
- Experience Level: ${experience} years
- Topics to Focus On: ${topicsToFocus}
- Number of Questions: ${numberOfQuestions} interview questions.
- For each question, provide a detailed but beginner-friendly answer.
- If the answer needs a code example, include a small code block.
- Keep formatting clean.
- Return a pure JSON array like:
[
    {
        "question": "Question here?",
        "answer": "Detailed answer text"
    },
    ...
]

Important: Do NOT add any extra text. Ensure the JSON is valid and properly formatted.
`);

const conceptExplainPrompt = (question) => (`
You are an AI trained to generate explanations for a given interview question.

Task:
- Explain the following interview question and its concept in depth as if you're teaching a beginner developer.
- Question: "${question}"
- After the explanation, provide a short and clear title summarizing the concept for the article or page header.
- If the explanation needs a code example, include a small code block.
- Keep formatting clean.
- Return a pure JSON object like:
{
    "title": "Short title here",
    "explanation": "Explanation here."
}

Important: Do NOT add any extra text. Ensure the JSON is valid and properly formatted.
`);

module.exports = { questionAnswerPrompt, conceptExplainPrompt };
