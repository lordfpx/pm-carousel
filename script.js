import pmCarousel from "./main"

pmCarousel({
  config: {
    group: 1,
  },
  responsive: [
    {
      width: "400px",
      group: 2,
    },
    {
      width: "600px",
      disable: true,
    },
    {
      width: "800px",
      group: 4,
    },
  ]
});
