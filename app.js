document.addEventListener('DOMContentLoaded', () => {
  const gifContainer = document.getElementById('emotion-gif');

  // API Endpoint
  const apiUrl = 'http://localhost:5000'; // Replace with your actual API URL

  const randomGifBaseUrl = 'assets/random/';
  const defaultGifUrl = 'assets/random/idle.gif';
  gifContainer.src = defaultGifUrl;

  // Function to fetch data from API
  async function fetchEmotionAndGrowth() {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      // Check for 'random' field
      if (data.emotion) {
        gifContainer.src = randomGifBaseUrl + data.emotion + '.gif';
      } else if (data.happiness && data.growth) {
        // Construct the gif filename from happiness and growth
        const gifFilename = `${data.happiness}-${data.growth}.gif`;
        gifContainer.src = `assets/${gifFilename}`;
      } else {
        // Fallback for missing data
        gifContainer.src = defaultGifUrl;
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
