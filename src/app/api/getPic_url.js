import axios from 'axios';

async function generateImage(prompt) {
  try {
    // Send a POST request to your handler with the prompt
    const response = await axios.post('/api/handler', { prompt });

    // Return the generated image URL from the response
    return response.data.imageUrl;
  } catch (error) {
    // Handle any errors
    console.error('Failed to generate image:', error);
    throw new Error('Failed to generate image');
  }
}

// Example usage:
async function generateAndDisplayImage() {
  const prompt = 'Generate an image based on this text.';
  try {
    // Send the prompt to the handler and get the generated image URL
    const imageUrl = await generateImage(prompt);
    
    // Display the generated image
    console.log('Generated image URL:', imageUrl);
  } catch (error) {
    console.error('Failed to generate and display image:', error);
  }
}

// Call the function to generate and display the image
generateAndDisplayImage();