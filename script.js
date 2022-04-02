import pmCarousel from "./main"

// Complete example
const demo1 = document.querySelector("#demo1")
pmCarousel(
  {
    default: {
      autoplay: 3000,
    },
  },
  demo1
)

// With Pause/Play button
const demo2 = document.querySelector("#demo2")
pmCarousel(
  {
    default: {
      autoplay: 3000,
    },
  },
  demo2
)

// With Previous/Next buttons
const demo3 = document.querySelector("#demo3")
pmCarousel({}, demo3)

// With Pagination
const demo4 = document.querySelector("#demo4")
pmCarousel({}, demo4)

// With pagination and Previous/Next buttons
const demo5 = document.querySelector("#demo5")
pmCarousel({}, demo5)

// With passive pagination indicator and Previous/Next buttons
const demo6 = document.querySelector("#demo6")
pmCarousel({}, demo6)

// Responsive
const demo7 = document.querySelector("#demo7")

pmCarousel(
  {
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
    ],
  },
  demo7
)
