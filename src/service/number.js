
export class hugeNumber{
    constructor(value = 0, exp = 0){
        this.value = value
        this.exp = exp

        this.afterMathValue(this.value)
    }

    afterMathValue(nbr){
        if(nbr == undefined || nbr == NaN) return;
        if(nbr < 1  && this.exp > 0){
            nbr *= 1000
            this.exp -= 3
        }
        while(Math.abs(nbr) >= 1000){
            nbr /= 1000

            this.exp += 3
        }
        this.value = nbr
    }

    toScientificNotation() {
        const mantissa = this.value / 1000;
        const exponent = this.exp + 3;
        return { mantissa, exponent };
      }
    
    static fromScientificNotation(mantissa, exponent) {
        const value = mantissa * 1000;
        const exp = exponent - 3;
        return new hugeNumber(value, exp);
    }
}

export function alignHugeNumbers(idleNbr1, idleNbr2){
    if(idleNbr1.exp == idleNbr2.exp) return;

    if(idleNbr1.exp < idleNbr2.exp){
        var small = idleNbr1
        var big = idleNbr2
    }else{
        var small = idleNbr2
        var big = idleNbr1
    }
    
    let diff = big.exp - small.exp
    small.value = (small.value / Math.pow(10, diff))
    small.exp += diff
}

const IndexToMagnitude = [
    "",
    "K",
    "M",
    "B",
    "T"
];

function GetUnit(magnitude) {
    let unit;
    if (magnitude < IndexToMagnitude.length) {
        unit = IndexToMagnitude[magnitude];
    } else {
        const unitInt = magnitude - IndexToMagnitude.length;
        const secondUnit = unitInt % 26;
        const firstUnit = Math.floor(unitInt / 26);
        unit = String.fromCharCode(firstUnit + 65) +
                String.fromCharCode(secondUnit + 65);
    }
    return unit;
}

export function numberToString(hugeNumber) {
    let res = String(Math.round(hugeNumber.value * 10)/10) + " " + GetUnit(Math.floor(hugeNumber.exp / 3));
    return res
}

export function multiplyHugeNumbers(num1, num2) {
    const sciNum1 = num1.toScientificNotation();
    const sciNum2 = num2.toScientificNotation();

    const mantissa = sciNum1.mantissa * sciNum2.mantissa;
    const exponent = sciNum1.exponent + sciNum2.exponent;

    var res = hugeNumber.fromScientificNotation(mantissa, exponent)

    while(res.value < 1){
        res = hugeNumber.fromScientificNotation(res.value, res.exp)
    }

    return res;
}