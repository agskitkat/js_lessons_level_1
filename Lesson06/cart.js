"use strict";
(() => {
    let sittings = {
        cartId: "#mini_cart",
        goodsId: "#goods .good",
        emptyCartMsg: 'Ваша корзина пуста.',
        nameSelector: '.name',
        cartSumSelector: '.cart-sum',
        cartItemsSelector: '.cart-items',
        currency: "$",
        sumCartMsg: 'В корзине товаров: ',
        sumPriceCartMsg: ' Итого: ',
        cartItemClass: 'cart-item',
        mesure: 'шт.',
        sumPosition: ' сумма: ',
    };
    let cart = {
        sittings,
        cartContainer: null,
        inCart: [],
        init() {
            this.cartContainer = document.querySelector(this.sittings.cartId);
            let goods = document.querySelectorAll(this.sittings.goodsId);
            for (let good of goods) {
                let btn = good.querySelector('button');
                btn.addEventListener('click', () => this.addToCart(good));
            }
            this.updateCart();
        },
        addToCart(good) {
            let id = good.getAttribute("data-id");
            let indexInCartItem = this.getIndexInCartByGoodId(id);
            let count = good.querySelector('input').value;
            if (indexInCartItem !== false) {
                let newCount =  parseInt(this.inCart[indexInCartItem].count) + parseInt(count);
                if(this.isOverflowCount(good, newCount)) {
                    newCount =  parseInt(this.getMaxCount(good));
                }
                this.inCart[indexInCartItem].count = newCount;
            } else {
                let price = good.getAttribute("data-price");
                let name = good.querySelector(this.sittings.nameSelector).innerText;
                if(this.isOverflowCount(good, count)) {
                    count = parseInt(this.getMaxCount(good));
                }
                this.inCart.push({
                    id: id,
                    price: price,
                    count:  parseInt(count),
                    name: name
                });
            }
            this.updateCart();
        },
        getIndexInCartByGoodId(id) {
            let res = false;
            for (let i = 0; i < this.inCart.length; i++) {
                if (this.inCart[i].id === id) {
                    res = i;
                    break;
                }
            }
            return res;
        },
        getMaxCount(good){
            return parseInt(good.querySelector('input').getAttribute('max'));
        },
        isOverflowCount(good, count) {
            let max = this.getMaxCount(good);
            if(max < count) {
                return true;
            };
            return false;
        },
        updateCart() {
            let sumContainer = this.cartContainer.querySelector(this.sittings.cartSumSelector);
            let itemsContainer = this.cartContainer.querySelector(this.sittings.cartItemsSelector);
            itemsContainer.innerHTML = "";
            if (this.inCart.length === 0) {
                sumContainer.innerText = this.sittings.emptyCartMsg;
                return false;
            }
            let sum = 0;
            let countItems = 0;
            for (let i = 0; i < this.inCart.length; i++) {
                let cartItem = this.inCart[i];
                countItems += cartItem.count;
                let positionPrice = cartItem.count * +cartItem.price;
                sum += positionPrice;
                itemsContainer.append(this.createItemCartElement(cartItem, positionPrice));
            }
            sumContainer.innerText =  this.sittings.sumCartMsg + countItems;
            sumContainer.innerText += this.sittings.sumPriceCartMsg + sum + this.sittings.currency;
        },
        createItemCartElement(cartImtem, sum) {
            let element = document.createElement('tr');
            element.classList.add(this.sittings.cartItemClass);
            element.innerHTML = `<td>${cartImtem.name}</td>`;
            element.innerHTML += `<td>${cartImtem.count + this.sittings.mesure}</td>`;
            element.innerHTML += `<td>${cartImtem.price + this.sittings.currency}</td>`;
            element.innerHTML += `<td>${this.sittings.sumPosition + sum + this.sittings.currency}</td>`;
            return element;
        }
    };
    return cart.init();
})();