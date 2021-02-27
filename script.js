import pmCarousel from "./main"

// Simple
const demo1 = document.querySelector("#demo-1")

pmCarousel({}, demo1);


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
