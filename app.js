const blobXHandle = "BlobanaPet";

document.addEventListener("DOMContentLoaded", async () => {
  const blobPath = document.getElementById("blob-path");
  const horizontalSpacing = 180; // Adjust horizontal spacing to fit more content
  const realWidth = 250 + horizontalSpacing + 30; // 30 gap
  let scrollPosition = 0;
  let targetScrollPosition = 0;
  let isDragging = false;
  let startX = 0;
  let animationFrameId;
  let numBlobs = 0;

  // Fetch data from the API
  async function fetchBlobData() {
    try {
      const response = await fetch("https://api.blobanapet.com");
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching blob data:", error);
      return [];
    }
  }

  // Render blob blocks
  function renderBlobs(data) {
    blobPath.innerHTML = ""; // Clear existing content

    data.forEach((blob, i) => {
      const blobBlock = document.createElement("div");
      blobBlock.classList.add("blob-block");

      const block = document.createElement("div");
      block.classList.add("block");

      // Assign a dynamic image based on growth
      block.style.backgroundImage = `url('/assets/${blob.growth.toLowerCase()}/${blob.emotion.toLowerCase()}.gif')`;

      const details = document.createElement("div");
      details.classList.add("details");

      const isTruncated = blob.message.length > 100;
      const displayedMessage = isTruncated
        ? `${blob.message.slice(0, 100)}...`
        : blob.message;

      details.innerHTML = `
        <div><i class="fas fa-comment"></i> <a href="https://x.com/${blobXHandle}/status/${blob.tweetId
        }" target="_blank" style="color: blue;">Tweet</a> / Onchain Memo:  <span>${displayedMessage}</span> ${isTruncated
          ? `<button class="read-more-btn text-blue-500">Read More</button>`
          : ""
        }</div>
        <div><i class="fas fa-clock"></i> Timestamp:  ${new Date(
          blob.timestamp
        ).toLocaleString()}</div>
        <div><i class="fas fa-square"></i> Blocknumber:  ${blob.blocknumber
        }</div>
        <div><i class="fas fa-smile"></i> Emotion Status:  ${blob.emotion}</div>
        <div><i class="fas fa-coins"></i> Token:  $${blob.price}</div>
        <div><i class="fas fa-chart-line"></i> Market Cap:  $${blob.mcap.toLocaleString()}</div>
        <div><i class="fas fa-users"></i> Holders:  ${blob.holders.toLocaleString()}</div>
        <div><i class="fas fa-piggy-bank"></i> Treasury Worth:  $${blob.treasury.toLocaleString()}</div>
      `;

      const button = document.createElement("a");
      button.href = `https://solscan.io/tx/${blob.txHash}`;
      button.classList.add("block-button");
      button.innerHTML = `<span class="blob-text leading-none">View <br/>TXN</span>`;
      button.target = "_blank";

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
          span.textContent = blob.message; // Expand message
          readMoreBtn.style.display = "none"; // Hide button
        });
      }
    });
  }

  // Initialize
  let blobData = await fetchBlobData();
  numBlobs = blobData.length;

  // Scroll to the last card
  function scrollToLastCard() {
    const totalWidth = numBlobs * realWidth;
    const containerWidth = window.innerWidth;

    // Set the initial target scroll position to the last card
    targetScrollPosition = Math.max(0, totalWidth - containerWidth);

    // Start animation to scroll smoothly
    if (!animationFrameId) {
      animationFrameId = requestAnimationFrame(animateScroll);
    }
  }

  // Call scrollToLastCard after rendering the blobs
  renderBlobs(blobData);
  scrollToLastCard();

  function animateScroll() {
    scrollPosition += (targetScrollPosition - scrollPosition) * 0.1; // Smooth easing
    blobPath.style.transform = `translateX(${-scrollPosition}px)`;

    // Stop animation when close enough to target
    if (Math.abs(targetScrollPosition - scrollPosition) > 0.5) {
      animationFrameId = requestAnimationFrame(animateScroll);
    } else {
      scrollPosition = targetScrollPosition;
      animationFrameId = null; // Ensure animation stops
    }
  }

  function updateScrollPosition(delta) {
    targetScrollPosition += delta;
    targetScrollPosition = Math.max(
      0,
      Math.min(targetScrollPosition, numBlobs * realWidth - window.innerWidth)
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
