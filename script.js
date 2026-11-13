const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".nav");
const transitionDuration = 1500;

if (menuToggle && navigation) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });

  navigation.addEventListener("click", (event) => {
    if (event.target instanceof Element && event.target.closest("a")) {
      navigation.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
    }
  });
}

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.body.classList.add("page-entering");
  window.setTimeout(() => document.body.classList.remove("page-entering"), transitionDuration);

  document.addEventListener("click", (event) => {
    if (!(event.target instanceof Element) || event.defaultPrevented) return;
    const link = event.target.closest("a");
    if (!link || link.target === "_blank" || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;

    const destination = new URL(link.href, window.location.href);
    if (
      destination.protocol !== window.location.protocol ||
      destination.host !== window.location.host ||
      destination.pathname === window.location.pathname ||
      destination.hash.startsWith("#")
    ) return;

    event.preventDefault();
    document.body.classList.add("page-leaving");
    window.setTimeout(() => window.location.assign(destination.href), transitionDuration);
  });
}

const orderSelection = document.querySelector("#order-selection");
const orderCards = document.querySelectorAll("[data-order-card]");

if (orderSelection && orderCards.length > 0) {
  const requestedItem = new URLSearchParams(window.location.search).get("item");
  const selectedCard = Array.from(orderCards).find(
    (card) => card.dataset.item.toLocaleLowerCase() === requestedItem?.trim().toLocaleLowerCase(),
  );

  if (selectedCard) {
    selectedCard.classList.add("is-selected");
    orderSelection.hidden = false;
    orderSelection.textContent = `${selectedCard.dataset.item} selected — choose “Order” to confirm availability and price with us.`;
  }
}

document.querySelectorAll("[data-order-item]").forEach((link) => {
  const itemName = link.dataset.orderItem;
  const message = `Hello Dar Al Rafa, I would like to order: ${itemName}. Please confirm today's price and availability.`;
  link.href = `https://wa.me/971555171699?text=${encodeURIComponent(message)}`;
});

document.querySelectorAll("[data-year]").forEach((element) => {
  element.textContent = String(new Date().getFullYear());
});
