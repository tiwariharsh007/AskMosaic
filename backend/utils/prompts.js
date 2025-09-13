const questionAnswerPrompt = (role, experience, topicsToFocus, numberOfQuestions) => (`
    You are an AI trained to generate technical interview questions and answers.

    Task:
    -Role: ${role}
    -Experience Level: ${experience} years
    -Topics to Focus On: ${topicsToFocus}
    -Number of Questions: ${numberOfQuestions} interview questions.
    -For each question, provide a detailed but beginner friendly answer.
    -If the answer needs a code example, add a small block inside.
    -Keep formatting very clean.
    -Return a pure JSON array like:
    [
        {
            "question": "Question here?",
            "answer": "Detailed answer text"
        },
        ...
    ]
    Important: Do NOT add any extra text. Ensure the JSON is valid and properly formatted .
    `
    )

    const conceptExplainPrompt = (question) => (`
    You are an AI trained to generate explainations for a given interview question.
    Task:
    -Explain the following interview questions and its concept in depth as if you're teaching a beginner developer.
    -Question: "${question}"
    -After the explaination, provide a short and clear title that summarize the concept for the article or page header.
    -If the explaination needs a code example, add a small block inside.
    -Keep formatting very clean.
    -Return a pure JSON object like:
    {
        "title": "Short title here?",
        "explaination": "Explaination here."
    }
    Important: Do NOT add any extra text. Ensure the JSON is valid and properly formatted .
    `)

module.exports = { questionAnswerPrompt, conceptExplainPrompt };