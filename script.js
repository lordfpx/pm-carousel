import pmCarousel from "./main"

// Simple
const demo1 = document.querySelector("#demo-1")

pmCarousel({}, demo1);

// No prev/next buttons
const demo3 = document.querySelector("#demo-3")

pmCarousel({}, demo3);

// No play/pause buttons
const demo4 = document.querySelector("#demo-4")

pmCarousel({}, demo4);


// Responsive
const demo2 = document.querySelector("#demo-2")

pmCarousel({
  default: {
    group: 1,
  },
  responsive: [
    {
      minWidth: "800px",
      group: 3,
      autoplay: 4000,
    },
    {
      minWidth: "400px",
      group: 2,
    },
    {
      minWidth: "600px",
      disable: true,
    },
  ]
}, demo2);
