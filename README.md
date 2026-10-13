# ToDo API — Java & Spring Boot

API REST para gerenciamento de tarefas (*To-Do List*), desenvolvida como projeto prático durante meus estudos em desenvolvimento back-end.

O projeto aplica conceitos de arquitetura REST, persistência de dados, gerenciamento de banco de dados e testes automatizados, utilizando o ecossistema Java e Spring.

## Tecnologias utilizadas

- **Java 25** — linguagem utilizada no desenvolvimento da aplicação.
- **Spring Boot 4.1.1** — configuração e estrutura principal do projeto.
- **Spring Web MVC** — criação dos endpoints REST e tratamento de requisições HTTP.
- **Spring Data JPA** — persistência e acesso aos dados por meio da abstração JPA.
- **PostgreSQL** — banco de dados relacional.
- **H2 Database** — banco de dados em memória, disponível para desenvolvimento e testes.
- **Flyway** — controle de versão e gerenciamento de migrações do banco de dados.
- **Springdoc OpenAPI / Swagger UI** — documentação interativa da API.
- **JUnit 5** — estrutura de testes automatizados.
- **MockMvc** — simulação de requisições HTTP e validação dos endpoints.
- **Jackson** — serialização e desserialização de objetos JSON.
- **Lombok** — redução de código repetitivo em classes Java.
- **Maven** — gerenciamento de dependências e build do projeto.
- **Spring Boot DevTools** — recursos para agilizar o ciclo de desenvolvimento.

## Funcionalidades

A API permite realizar operações CRUD (*Create, Read, Update, Delete*) sobre tarefas:

| Método | Endpoint | Funcionalidade |
|---|---|---|
| `POST` | `/todos` | Criar uma tarefa |
| `GET` | `/todos` | Listar todas as tarefas |
| `GET` | `/todos/{id}` | Buscar tarefa por ID |
| `PUT` | `/todos` | Atualizar uma tarefa |
| `DELETE` | `/todos/{id}` | Excluir uma tarefa |

Cada tarefa contém informações como nome, descrição, status de conclusão e prioridade.

## Testes automatizados

O projeto utiliza JUnit e MockMvc para testar o comportamento dos endpoints, verificando:

- Criação de tarefas.
- Tratamento de requisições com JSON inválido.
- Busca por identificador.
- Atualização de tarefas.
- Exclusão de tarefas.
- Códigos HTTP e conteúdo das respostas JSON.

## Persistência e banco de dados

A aplicação utiliza Spring Data JPA para facilitar a comunicação com o banco de dados relacional.

O PostgreSQL é incluído como banco de dados de execução, enquanto o H2 está disponível para cenários de desenvolvimento e testes, conforme a configuração utilizada.

O Flyway é utilizado para gerenciar migrações e manter o esquema do banco de dados versionado.

## Documentação da API

O projeto inclui Springdoc OpenAPI e Swagger UI para documentar e explorar os endpoints de forma interativa.

Com a aplicação em execução, a interface geralmente fica disponível em:

`http://localhost:8080/swagger-ui/index.html`

A documentação OpenAPI pode ser acessada em:

`http://localhost:8080/v3/api-docs`

## Como executar

**Pré-requisitos**

- JDK 25.
- Maven ou Maven Wrapper.
- PostgreSQL configurado, caso seja o banco selecionado pela aplicação.

**1. Clone o repositório**

```bash
git clone <URL_DO_REPOSITORIO>
```

**2. Entre na pasta do projeto**

```bash
cd demo
```

**3. Configure a conexão com o banco de dados**

Defina as propriedades necessárias em `application.properties` ou por variáveis de ambiente. Não publique senhas ou credenciais no repositório.

**4. Execute a aplicação**

Windows:

```bash
.\mvnw.cmd spring-boot:run
```

Linux/macOS:

```bash
./mvnw spring-boot:run
```

**5. Execute os testes**

Windows:

```bash
.\mvnw.cmd test
```

Linux/macOS:

```bash
./mvnw test
```

## Conceitos praticados

- Desenvolvimento de APIs REST com Java e Spring Boot.
- Operações CRUD.
- Persistência de dados com JPA.
- Integração com banco de dados relacional.
- Migrações de esquema com Flyway.
- Serialização e desserialização JSON.
- Testes automatizados de endpoints.
- Documentação de APIs com OpenAPI e Swagger UI.
- Gerenciamento de dependências com Maven.

## Autor

**Pedro Lins**

- GitHub: [PedroLins04](https://github.com/PedroLins04)

---

Projeto desenvolvido para fins educacionais e para consolidar conhecimentos em desenvolvimento back-end com Java e Spring Boot.
