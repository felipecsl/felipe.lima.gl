(function () {
  function closeOverlay(overlay) {
    overlay.remove();
    document.body.classList.remove("image-overlay-open");
  }

  function openOverlay(image) {
    var overlay = document.createElement("div");
    var fullSizeImage = document.createElement("img");

    overlay.className = "image-overlay";
    fullSizeImage.src = image.currentSrc || image.src;
    fullSizeImage.alt = image.alt || "";

    overlay.appendChild(fullSizeImage);
    overlay.addEventListener("click", function (event) {
      if (event.target === overlay) {
        closeOverlay(overlay);
      }
    });

    document.body.appendChild(overlay);
    document.body.classList.add("image-overlay-open");
  }

  document.addEventListener("click", function (event) {
    var image = event.target.closest(".post-content img");

    if (!image || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }

    event.preventDefault();
    openOverlay(image);
  });

  document.addEventListener("keydown", function (event) {
    var overlay = document.querySelector(".image-overlay");

    if (event.key === "Escape" && overlay) {
      closeOverlay(overlay);
    }
  });
})();
