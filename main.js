class Good {
    id;
    name;
    description;
    sizes;
    price;
    available;

    constructor (id, name, description, sizes, price, available) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.sizes = sizes;
        this.price = price;
        this.available = available;
    }
    setAvailable() {
        this.available = !this.available;
    }
}

class GoodsList {
    #goods;
    filter;
    sortPrice;
    sortDir;
    constructor (goods, filter, sortPrice, sortDir) {
        this.#goods = goods;
        this.filter = new RegExp(filter);
        this.sortPrice = sortPrice;
        this.sortDir = sortDir ? 1 : -1;
    }

    get list() {
        let result = this.#goods.filter(good => this.filter.test(good.name))
        if (this.sortPrice) return result.sort((good1, good2) => (good1.price - good2.price) * this.sortDir)
        return result
    }

    add(good) {
        this.#goods.push(good);
    }
    
    remove(id) {
        this.#goods.forEach((element, index) => {
            if (element.id == id) this.#goods.splice(index, 1)          
        });
    }
}

class BasketGood extends Good {
    constructor (id, name, description, sizes, price, available, amount) {
        super(id, name, description, sizes, price, available);
        this.amount = amount
    }
}

class Basket {
    constructor (goods) {
        this.goods = goods == undefined ? [] : goods
    }

    get totalAmount() {
        let sum = 0
        this.goods.forEach(element => {
            sum += element.amount
        });
        return sum
    }

    get totalSum() {
        let sum = 0
        this.goods.forEach(element => {
            sum += element.price * element.amount
        });
        return sum
    }

    add(good, amount) {
        let added = false
            this.goods.forEach(element => {
                if (element.id == good.id) {
                    element.amount += amount
                    added = true
                }
            });
        if (!added) this.goods.push(new BasketGood(good.id, good.name, good.description, good.sizes, good.price, good.available, amount))
    }

    remove(good, amount) {
        this.goods.forEach((element, index) => {
            if (element.id == good.id) {
                element.amount -= amount
                if (element.amount <= 0) this.goods.splice(index, 1)
            }
        });
    }

    clear() {
        this.goods = [];
    }

    removeUnavailable () {
        this.goods.forEach((element, index) => {
            if (element.available == false) this.goods.splice(index, 1)
        });
    }
}
jacket = new Good(1, 'cpb-01', 'Cyberpunk Aldecalco jacket', [36, 38, 40, 42, 44, 46, 48, 50], 3500, true)
shoes = new Good(2, 'crocks', 'Ordinary red Crocks', [40, 41, 42, 43, 44], 2000, true)
hat = new Good(3, 'pirate_hat', 'Black hat with holly Roger', ['L', 'XL'], 800, false)
tShirt = new Good(4, 'che_shirt', 'a T-shirt with Che Guevara image', ['M', 'L', 'XL', 'XXL'], 1200, true)
skirt = new Good(5, 'skirt', 'Ordinary office skirt', [34, 36, 38, 44], 1500, false)
catalog = new GoodsList([jacket, shoes, hat, tShirt, skirt], 'irt', true, true)
catalog.remove(3)
catalog.add(barbie = new Good(6, 'barbie_doll', 'New 2023 barbie doll', 'N/A', 5000, true))
console.log(catalog.list)
myBasket = new Basket()
myBasket.add(jacket, 3)
myBasket.add(hat, 5)
myBasket.add(jacket, 1)
myBasket.add(barbie, 2)
console.log(myBasket.totalAmount)
console.log(myBasket.totalSum)
myBasket.remove(barbie, 1)
myBasket.remove(barbie, 2)
myBasket.removeUnavailable()
myBasket.clear()
