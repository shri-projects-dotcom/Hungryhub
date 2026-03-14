const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.suggestRecipe = async (req, res) => {
  try {
    const { ingredients } = req.body;

    if (!ingredients) {
      return res.status(400).json({ message: "Ingredients required" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Create a simple recipe using these ingredients:
${ingredients.join(", ")}

Return:
Title
Ingredients
Steps
Cook Time
`;

    const result = await model.generateContent(prompt);
    const response = result.response.text();

    res.json({ aiRecipe: response });

  } catch (error) {
    res.status(500).json({ message: error });

  }
};