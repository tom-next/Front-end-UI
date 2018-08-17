// 做法1
// document.addEventListener("DOMContentLoaded", function() {
//   var lazyBackgrounds = [].slice.call(document.querySelectorAll(".lazy-background"));
//
//   if ("IntersectionObserver" in window && "IntersectionObserverEntry" in window && "intersectionRatio" in window.IntersectionObserverEntry.prototype) {
//     let lazyBackgroundObserver = new IntersectionObserver(function(entries, observer) {
//       entries.forEach(function(entry) {
//         if (entry.isIntersecting) {
//           entry.target.classList.add("visible");
//           lazyBackgroundObserver.unobserve(entry.target);
//         }
//       });
//     });
//
//     lazyBackgrounds.forEach(function(lazyBackground) {
//       lazyBackgroundObserver.observe(lazyBackground);
//     });
//   }
// });

// 做法2
document.addEventListener("DOMContentLoaded", function() {
  let lazyImages = [].slice.call(document.querySelectorAll(".lazy"));
  let active = false;
  const lazyLoad = function() {
    if (active === false) {
      active = true;

      setTimeout(function() {
        lazyImages.forEach(function(lazyImage) {
          if ((lazyImage.getBoundingClientRect().top <= window.innerHeight && lazyImage.getBoundingClientRect().bottom >= 0) && getComputedStyle(lazyImage).display !== "none") {
            lazyImage.classList.remove("lazy");
            lazyImage.classList.add("visible");
            lazyImages = lazyImages.filter(function(image) {
              return image !== lazyImage;
            });
            if (lazyImages.length === 0) {
              document.removeEventListener("scroll", lazyLoad);
              window.removeEventListener("resize", lazyLoad);
              window.removeEventListener("orientationchange", lazyLoad);
            }
          }
        });

        active = false;
      }, 200);
    }
  };

  document.addEventListener("scroll", lazyLoad);
  window.addEventListener("resize", lazyLoad);
  window.addEventListener("orientationchange", lazyLoad);
});
