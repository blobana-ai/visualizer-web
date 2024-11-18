document.addEventListener("DOMContentLoaded", () => {
  const blobPath = document.getElementById("blob-path");
  const numBlobs = 50; // Number of blocks
  const horizontalSpacing = 180; // Adjust horizontal spacing to fit more content
  const imageCategories = ["baby", "child", "fatter"];
  const emotions = ["curious", "happy", "idle", "normal", "sad", "tired"];
  let scrollPosition = 0;
  let targetScrollPosition = 0;
  let isDragging = false;
  let startX = 0;
  let animationFrameId;

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

    const button = document.createElement("a");
    button.href = "https://example.com";
    button.classList.add("block-button");
    button.innerHTML = `<span class="blob-text">TXN</span>`;

    blobBlock.appendChild(block);
    blobBlock.appendChild(details);
    blobBlock.appendChild(button);

    const xPos = i * horizontalSpacing;
    blobBlock.style.left = `${xPos}px`;

    blobPath.appendChild(blobBlock);

    if (isTruncated) {
      const readMoreBtn = details.querySelector(".read-more-btn");
      readMoreBtn.addEventListener("click", () => {
        const span = readMoreBtn.previousElementSibling;
        span.textContent = tweet; // Expand tweet
        readMoreBtn.style.display = "none"; // Hide button
      });
    }
  }

  function animateScroll() {
    scrollPosition += (targetScrollPosition - scrollPosition) * 0.1; // Smooth easing
    blobPath.style.transform = `translateX(${-scrollPosition}px)`;

    // Stop animation when close enough to target
    if (Math.abs(targetScrollPosition - scrollPosition) > 0.5) {
      animationFrameId = requestAnimationFrame(animateScroll);
    } else {
      scrollPosition = targetScrollPosition;
    }
  }

  function updateScrollPosition(delta) {
    targetScrollPosition += delta;
    targetScrollPosition = Math.max(
      0,
      Math.min(
        targetScrollPosition,
        numBlobs * horizontalSpacing - window.innerWidth
      )
    );

    if (!animationFrameId) {
      animationFrameId = requestAnimationFrame(animateScroll);
    }
  }

  // Dragging support
  blobPath.addEventListener("pointerdown", (event) => {
    isDragging = true;
    startX = event.clientX;
    blobPath.style.cursor = "grabbing";
    document.body.style.userSelect = "none"; // Prevent text selection
  });

  blobPath.addEventListener("pointermove", (event) => {
    if (!isDragging) return;
    const deltaX = startX - event.clientX;
    updateScrollPosition(deltaX);
    startX = event.clientX;
  });

  window.addEventListener("pointerup", () => {
    isDragging = false;
    blobPath.style.cursor = "grab";
    document.body.style.userSelect = ""; // Restore text selection
  });

  // Mouse wheel support
  window.addEventListener("wheel", (event) => {
    updateScrollPosition(event.deltaY * 0.2);
  });

  // Touch swipe support
  let touchStartX = 0;
  window.addEventListener("touchstart", (event) => {
    touchStartX = event.touches[0].clientX;
  });

  window.addEventListener("touchmove", (event) => {
    const touchDeltaX = touchStartX - event.touches[0].clientX;
    updateScrollPosition(touchDeltaX);
    touchStartX = event.touches[0].clientX;
  });

  // Set cursor for blob-path
  blobPath.style.cursor = "grab";
});
