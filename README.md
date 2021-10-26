# ![Mobix](./logo.png) Developer Jobs

## Desafio da Mobix - Lógica

### Codigo dividido em quatro funções funções principais
#### tokenize(expression: string) -> Array<string> : Função que recebe uma expressão qualquer, Exemplo :  "(3+2)" -> ["(", "3", "+","2",")"] 
#### postfix(tokens: Array<string>) -> Array<string> : Função que recebe uma expressão tokenizada e retorna sua forma Postfix, Exemplo : Input: ["(", "3", "+","2",")"] -> Output: ["3","2","+"] 
#### calcPostfix(expression: string) -> Number : Função que recebe uma expressão postfix e realiza o calculo através de uma pilha
#### calc(expression) -> Number : Função que chama as anteriores em sequência, faz o tratamento de exceção e realiza o cálculo