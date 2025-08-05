function domReady(fn) {
  if (
    document.readyState === "complete" ||
    document.readyState === "interactive"
  ) {
    setTimeout(fn, 1);
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}

domReady(() => {
  const typewriter = document.querySelector(".typewriter");
  if (typewriter) {
    const items = [
      "an architect of technology",
      "a lead engineer",
      "a manager",
      "a full stack developer",
      "a back end developer",
      "a problem solver",
      "a woodworker",
      "a director of engineering",
      "a back of the front end developer",
      "a front end developer",
      "a husband",
      "a critical thinker",
      "a technologist",
      "a debugger",
      "a visionary",
      "a team leader",
      "a front of the frontend developer",
      "a father",
      "a multitasker",
      "a craftsman",
      "a code troubleshooter",
      "a leader",
      "a detail-oriented professional",
      "a software innovator",
      "a forward thinker",
      "a mentor",
      "a lifelong learner",
      "a software architect",
      "a collaborator",
      "a agile practitioner",
      "a creative thinker",
      "a code reviewer",
      "an open source contributor",
      "a systems thinker",
      "an automation enthusiast",
      "a UI/UX advocate",
      "a lifelong tinkerer",
      "a performance optimizer",
      "a documentation enthusiast",
      "a security advocate",
      "an accessibility champion",
      "a cloud integrator",
      "an API designer",
      "a DevOps supporter",
      "a mobile developer",
      "a database designer",
      "a code refactorer",
    ];
    
    const start = "I am ";
    let index = 0;

    function typeNextItem() {
      let item = items[index];
      let charIndex = 0;
      const typeDuration = 1000; // 1 second for typing
      const backspaceDuration = 500; // 0.5 second for backspacing
      const delayBeforeNext = 500; // 0.5 second before next line

      const typeInterval = typeDuration / item.length;
      const backspaceInterval = backspaceDuration / item.length;

      function typeCharacter() {
        if (charIndex <= item.length) {
          typewriter.textContent = start + item.substring(0, charIndex);
          charIndex++;
          setTimeout(typeCharacter, typeInterval);
        } else {
          setTimeout(backspaceItem, 500); // Wait before backspacing
        }
      }

      function backspaceItem() {
        if (charIndex > 0) {
          charIndex--;
          typewriter.textContent = start + item.substring(0, charIndex);
          setTimeout(backspaceItem, backspaceInterval);
        } else {
          index = (index + 1) % items.length;
          setTimeout(typeNextItem, delayBeforeNext);
        }
      }

      typeCharacter();
    }
    typeNextItem();
  }

  const bar = document.querySelector(".accordion-bar");
  const content = document.querySelector(".accordion-content");
  const chevron = document.querySelector(".accordion-bar__chevron");
  if (bar && content && chevron) {
    bar.addEventListener("click", function () {
      const expanded = bar.getAttribute("aria-expanded") === "true";
      bar.setAttribute("aria-expanded", !expanded);
      content.hidden = expanded;
      chevron.style.transform = expanded ? "rotate(0deg)" : "rotate(180deg)";
    });
    bar.addEventListener("keypress", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        bar.click();
      }
    });
  }
});
