function loco() {
  gsap.registerPlugin(ScrollTrigger);

  // Initialize Locomotive Scroll
  const locoScroll = new LocomotiveScroll({
      el: document.querySelector("#main"),
      smooth: true
  });

  // Smooth scroll to anchor links
  document.querySelectorAll('nav a').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();

          const targetId = this.getAttribute('href').substring(1); 
          const targetSection = document.getElementById(targetId);

          if (targetSection) {
              locoScroll.scrollTo(targetSection); 
          }
      });
  });

  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
      scrollTop(value) {
          return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
      }, // we don't have to define a scrollLeft because we're only scrolling vertically.
      getBoundingClientRect() {
          return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
      },
      // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
      pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();

  ScrollTrigger.create({
    trigger: ".wrapper",
    start: "top 50%",
    onEnter: () => {
      gsap.fromTo(".heading", { top: "8%", opacity: 1 }, { top: "0%", opacity: 0, duration: 0.5 });
    },
    onLeaveBack: () => {
      gsap.fromTo(".heading", { top: "0%", opacity: 0 }, { top: "8%", opacity: 1, duration: 0.5 });
    },
    scroller: "#main"
  });

  ScrollTrigger.create({
    trigger: ".wrapper",
    start: "top 60%",
    onEnter: () => {
      gsap.fromTo(".laptop-screen", { scale: 0.5, opacity: 0 }, { duration: 1, scale: 1.5, opacity: 1 });
      gsap.fromTo(".device", { scale: 0.5, opacity: 0 }, { duration: 1, scale: 1.5, opacity: 1 });
      gsap.fromTo(".screen", { scale: 0.5, opacity: 0 }, { duration: 1, scale: 1, opacity: 1 });
    },
    onLeaveBack: () => {
      gsap.fromTo(".device", { scale: 1.5 }, { duration: 1, scale: 0.5 });
      gsap.fromTo(".laptop-screen", { scale: 1.5 }, { duration: 1, scale: 0.5 });
      gsap.fromTo(".screen", { scale: 1.5 }, { duration: 1, scale: 0.5 });
    },
    scroller: "#main"
  });
  setTimeout(() => {
    const middleWord = document.getElementById('middle-word');
    const lastWord = document.getElementById('last-word');

    const middleWordRect = middleWord.getBoundingClientRect();
    const lastWordRect = lastWord.getBoundingClientRect();

    const upperRightTubeLight = document.getElementById('tubelight-right');
    const lowerLeftTubeLight = document.getElementById('tubelight-left');

    upperRightTubeLight.style.top = `${middleWordRect.top}px`;
    upperRightTubeLight.style.left = `${middleWordRect.right + 10}px`;

    lowerLeftTubeLight.style.top = `${lastWordRect.top}px`;
    lowerLeftTubeLight.style.left = `${lastWordRect.left - 210}px`;

    upperRightTubeLight.classList.add('visible');
    lowerLeftTubeLight.classList.add('visible');
}, 2500);


  // You can trigger the animation if needed
  window.onload = function() {
      animateText();
  };

  function animateText() {
      const firstWord = document.getElementById("first-word");
      const middleWord = document.getElementById("middle-word");
      const lastWord = document.getElementById("last-word");

      firstWord.style.animation = "none";
      middleWord.style.animation = "none";
      lastWord.style.animation = "none";

      void firstWord.offsetWidth; // Trigger reflow
      void middleWord.offsetWidth; // Trigger reflow
      void lastWord.offsetWidth; // Trigger reflow

      firstWord.style.animation = null;
      middleWord.style.animation = null;
      lastWord.style.animation = null;
  }

  // Now, integrate the "try.js" code for the device rotation effect

  const device = document.querySelector(".image-container");
  const ROTATION = 10;

  const handleMove = (e) => {
      const { clientX, clientY, currentTarget } = e;

      const rect = currentTarget.getBoundingClientRect();

      let horizontal = (clientX - rect.left) / rect.width;
      let vertical = (clientY - rect.top) / rect.height;

      horizontal = (0.5 - horizontal) * ROTATION;
      vertical = (0.5 - vertical) * -ROTATION;

      const rotateX = horizontal.toFixed(2);
      const rotateY = vertical.toFixed(2);

      device.style.transform = `perspective(${rect.width}px) rotateX(${rotateY}deg) rotateY(${rotateX}deg)`;
  };

  const handleLeave = (e) => {
      const { currentTarget } = e;
      currentTarget.style.transform = "none";
  };

  device.addEventListener("mousemove", handleMove);
  device.addEventListener("touchmove", handleMove);
  device.addEventListener("mouseleave", handleLeave);

}

// Call the loco function
loco();
