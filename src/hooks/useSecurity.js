import { useEffect } from "react";

const useSecurity = (userName = "User") => {
  // ---------------------------
  // Black overlay + watermark
  // ---------------------------
  const showShield = () => {
    let shield = document.getElementById("screenshot-shield");

    if (!shield) {
      shield = document.createElement("div");
      shield.id = "screenshot-shield";
      shield.innerHTML = `
        <div class="shield-text">
          Confidential • ${userName}
        </div>
      `;
      document.body.appendChild(shield);
    }

    shield.style.display = "flex";

    setTimeout(() => {
      shield.style.display = "none";
    }, 1200);
  };

  // ---------------------------
  // Screenshot key (best effort)
  // ---------------------------
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "PrintScreen") {
        showShield();
        e.preventDefault();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // ---------------------------
  // HARD DevTools handling
  // ---------------------------
  useEffect(() => {
    const threshold = 160;

    const detectDevTools = () => {
      const w = window.outerWidth - window.innerWidth;
      const h = window.outerHeight - window.innerHeight;

      if (w > threshold || h > threshold) {
        // Block future API calls
        window.fetch = () => Promise.reject(new Error("Blocked by security"));

        document.body.innerHTML = `
          <div style="
            height:100vh;
            display:flex;
            align-items:center;
            justify-content:center;
            font-size:22px;
            font-weight:600;
          ">
            Close developer tools.
          </div>
        `;
      }
    };

    const i = setInterval(detectDevTools, 800);
    return () => clearInterval(i);
  }, []);

  // ---------------------------
  // Disable right click & shortcuts
  // ---------------------------
  useEffect(() => {
    const disableRightClick = (e) => e.preventDefault();

    const disableKeys = (e) => {
      if (
        e.key === "F12" ||
        (e.ctrlKey &&
          ["s", "u", "i", "j", "p"].includes(e.key.toLowerCase())) ||
        (e.ctrlKey && e.shiftKey && ["i", "j"].includes(e.key.toLowerCase()))
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", disableRightClick);
    document.addEventListener("keydown", disableKeys);

    return () => {
      document.removeEventListener("contextmenu", disableRightClick);
      document.removeEventListener("keydown", disableKeys);
    };
  }, []);
};

export default useSecurity;
