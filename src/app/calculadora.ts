function operar(operacion: string = "", a: number, b: number) {
    if (operacion === 'suma') {
        return suma(a, b);
    } else if (operacion === 'resta') {
        return restar(a, b);
    } else if (operacion === 'multiplicar') {
        return multiplicar(a, b);
    } else if (operacion === 'dividir') {
        return dividir(a, b);
    } else if (operacion === 'potencia') {
        return potencia(a, b);
    } else if (operacion === 'factorial') {
        return factorial(a, b);
    }
}

function suma(a: number, b: number) { //a = 1 , b=2

    if (a === undefined || b === undefined) {
        throw new Error("No se puede sumar indefinidos");
    }

    if (typeof a !== 'number' || typeof b !== 'number') {
        return NaN;
    }

    return a + b;
}

function restar(a: number, b: number) {
    if (a === undefined || b === undefined) {

        throw new Error("No se puede restar indefinidos");
    }

    if (typeof a !== 'number' || typeof b !== 'number') {
        return NaN;
    }
    return a - b;
}

function multiplicar(a: number, b: number) {
    if (a === undefined || b === undefined) {

        throw new Error("No se puede multiplicar indefinidos");
    }

    if (typeof a !== 'number' || typeof b !== 'number') {
        return NaN;
    }

    return a * b;
}

function dividir(a: number, b: number) {
    if (a === undefined || b === undefined) {

        throw new Error("No se puede dividir indefinidos");
    }

    if (typeof a !== 'number' || typeof b !== 'number') {
        return NaN;
    }

    return a / b;
}

function potencia(a: number, b: number) {
    if (a === undefined || b === undefined) {

        throw new Error("No se puede elevar a potencia indefinidos");
    }

    if (typeof a !== 'number' || typeof b !== 'number') {
        return NaN;
    }

    return a ** b;
}

function factorial(a: number, b: number) {
    if (a === undefined) {

        throw new Error("No se puede calcular el factorial de indefinidos");
    }

    if (typeof a !== 'number') {
        return NaN;
    }

    if (a === 1 || a === 0) {
        return 1;
    }

    let nfactor=1;

    for (let i = 2; i <= a; i++) {
        nfactor=nfactor*i;
    }
    
    return nfactor;
}

export { suma, operar, restar, multiplicar, dividir, potencia, factorial };