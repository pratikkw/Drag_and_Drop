"use strict";

const lists = document.querySelectorAll(".list");
const container = document.querySelector(".lists");

lists.forEach((item) => {
  item.addEventListener("dragstart", function (e) {
    document.documentElement.style.setProperty(
      "--list-bk-hover-clr",
      "hsla(0, 0%, 100%)"
    );
    document.documentElement.style.setProperty(
      "--list-text-hover-clr",
      "hsl(0, 0%, 0%)"
    );
    setTimeout(() => {
      e.target.classList.add("opacity--active");
    }, 0);
  });

  item.addEventListener("dragend", function (e) {
    document.documentElement.style.setProperty(
      "--list-bk-hover-clr",
      "hsl(0, 0%, 20%)"
    );
    document.documentElement.style.setProperty(
      "--list-text-hover-clr",
      "hsl(0, 0%, 100%)"
    );

    e.target.classList.remove("opacity--active");
  });
});

container.addEventListener("dragover", (e) => {
  e.preventDefault();
  const afterElement = getDragAfterElement(container, e.clientY);
  const draggable = document.querySelector(".opacity--active");
  if (afterElement == null) {
    container.appendChild(draggable);
  } else {
    container.insertBefore(draggable, afterElement);
  }
});

function getDragAfterElement(container, y) {
  const draggableElements = [
    ...container.querySelectorAll(".list:not(.opacity--active)"),
  ];

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;

      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}
