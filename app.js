document.addEventListener('DOMContentLoaded', () => {
  const gifContainer = document.getElementById('emotion-gif');

  // API Endpoint
  const apiUrl = 'http://localhost:5000'; // Replace with your actual API URL

  const defaultGifUrl = 'assets/baby/idle.gif';
  gifContainer.src = defaultGifUrl;

  // Function to fetch data from API
  async function fetchEmotionAndGrowth() {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      // Check for 'random' field
      if (data.emotion && data.growth) {
        // Construct the gif filename from happiness and growth
        gifContainer.src = `assets/${data.growth}/${data.emotion}.gif`;
      }

    } catch (error) {
      console.error('Error fetching data:', error);
      gifContainer.src = defaultGifUrl;
    }
  }

  // Initially fetch data
  fetchEmotionAndGrowth();

  // Optionally, set an interval to update periodically
  // setInterval(fetchEmotionAndFatness, 5000); // Updates every 5 seconds
});
