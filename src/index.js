(() => {
  window.onload = () => {
    const playerIFrame = document.querySelector("iframe#player");
    const buttonId = "funimation-media-control-toggle";
    const enableText = "Enable media controls";
    const disableText = "Disable media controls";

    const button = document.createElement("button");
    button.innerHTML = disableText;
    button.id = buttonId;

    const toggleMediaControlsVisibility = () => {
      let overlaySelectors = [
        "#brightcove-player > div.vjs-dock-text", // title at top of video
        "#brightcove-player > div.vjs-control-bar", // media controls
        "#brightcove-player > div#funimation-gradient", // gradient with controls are visible
      ];
      overlaySelectors
        .map((selector) =>
          playerIFrame.contentWindow.document.querySelector(selector)
        )
        .forEach((elem) => {
          if (elem.style.display === "none") {
            elem.style.display = "block";
            button.innerHTML = disableText;
          } else {
            elem.style.display = "none";
            button.innerHTML = enableText;
          }
        });
    };

    button.addEventListener("click", toggleMediaControlsVisibility);

    const cssOverrides = document.createElement("style");
    cssOverrides.textContent = `
    #${button.id}:hover {
      opacity: 75%;
      transition: visibility 0s linear 0s, opacity 300ms;
    }
    #${button.id} {
      z-index: 2147483647;
      position: absolute;
      float: right;
      right: 1em;
      top: 45vh;
      opacity: 0%;
      transition: visibility 0s linear 0s, opacity 300ms;
      background: transparent;
      border-color: white;
      border-style: solid;
      color: white;
      text-shadow: 2px 2px black;
      font-family: 'Open Sans';
      font-weight: 500;
      font-size: 1.5em;
      padding: 5vh;
    }
  `;

    const div = document.createElement("div");
    div.id = "control-container";
    div.appendChild(button);

    playerIFrame.contentWindow.document.head.appendChild(cssOverrides);
    playerIFrame.contentWindow.document
      .querySelector("#funimation-player > div")
      .appendChild(div);
  };
})();
