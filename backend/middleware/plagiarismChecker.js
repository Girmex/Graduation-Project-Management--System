const natural = require('natural');
const calculateVector = (text) => {
  const words = text.toLowerCase().split(/\s+/);
  const frequencyMap = new Map();
  words.forEach((word) => {
    if (frequencyMap.has(word)) {
      frequencyMap.set(word, frequencyMap.get(word) + 1);
    } else {
      frequencyMap.set(word, 1);
    }
  });
  const vector = Array.from(frequencyMap.values());
  return vector;
};

// Function to generate the summary text


const summarizeText = (text, abstract) => {
  // Split the text into paragraphs based on double line breaks
  const paragraphs = text.split('\n\n');

  // Filter paragraphs that contain the specified abstract
  const filteredParagraphs = paragraphs.filter((paragraph) => {
    // Perform case-insensitive matching for the abstract
    const lowerCasedParagraph = paragraph.toLowerCase();
    const lowerCasedAbstract = abstract.toLowerCase();

    return lowerCasedParagraph.includes(lowerCasedAbstract);
  });

  // Join the filtered paragraphs to form the summary
  const summary = filteredParagraphs.join('\n\n');

  // Return the summary text
  return summary;
};




// Calculate the cosine similarity between two vectors
const calculateCosineSimilarity = (vector1, vector2) => {
  let dotProduct = 0;
  for (let i = 0; i < vector1.length; i++) {
    dotProduct += vector1[i] * vector2[i];
  }
  const magnitude1 = Math.sqrt(vector1.reduce((sum, val) => sum + val ** 2, 0));
  const magnitude2 = Math.sqrt(vector2.reduce((sum, val) => sum + val ** 2, 0));
  if (magnitude1 === 0 || magnitude2 === 0) {
    return 0; // No similarity
  }
  const similarity = dotProduct / (magnitude1 * magnitude2);
  if (similarity === 1) {
    return 1; // Full similarity
  }
  return similarity;
};
const checkPlagiarism = (similarity) => {
  const threshold = 0.5; // 50% similarity threshold

  if (similarity >= threshold) {
    return true; // Plagiarism detected
  }

  return false; // No plagiarism
};


module.exports = { calculateVector,summarizeText, calculateCosineSimilarity,checkPlagiarism };
