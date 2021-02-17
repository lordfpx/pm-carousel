import pmCarousel from "./main.js"

pmCarousel({
  config: {
    loop: true,
    group: 2,
    autoplay: false
  },
  responsive: [
    {
      mq: "screen and (max-width: 480px)",
      group: 1,
      autoplay: false,
      loop: false
    },
    {
      mq: "screen and (max-width: 600px)",
      disable: true
    }
  ]
});
