let cases = [
    "1 + 0 + 25 - 3",
    "1+1*5-1",
    "1 + 4 / 2 ^2 - 1",
    "1 + 3 * 6 / 2 + 0",
    "0 / 1 + 1 / 0",
    "1 * (5 + 10) / 3",
    "((5-1) * 2)^2",
    "(2 - 1) * 2^3",
    "4 / (54 - (9 * 6))",
    "54 * * 54 - 1",
    "((79 - 12) * (5 + (2 - 1))",
    "266 + 54 * 4 - ( 41 + 2 ) * 10 / 5 - 7 ^ 3 - 1 + 1 * 0 - (( 45 / 5 * 3 - 1) * 2)"
]

let exceptions = {
    "OP": "Expressão invalida - operadores",
    "PA": "Expressão invalida - parenteses",
    "ZERO": "Não é possivel dividir por zero"
}

let calcs = {
    "+": function (a, b) { return a + b },
    "-": function (a, b) { return a - b },
    "*": function (a, b) { return a * b },
    "^": function (a, b) { return Math.pow(a, b) },
    "/": function (a, b) {
        const divide = a / b
        if (b === 0)
            throw new Error(exceptions["ZERO"])
        return divide
    }
}

function isNumero(ch) {
    return /\d/.test(ch);
}

function isOperador(ch) {
    return /\+|-|\*|\/|\^/.test(ch);
}

function isParentesesEsquerdo(ch) {
    return /\(/.test(ch);
}

function isParentesesDireito(ch) {
    return /\)/.test(ch);
}

function tokenize(expressao) {
    let tokens = []
    let numberBuffer = []

    const cleanNumberBuffer = () => {
        if (numberBuffer.length) {
            tokens.push(numberBuffer.join(""))
            numberBuffer = []
        }
    }

    for (let index = 0; index < expressao.length; index++) {
        const element = expressao[index];
        if (isNumero(element)) {
            numberBuffer.push(element)
        }
        else if (isOperador(element)) {
            cleanNumberBuffer()
            tokens.push(element)
        }
        else if (isParentesesEsquerdo(element) || isParentesesDireito(element)) {
            cleanNumberBuffer()
            tokens.push(element)
        }
    }

    if (numberBuffer.length) {
        cleanNumberBuffer()
    }

    return tokens
}

//tokenize(input)


function postfix(tokens) {
    let saidaStack = [];
    let operadoresStack = [];

    Array.prototype.peek = function () {
        return this.slice(-1)[0];
    };


    //tokenize
    //let tokens = tokenize(inputExpressao);

    tokens.forEach(function (token) {
        if (isNumero(token)) {
            //Adiciona numero na saída
            saidaStack.push(token);
        }
        else if (isOperador(token)) {
            //Esse while garante que as operações vão ser adicionadas na saida 
            // "3 + 5 * 10" -> Pilha Saida(3 5) | PilhaOperacoes(+) 
            //-> Quando encontrar * -> Pilha Saida(3 5 +) | PilhaOperacoes(*)
            while (operadoresStack.peek() && (operadoresStack.peek().type === isOperador(token))
            ) {
                saidaStack.push(operadoresStack.pop());
            }
            operadoresStack.push(token);
        }

        else if (isParentesesEsquerdo(token)) {
            operadoresStack.push(token);
        }
        //Procura o parenteses anterior e saí adicionando as operações na saída
        else if (isParentesesDireito(token)) {
            while (operadoresStack.peek()
                && !isParentesesEsquerdo(operadoresStack.peek())) {
                saidaStack.push(operadoresStack.pop());
            }
            operadoresStack.pop();

        }
    });

    //Inverter a pilha de operações para garantir a ordem certa
    return saidaStack.concat(operadoresStack.reverse());
}

function calcPostfix(arrayTokensPostfix) {
    let stack = [];
    //Laço para realizar as operações de 2 em 2 elementos
    arrayTokensPostfix.forEach(element => {
        //console.log(element);
        if (isNumero(element)) {
            stack.push(element);
        }
        else if (isOperador(element)) {
            let b = +stack.pop();
            let a = +stack.pop();

            //realiza a operações pegando a função do objeto calcs
            let value = calcs[element](a, b);
            stack.push(value);
        }

    })


    return stack[0];
}

function calc(expression) {
    let tokens = tokenize(expression)

    //verifica erro de operadores seguidos 1+-2, caso verdadeiro retorna erro
    let anterior = ""
    tokens.forEach(element => {
        if (anterior && isOperador(anterior) && isOperador(element))
            throw new Error(exceptions["OP"])

        anterior = element
    })

    let arrayTokensPostfix = postfix(tokens)

    //verifica parenteses que não se fecham,caso verdadeiro retorna erro
    arrayTokensPostfix.forEach(element => {
        if (isParentesesEsquerdo(element) || isParentesesDireito(element))
            throw new Error(exceptions["PA"])
    })

    return calcPostfix(arrayTokensPostfix)
}


cases.forEach(element => {
    try {
        console.log("------------------------------------------------------------");
        console.log(element);
        console.log("OUTPUT ALGORITMO\t", calc(element));
    } catch (error) {
        console.log("ERROR: ", error.message);
    }
})


