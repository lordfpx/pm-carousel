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

// test
const toggleNodes = document.querySelectorAll("[data-demo-toggle]");

const toggle = (ev) => {
  const targetId = ev.currentTarget.getAttribute("data-demo-toggle");
  const targetNode = document.querySelector(targetId);
  const isHidden = targetNode.hidden;

  targetNode.hidden = !isHidden;
  ev.currentTarget.setAttribute("aria-expanded", isHidden ? "false" : "true")
}

toggleNodes.forEach((node) => {
  node.setAttribute("aria-expanded", "false");
  node.addEventListener("click", toggle);
})
