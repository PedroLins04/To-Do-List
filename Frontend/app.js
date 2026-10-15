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

  tarefas.forEach((tarefa) => {
    const card = document.createElement("article");
    card.classList.add("card", "mb-3");

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const name = document.createElement("h5");
    name.classList.add("card-title");
    name.textContent = tarefa.titulo;

    const description = document.createElement("p");
    description.classList.add("card-text");
    description.textContent = tarefa.descricao;

    const priorities = {
      1: { nome: "Baixa", classe: "text-bg-success" },
      2: { nome: "Média", classe: "text-bg-warning" },
      3: { nome: "Alta", classe: "text-bg-danger" },
      4: { nome: "Urgente", classe: "text-bg-dark" },
    };

    const priority = document.createElement("span");
    priority.classList.add("badge", "rounded-pill");

    priority.classList.add(priorities[tarefa.priority].classe);
    priority.textContent = priorities[tarefa.priority].nome;

    cardBody.appendChild(name);
    cardBody.appendChild(description);
    cardBody.appendChild(priority);
    card.appendChild(cardBody);

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

buscarTarefas();
