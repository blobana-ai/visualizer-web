document.addEventListener("DOMContentLoaded", () => {
  const blobPath = document.getElementById("blob-path");
  const numBlobs = 50; // Number of blocks
  const horizontalSpacing = 180; // Adjust horizontal spacing to fit more content
  const imageCategories = ["baby", "child", "fatter"]; // The three image categories
  const emotions = ["curious", "happy", "idle", "normal", "sad", "tired"]; // Emotions to pick from
  let scrollPosition = 0;

  // Helper function to get a random image path
  function getRandomImagePath() {
    const category =
      imageCategories[Math.floor(Math.random() * imageCategories.length)];
    const emotion = emotions[Math.floor(Math.random() * emotions.length)];
    return `/assets/${category}/${emotion}.gif`;
  }

  // Create blob blocks with details and position them in a horizontal line
  for (let i = 0; i < numBlobs; i++) {
    const blobBlock = document.createElement("div");
    blobBlock.classList.add("blob-block");

    // Create the main block element without any text content
    const block = document.createElement("div");
    block.classList.add("block");

    // Assign a random image as the background for the blob block
    const imgPath = getRandomImagePath();
    block.style.backgroundImage = `url('${imgPath}')`;

    // Create the details section
    const details = document.createElement("div");
    details.classList.add("details");
    details.innerHTML = `
        <div><strong class="text-sm flex">Tweet / Onchain Memo:</strong> "Sample message ${
          i + 1
        }"</div>
        <div><strong class="text-sm flex">Timestamp:</strong> 2024-11-15 10:45</div>
        <div><strong class="text-sm flex">Emotion Status:</strong> Happy</div>
        <div><strong class="text-sm flex">Token Status:</strong> ${
          100 + i * 10
        } $BLOB</div>
        <div><strong class="text-sm flex">Market Cap:</strong> $${
          10000 + i * 500
        }</div>
        <div><strong class="text-sm flex">Holders:</strong> ${
          250 + i * 10
        }</div>
        <div><strong class="text-sm flex">Treasury Worth:</strong> $${
          5000 + i * 250
        }</div>
      `;

    // Append the block and details to the blob block container
    blobBlock.appendChild(block);
    blobBlock.appendChild(details);

    // Position blob blocks in a horizontal line
    const xPos = i * horizontalSpacing;
    blobBlock.style.left = `${xPos}px`;

    blobPath.appendChild(blobBlock);
  }

  // Scroll effect to move blob blocks horizontally
  window.addEventListener("wheel", (event) => {
    // Adjust scroll speed and direction based on the event delta
    scrollPosition += event.deltaY * 0.2;

    // Limit scroll position to prevent going out of bounds
    scrollPosition = Math.max(
      0,
      Math.min(scrollPosition, numBlobs * horizontalSpacing - window.innerWidth)
    );

    // Translate the blob path horizontally
    blobPath.style.transform = `translateX(${-scrollPosition}px)`;
  });
});
