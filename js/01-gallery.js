import { galleryItems } from "./gallery-items.js";

const containerGalleryItems = document.querySelector(".gallery");

const createGalleryMarkup = galleryItems
  .map(
    ({ preview, original, description }) => `<li class="gallery__item">
    <a class="gallery__link" href="${original}">
      <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
      />
    </a>
  </li>`
  )
  .join("");

containerGalleryItems.insertAdjacentHTML("beforeend", createGalleryMarkup);

const galleryImages = document.querySelectorAll(".gallery__image");
galleryImages.forEach((image) => {
  image.addEventListener("click", onImgClick);
});

function onhandleEscapeKeydown(instance) {
  return function (event) {
    if (event.code === "Escape") {
      instance.close();
    }
  };
}

function onImgClick(event) {
  event.preventDefault();
  const clickedElement = event.target;

  if (clickedElement.classList.contains("gallery__image")) {
    const instance = basicLightbox.create(
      `<img src="${clickedElement.dataset.source}" width="800" height="600">`,
      {
        onShow: (instance) => {
          document.addEventListener("keydown", handleEscapeKeydown);
        },
        onClose: (instance) => {
          document.removeEventListener("keydown", handleEscapeKeydown);
        },
      }
    );
    const handleEscapeKeydown = onhandleEscapeKeydown(instance);
    instance.show();
  }
}
