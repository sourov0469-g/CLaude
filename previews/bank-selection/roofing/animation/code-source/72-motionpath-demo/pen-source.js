gsap.registerPlugin(MotionPathPlugin);

let follower;
function updateFollower() { // for responsiveness, on resize events we must re-calculate the path because the coordinates shifted.
  let progress = follower ? follower.progress() : 0; // record progress so we can resume
  follower && follower.revert(); // revert the in-progress tween
  follower = gsap.to(".follower", {
    duration: 5, 
    repeat: 12,
    repeatDelay: 1,
    yoyo: true,
    ease: "power1.inOut",
    motionPath:{
      path: "#path",
      align: "#path",
      autoRotate: true,
      alignOrigin: [0.5, 0.5] // centered on the path
    }
  }).progress(progress); // resume progress
}

updateFollower();

window.addEventListener("resize", updateFollower); // responsive!