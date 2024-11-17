document.addEventListener("DOMContentLoaded", () => {
  const blobPath = document.getElementById("blob-path");
  const numBlobs = 50; // Number of blocks
  const horizontalSpacing = 180; // Adjust horizontal spacing to fit more content
  const imageCategories = ["baby", "child", "fatter"]; // The three image categories
  const emotions = ["curious", "happy", "idle", "normal", "sad", "tired"]; // Emotions to pick from
  let scrollPosition = 0;

  function getRandomImagePath() {
    const category =
      imageCategories[Math.floor(Math.random() * imageCategories.length)];
    const emotion = emotions[Math.floor(Math.random() * emotions.length)];
    return `/assets/${category}/${emotion}.gif`;
  }

  for (let i = 0; i < numBlobs; i++) {
    const blobBlock = document.createElement("div");
    blobBlock.classList.add("blob-block");

    const block = document.createElement("div");
    block.classList.add("block");

    const imgPath = getRandomImagePath();
    block.style.backgroundImage = `url('${imgPath}')`;

    const details = document.createElement("div");
    details.classList.add("details");

    const tweet = `Sample message ${
      i + 1
    } - This is a longer example of a tweet that exceeds 100 characters and will be truncated to showcase the 'Read More' feature.`;

    const isTruncated = tweet.length > 100;
    const displayedTweet = isTruncated ? `${tweet.slice(0, 100)}...` : tweet;

    details.innerHTML = `
      <div><strong><i class="fas fa-comment"></i> Tweet / Onchain Memo:</strong> <span>${displayedTweet}</span> ${
      isTruncated
        ? `<button class="read-more-btn text-blue-500">Read More</button>`
        : ""
    }</div>
      <div><strong><i class="fas fa-clock"></i> Timestamp:</strong> 2024-11-15 10:45</div>
      <div><strong><i class="fas fa-smile"></i> Emotion Status:</strong> Happy</div>
      <div><strong><i class="fas fa-coins"></i> Token Status:</strong> ${
        100 + i * 10
      } $BLOB</div>
      <div><strong><i class="fas fa-chart-line"></i> Market Cap:</strong> $${
        10000 + i * 500
      }</div>
      <div><strong><i class="fas fa-users"></i> Holders:</strong> ${
        250 + i * 10
      }</div>
      <div><strong><i class="fas fa-piggy-bank"></i> Treasury Worth:</strong> $${
        5000 + i * 250
      }</div>
    `;

    // Add a button to each block
    const button = document.createElement("a");
    button.href = "https://example.com";
    button.classList.add("block-button");
    button.innerHTML = `
      <span class="blob-text">TXN</span>
    `;

    blobBlock.appendChild(block);
    blobBlock.appendChild(details);
    blobBlock.appendChild(button);

    const xPos = i * horizontalSpacing;
    blobBlock.style.left = `${xPos}px`;

    blobPath.appendChild(blobBlock);

    // Event listener for "Read More" button
    if (isTruncated) {
      const readMoreBtn = details.querySelector(".read-more-btn");
      readMoreBtn.addEventListener("click", () => {
        const span = readMoreBtn.previousElementSibling;
        span.textContent = tweet; // Expand tweet
        readMoreBtn.style.display = "none"; // Hide button
      });
    }
  }

  window.addEventListener("wheel", (event) => {
    scrollPosition += event.deltaY * 0.2;
    scrollPosition = Math.max(
      0,
      Math.min(scrollPosition, numBlobs * horizontalSpacing - window.innerWidth)
    );
    blobPath.style.transform = `translateX(${-scrollPosition}px)`;
  });
});
