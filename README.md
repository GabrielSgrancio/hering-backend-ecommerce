# Hering E-commerce Back-end

Bem-vindo ao **Hering E-commerce Project**, uma aplicação que simula o back-end da Hering em **arquitetura de microserviços**. Este projeto demonstra a integração entre serviços desenvolvidos em **Node.js** e **Java (Spring Boot)**, proporcionando uma solução escalável e modular para gerenciamento de catálogo, carrinho de compras, promoções e pedidos.

---

## Visão Geral do Projeto

O projeto está dividido em dois microserviços principais:

1. **Node.js (Catálogo + Carrinho + Promoções)**
   - Gerencia o catálogo de produtos, operações do carrinho de compras e promoções.
   - Responsável pela interação direta com os clientes, permitindo a navegação de produtos, adição ao carrinho, aplicação de promoções e finalização de compras.

2. **Java (Spring Boot - Microserviço de Pedidos)**
   - Gerencia a criação, listagem e detalhamento de pedidos.
   - Atua como responsável por processar e armazenar as ordens de compra feitas pelos clientes.

Os serviços se **comunicam** via HTTP REST, garantindo a independência e a escalabilidade de cada componente.

---

## Tecnologias e Stack

### Back-end:
- **Node.js** com **Express.js** para o serviço de catálogo e carrinho.
- **Java Spring Boot** para o microserviço de pedidos.

### Banco de Dados:
- **PostgreSQL** para ambos os serviços, separados por banco de dados ou schemas.

### Comunicação:
- **Axios** para requisições HTTP entre Node.js e Java.

### ORMs:
- **Sequelize** no Node.js.
- **Spring Data JPA** no Java.

### Gerenciamento de Variáveis de Ambiente:
- **dotenv** no Node.js.
- **java-dotenv** no Java.

### Outras Ferramentas:
- **Lombok** no Java para reduzir boilerplate code.

---

## Rotas e Endpoints

### Rotas do Node.js (Catálogo + Carrinho + Promoções)

#### Autenticação

| Método | Endpoint         | Descrição                          |
|--------|------------------|------------------------------------|
| POST   | `/auth/register` | Registra um novo usuário           |
| POST   | `/auth/login`    | Autentica usuário e retorna token   |

#### Produtos

| Método | Endpoint           | Descrição                          |
|--------|--------------------|------------------------------------|
| POST   | `/products`        | Cria um novo produto (autenticado) |
| GET    | `/products`        | Lista todos os produtos            |
| GET    | `/products/:id`    | Obtém detalhes de um produto        |
| PUT    | `/products/:id`    | Atualiza um produto existente      |
| DELETE | `/products/:id`    | Remove um produto                   |

#### Carrinho de Compras

| Método | Endpoint          | Descrição                                |
|--------|-------------------|------------------------------------------|
| POST   | `/cart`           | Adiciona um item ao carrinho             |
| GET    | `/cart`           | Lista todos os itens do carrinho         |
| DELETE | `/cart`           | Remove um item do carrinho               |
| POST   | `/cart/checkout`  | Finaliza a compra e cria um pedido        |

#### Promoções

| Método | Endpoint             | Descrição                                  |
|--------|----------------------|--------------------------------------------|
| POST   | `/promotions`        | Cria uma nova promoção (autenticado)        |
| GET    | `/promotions`        | Lista todas as promoções                   |
| GET    | `/promotions/:id`    | Obtém detalhes de uma promoção específica  |
| PUT    | `/promotions/:id`    | Atualiza uma promoção existente            |
| DELETE | `/promotions/:id`    | Remove uma promoção                        |

### Rotas do Java (Microserviço de Pedidos)

| Método | Endpoint         | Descrição                           |
|--------|------------------|-------------------------------------|
| POST   | `/orders`        | Cria um novo pedido                 |
| GET    | `/orders`        | Lista todos os pedidos              |
| GET    | `/orders/:id`    | Obtém detalhes de um pedido específico |

---

# Obrigado

---
