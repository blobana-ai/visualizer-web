const blobXHandle = "xdev007_";

document.addEventListener("DOMContentLoaded", async () => {
  const blobPath = document.getElementById("blob-path");

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
    // blobPath.innerHTML = ""; // Clear existing content

    data.forEach((blob, i) => {
      const blobBlock = document.createElement("div");
      blobBlock.classList.add("carousel-item");

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
  blobData = [...blobData, ...blobData, ...blobData, ...blobData, ...blobData, ...blobData, ...blobData, ...blobData, ...blobData, ...blobData, ...blobData, ...blobData, ...blobData, ...blobData, ...blobData, ...blobData, ...blobData, ...blobData, ...blobData, ...blobData, ...blobData]
  renderBlobs(blobData);
  var elems = document.querySelectorAll('.carousel');
  var instances = M.Carousel.init(elems, {
    numVisible: 7,
    noWrap: true,
    shift: 100,
    dist: -200,
  });
  instances[0].set(blobData.length - 1);
});
