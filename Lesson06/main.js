'use strict';

var myGallery = {
    sittings: {
        imagesContainerClass: "myGallery__images img",
        modalGalleryClass: "myGallery__modal",
        modalGalleryActiveClass: "myGallery__modal_active",
        modalGalleryArrowClass: "arrow",
    },
    container: null,
    modal: null,
    images: null,
    currentImage: 0,
    countImages: 0,
    init(elementId) {
        this.container = document.querySelector(elementId);

        this.images = this.container.querySelectorAll("." + this.sittings.imagesContainerClass);
        this.countImages = this.images.length;
        for (let i = 0; i < this.images.length; i++) {
            this.images[i].addEventListener('click', event => this.viewImage(this.images[i], i));
        }

        this.modal = this.container.querySelector("." + this.sittings.modalGalleryClass);
        this.modal.addEventListener('click', event => this.hideImage(event));

        for (let button of this.modal.querySelectorAll("." + this.sittings.modalGalleryArrowClass)) {
            button.addEventListener('click', event => this.moveImage(event, button));
        }
    },
    viewImage(image, index) {
        let src = image.getAttribute("data-src");

        this.currentImage = index;

        if (!src) {
            return false;
        }
        this.imageExists(src, function (isSet) {
            if (!isSet) {
                return false;
            }
            this.addClass(this.modal, this.sittings.modalGalleryActiveClass);
            this.modal.querySelector("#image").setAttribute("src", src);
        }.bind(this));

    },
    moveImage(event, button) {
        event.stopPropagation();
        let direction = parseInt(button.getAttribute("data-direction"));
        let newIndex = this.currentImage + direction;
        if(newIndex < 0) {
            return false;
        }
        if(this.countImages <= newIndex) {
            return false;
        }
        this.viewImage(this.images[newIndex], newIndex);
    },
    hideImage(event) {
        this.removeClass(this.modal, this.sittings.modalGalleryActiveClass);
    },
    imageExists(url, callback) {
        var img = new Image();
        img.onload = function () {
            callback(true);
        };
        img.onerror = function () {
            callback(false);
        };
        img.src = url;
    },
    removeClass(element, className) {
        element.classList.remove(className);
    },
    addClass(element, className) {
        element.classList.add(className);
    }
}

myGallery.init("#gallery");