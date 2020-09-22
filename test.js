function handle(value) {
    let str = JSON.stringify(value);
    return [].map.call(str, (num, index) => num + new Array(str.length - index - 1).fill("0").join(""))
        .join("-");
}

class Cash {
    constructor(value) {
        this.primitiveValue = value;
        this.str = handle(value);
        let result = new String(this.str);
        Object.setPrototypeOf(result, this);
        return result;
    }

    add(cash) {
        return new Cash(this + cash).str;
    }

    static add(c1, c2) {
        return c1.add(c2);
    }

    valueOf() {
        return this.primitiveValue;
    }
}

const cash1 = new Cash(186);
const cash2 = new Cash(53);

const sum1 = cash1.add(cash2);
const sum2 = Cash.add(cash1, cash2);
const sum3 = new Cash(cash1 + cash2);

console.log(sum1);
console.log(sum2);
console.log(sum3);