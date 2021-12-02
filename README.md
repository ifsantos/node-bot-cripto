# node-bot-cripto
Lab on consuming Binance Exchange API / WebSockets and Telegram API to automate price alerts

NodeJS dependencies:
- ws
- axios
- telegraf

### To be implemented: MFI
(Portuguese)

Como calcular?

O cálculo do Índice Fluxo de Dinheiro envolve alguns passos que podem ser um pouco cansativos para alguns investidores, porém nenhum é de grande complexidade:
1. Encontre o Preço Típico:

    Preço Típico = ( Preço de Fechamento + Máxima + Mínima ) / 3

É a média ponderada entre o fechamento, máxima e mínima. O seu valor deve obedecer a regra:

    Positivo: se o preço típico for maior que o do período anterior
    Negativo: se o pre;co típico for menor que o do período anterior

2. Encontre o Fluxo de Dinheiro Bruto

    Fluxo de Dinheiro Bruto = ( Preço Típico ) * ( Volume )

Perceba que este valor é basicamente o Volume financeiro, pois é o Volume multiplicado pelo preço típico. Sendo que quando o preço típico cai, seu valor é negativo e consequentemente o Fluxo de Dinheiro Bruto também será negativo.
3. Encontre a Fração de Dinheiro

    Fração de Dinheiro = ( Fluxos de Dinheiro Positivos ) / ( Fluxos de Dinheiro Negativos )

Nesta etapa são somados todos os Fluxos de Dinheiro Bruto positivos e todos os Fluxos de Dinheiro Bruto negativos. Por definição dos criadores deste indicador, é considerado o período de 14 dias, mas você pode escolher outros períodos.
4. Encontro o Índice de Fluxo de Dinheiro (finalmente!)

    Índice Fluxo Dinheiro = 100 – 100 / ( 1 + Fração de Dinheiro )

Como a Fração de Dinheiro vai de 0 a 100, para transforma-la em índice basta aplicar esta fórmula, chegando-se ao Indicador de Fluxo de Dinheiro (MFI).
Como utilizar?

O Índice de Fluxo de Dinheiro ajuda o investir a:

    identificar níveis de sobre compra e sobre venda
    antecipar reversões por meio de divergência com o preço

1. níveis de sobre compra e sobre venda

Podemos utilizar o MFI para identificar níveis de sobre compra e sobre venda, onde são dadas indicações de compra ou venda de uma ação:

Valor do Índice de Fluxo de Dinheiro:

        Acima de 80: sinal de sobre compra, indicando momento de venda da ações
        Abaixo de 20: sinal de sobre venda, indicando momento de compra da ação

Estes níveis são atingidos após grandes variações no preço de um ativo, que em gral são acompanhados de exageros, que deverão ser corrigidos no curto prazo.

O conteúdo disponibilizado na Bússola do Investidor é protegido pela legislação brasileira de direitos autorais. Não o reproduza em meios de comunicação sem autorização.
Fonte original: https://www.bussoladoinvestidor.com.br/indice-fluxo-de-dinheiro/#Como_calcular
