# Todo API

API REST para gerenciamento de tarefas (to-dos), construída com **Spring Boot**, **Spring Data JPA**, **PostgreSQL** e migrações com **Flyway**.

## Tecnologias

| Categoria | Tecnologia |
|---|---|
| Linguagem | Java 25 |
| Framework | Spring Boot 4.1.1 |
| Persistência | Spring Data JPA / Hibernate |
| Banco (produção) | PostgreSQL |
| Banco (testes) | H2 em memória |
| Migrações | Flyway 13.5.0 (`flyway-core` + `flyway-database-postgresql`) |
| Documentação | springdoc-openapi 3.1.1 (Swagger UI) |
| Utilitários | Lombok, Spring Boot DevTools |
| Testes | JUnit 5, Spring Boot Test, MockMvc |
| Build | Maven |

## Estrutura do projeto

```
com.example.demo
├── DemoApplication
├── controller
│   └── TodoController          # Endpoints REST (/todos)
├── service
│   └── TodoService             # Regras de negócio
├── repository
│   └── TodoRepository          # JpaRepository<Todo, Long>
├── entity
│   └── Todo                    # Entidade JPA (tabela "todos")
└── ExceptionHandler
    └── GlobalExceptionHandler  # Tratamento global de erros
```

Arquitetura em camadas: **Controller → Service → Repository → Banco de dados**.

## Modelo de dados

Entidade `Todo` (tabela `todos`):

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `id` | `Long` | gerado | Chave primária (auto incremento) |
| `name` | `String` | sim | Nome da tarefa |
| `description` | `String` | sim | Descrição da tarefa |
| `done` | `boolean` | sim | Indica se foi concluída |
| `priority` | `int` | sim | Prioridade da tarefa |

O esquema é criado pelo Flyway (`V1__create_todo_table.sql`). O Hibernate está com `ddl-auto=none`, ou seja, **não** altera o banco.

## Endpoints

Base path: `/todos`

| Método | Rota | Descrição | Retorno |
|---|---|---|---|
| `POST` | `/todos` | Cria uma tarefa | Lista de todas as tarefas |
| `GET` | `/todos` | Lista todas as tarefas | Lista de tarefas |
| `GET` | `/todos/{id}` | Busca tarefa por id | Tarefa |
| `PUT` | `/todos/{id}` | Atualiza uma tarefa | Tarefa atualizada |
| `DELETE` | `/todos/{id}` | Remove uma tarefa | Lista de tarefas restantes |

### Exemplo de corpo (POST / PUT)

```json
{
  "name": "Estudar Spring Boot",
  "description": "Revisar controllers e services",
  "done": false,
  "priority": 1
}
```

### Tratamento de erros

O `GlobalExceptionHandler` (`@RestControllerAdvice`) converte `EntityNotFoundException` em **404 Not Found**, com a mensagem da exceção no corpo da resposta (ex.: `Id not found`). JSON malformado resulta em **400 Bad Request** (comportamento padrão do Spring).

## Documentação interativa (Swagger)

Com a aplicação rodando, acesse:

- Swagger UI: `http://localhost:8080/swagger-ui.html`
- OpenAPI JSON: `http://localhost:8080/v3/api-docs`
## Configuração

A conexão com o banco usa variáveis de ambiente (`application.properties`):

| Variável | Descrição | Exemplo |
|---|---|---|
| `DB_URL` | URL JDBC do PostgreSQL | `jdbc:postgresql://localhost:5432/todos` |
| `DB_USERNAME` | Usuário do banco | `postgres` |
| `DB_PASSWORD` | Senha do banco | `postgres` |

Configurações relevantes:

- `spring.jpa.hibernate.ddl-auto=none`: o esquema é responsabilidade do Flyway
- `spring.flyway.enabled=true`
- `spring.flyway.baseline-on-migrate=true`: permite aplicar o Flyway em bancos já existentes
## Como executar

### Pré-requisitos

- JDK 25
- Maven (ou o wrapper `./mvnw`)
- PostgreSQL em execução, com um banco criado
### Passos

```bash
# 1. Clonar o repositório
git clone <url-do-repositorio>
cd demo
 
# 2. Definir as variáveis de ambiente (Linux/macOS)
export DB_URL=jdbc:postgresql://localhost:5432/todos
export DB_USERNAME=postgres
export DB_PASSWORD=postgres
 
# 3. Rodar a aplicação
./mvnw spring-boot:run
```

No Windows (PowerShell):

```powershell
$env:DB_URL="jdbc:postgresql://localhost:5432/DB_NAME"
$env:DB_USERNAME="DB_USERNAME"
$env:DB_PASSWORD="DB_PASSWORD"
./mvnw spring-boot:run
```

Na primeira execução, o Flyway cria a tabela `todos` automaticamente.

## Testes

Os testes de integração (`DemoApplicationTests`) usam `@SpringBootTest` + `MockMvc` com **H2 em memória** (`spring.datasource.url=jdbc:h2:mem:testDB` nas propriedades de teste). Antes de cada teste, a tabela é limpa com `deleteAll()`.

```bash
./mvnw test
```

Cenários cobertos:

- Criar tarefa (sucesso e JSON inválido → 400)
- Buscar por id (sucesso e id inexistente → 404)
- Atualizar (sucesso e id inexistente → 404)
- Excluir (sucesso e id inexistente → 404)

## Autor

**Pedro Lins**

- GitHub: [PedroLins04](https://github.com/PedroLins04)

---

Projeto desenvolvido para fins educacionais e para consolidar conhecimentos em desenvolvimento back-end com Java e Spring Boot.



