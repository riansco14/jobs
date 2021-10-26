# ![Mobix](./logo.png) Developer Jobs

## Desafio da Mobix - Lógica

### Codigo dividido em quatro funções funções principais
  1. tokenize(expression: string) -> Array<string> : Função que recebe uma expressão qualquer
      Exemplo :   Input: "(3+2)" -> Output:["(", "3", "+","2",")"] 
  2. postfix(tokens: Array<string>) -> Array<string> : Função que recebe uma expressão tokenizada e retorna sua forma Postfix
      Exemplo : Input: ["(", "3", "+","2",")"] -> Output: ["3","2","+"] 
  3. calcPostfix(expression: string) -> Number : Função que recebe uma expressão postfix e realiza o calculo através de uma pilha
      Exemplo : Input: ["3","2","+"]  -> Output: 5
  4. calc(expression) -> Number : Função que chama as anteriores em sequência, faz o tratamento de exceção e realiza o cálculo
      Input: "(3+2)" -> Output: 5
