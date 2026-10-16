const API_URL = "http://localhost:8080/todos";

const listaPendentes = document.getElementById("listaPendentes");
const listaConcluidas = document.getElementById("listaConcluidas");

async function buscarTarefas() {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Erro ao buscar tarefas");
    }

    const tarefas = await response.json();
    exibirTarefas(tarefas);
    atualizarContadores(tarefas);
  } catch (error) {
    console.error("Erro ao buscar tarefas:", error);

    listaPendentes.textContent = "Erro ao buscar tarefas";
    listaConcluidas.textContent = "Erro ao buscar tarefas";
  }
}

function exibirTarefas(tarefas) {
  listaPendentes.replaceChildren();
  listaConcluidas.replaceChildren();

  const prioridades = {
    1: { nome: "Baixa", classe: "text-bg-info" },
    2: { nome: "Média", classe: "text-bg-warning" },
    3: { nome: "Alta", classe: "text-bg-danger" },
    4: { nome: "Urgente", classe: "text-bg-dark" },
  };

  tarefas.forEach((tarefa) => {
    const card = document.createElement("article");
    card.classList.add("task-card");

    const header = document.createElement("div");
    header.classList.add(
      "d-flex",
      "justify-content-between",
      "align-items-start",
      "gap-2",
      "mb-2",
    );

    const name = document.createElement("h3");
    name.classList.add("mb-0");
    name.textContent = tarefa.name;

    const prioridade = prioridades[tarefa.priority];

    const priority = document.createElement("span");
    priority.classList.add(
      "badge",
      "rounded-pill",
      "fs-6",
      prioridade?.classe ?? "text-bg-secondary",
    );
    priority.textContent = prioridade?.nome ?? "Sem prioridade";

    header.append(name, priority);

    const description = document.createElement("p");
    description.classList.add("mb-3");
    description.textContent =
      tarefa.description || "Nenhuma descrição informada.";

    const footer = document.createElement("div");
    footer.classList.add(
      "d-flex",
      "justify-content-between",
      "align-items-center",
      "gap-2",
      "pt-2",
      "border-top",
    );

    const status = document.createElement("small");
    status.classList.add("text-body-white", "fw-semibold");
    if (tarefa.done) {
      status.classList.add("text-bg-success", "px-2", "py-1", "rounded");
    } else {
      status.classList.add("text-bg-warning", "px-2", "py-1", "rounded");
    }
    status.textContent = tarefa.done ? "Concluída" : "Pendente";

    const actions = document.createElement("div");
    actions.classList.add("d-flex", "gap-2");

    const editButton = document.createElement("button");
    editButton.type = "button";
    editButton.classList.add(
      "btn",
      "btn-sm",
      "btn-outline-info",
      "fw-semibold",
    );
    editButton.textContent = "Editar";

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.classList.add(
      "btn",
      "btn-sm",
      "btn-outline-danger",
      "fw-bold",
    );
    deleteButton.textContent = "Excluir";

    actions.append(editButton, deleteButton);
    footer.append(status, actions);

    card.append(header, description, footer);

    if (tarefa.done) {
      listaConcluidas.appendChild(card);
    } else {
      listaPendentes.appendChild(card);
    }
  });
}

function atualizarContadores(tarefas) {
  const totalTarefas = document.getElementById("totalTarefas");
  const totalPendentes = document.getElementById("totalPendentes");
  const totalConcluidas = document.getElementById("totalConcluidas");

  totalTarefas.textContent = tarefas.length;

  totalPendentes.textContent = tarefas.filter((tarefa) => !tarefa.done).length;

  totalConcluidas.textContent = tarefas.filter((tarefa) => tarefa.done).length;
}

async function adicionarTarefa(tarefa) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tarefa),
    });

    if (!response.ok) {
      throw new Error("Erro ao adicionar tarefa");
    }

    const tarefasAtualizadas = await response.json();

    tarefas = tarefasAtualizadas;
    exibirTarefas(tarefas);
  } catch (error) {
    console.error("Erro ao adicionar tarefa:", error);
  }
}

const formTarefa = document.querySelector("#formTarefa");

formTarefa.addEventListener("submit", async (event) => {
  event.preventDefault();

  const tarefa = {
    name: document.querySelector("#name").value.trim(),
    description: document.querySelector("#description").value.trim(),
    priority: Number(document.querySelector("#priority").value),
    done: document.querySelector("#done").checked,
  };

  console.log("Tarefa enviada:", tarefa);

  await adicionarTarefa(tarefa);
});

buscarTarefas();
