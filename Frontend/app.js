const API_URL = "http://localhost:8080/todos";

const listaPendentes = document.getElementById("listaPendentes");
const listaConcluidas = document.getElementById("listaConcluidas");

document.querySelector("#btnNovaTarefa").addEventListener("click", () => {
  prepararModalCreate();
});

async function buscarTarefas() {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Erro ao buscar tarefas");
    }

    const tarefas = await response.json();
    exibirTarefas(tarefas);
    atualizarContadores(tarefas);
    return tarefas;
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
  };

  tarefas.forEach((tarefa) => {
    const card = document.createElement("article");
    card.draggable = true;
    card.dataset.id = tarefa.id;
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
    name.classList.add("mb-0", "fs-10");
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
    description.classList.add("mb-2");
    description.textContent =
      tarefa.description || "Nenhuma descrição informada.";

    const footer = document.createElement("div");
    footer.classList.add(
      "d-flex",
      "justify-content-between",
      "align-items-center",
      "gap-2",
      "pt-2",
      "mt-2",
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
    editButton.addEventListener("click", () => {
      pepararModalEdit(tarefa);
    });
    editButton.setAttribute("data-bs-toggle", "modal");
    editButton.setAttribute("data-bs-target", "#modalTarefa");
    editButton.classList.add(
      "btn",
      "btn-sm",
      "btn-outline-info",
      "fw-semibold",
      "me-1",
    );
    editButton.textContent = "Editar";

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.addEventListener("click", () => {
      deletarTarefa(tarefa.id);
    });
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

  countPendentes.textContent = tarefas.filter((tarefa) => !tarefa.done).length;

  countConcluidas.textContent = tarefas.filter((tarefa) => tarefa.done).length;
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
    atualizarContadores(tarefasAtualizadas);

    tarefas = tarefasAtualizadas;
    exibirTarefas(tarefas);
  } catch (error) {
    console.error("Erro ao adicionar tarefa:", error);
  }
}

async function atualizarTarefa(tarefaId, tarefaAtualizada) {
  try {
    const response = await fetch(`${API_URL}/${tarefaId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tarefaAtualizada),
    });

    if (!response.ok) {
      throw new Error("Erro ao atualizar tarefa");
    }

    const tarefasAtualizadas = await response.json();

    tarefas = tarefasAtualizadas;
    exibirTarefas(tarefas);
    atualizarContadores(tarefas);
  } catch (error) {
    console.error("Erro ao atualizar tarefa:", error);
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

  if (document.querySelector("#tarefaId").value) {
    const tarefaId = document.querySelector("#tarefaId").value;
    await atualizarTarefa(tarefaId, tarefa);
  } else {
    await adicionarTarefa(tarefa);
  }
  fecharModal();
});

// Function for clear the form
function limparFormulario() {
  document.querySelector("#tarefaId").value = "";
  document.querySelector("#name").value = "";
  document.querySelector("#description").value = "";
  document.querySelector("#priority").value = "1";
  document.querySelector("#done").checked = false;
}

// Function for close the modal
function fecharModal() {
  const modalElement = document.querySelector("#modalTarefa");
  const modalInstance = bootstrap.Modal.getInstance(modalElement);
  modalInstance?.hide(modalElement);
}

const modalElement = document.querySelector("#modalTarefa");
//clearing the modal EventListener
modalElement.addEventListener("hidden.bs.modal", () => {
  limparFormulario();
});

//preparing the modal for crate a new task
function prepararModalCreate() {
  document.querySelector("#tarefaId").value = "";
  document.querySelector("#modalTarefaLabel").textContent = "Nova tarefa";
  document.querySelector("#btnModalTarefa").textContent = "Salvar tarefa";
}

//preparing the modal for the task you'll edit
function pepararModalEdit(tarefa) {
  document.querySelector("#tarefaId").value = tarefa.id;
  document.querySelector("#name").value = tarefa.name;
  document.querySelector("#description").value = tarefa.description;
  document.querySelector("#priority").value = tarefa.priority;
  document.querySelector("#done").checked = tarefa.done;

  document.querySelector("#modalTarefaLabel").textContent = "Editar tarefa";
  document.querySelector("#btnModalTarefa").textContent = "Atualizar tarefa";
}

async function deletarTarefa(tarefaId) {
  if (tarefaId == null || tarefaId === undefined) {
    console.log("Erro ao buscar ID da tarefa.");
  }

  try {
    const response = await fetch(`${API_URL}/${tarefaId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Erro ao deletar tarefa");
    }

    const tarefasAtualizadas = await response.json();

    tarefas = tarefasAtualizadas;
    exibirTarefas(tarefas);
    atualizarContadores(tarefas);
  } catch (error) {
    console.error("Erro ao deletar tarefa:", error);
  }

  await buscarTarefas();
}

//DRAG AND DROP

document.addEventListener("dragstart", (e) => {
  const card = e.target.closest("[data-id]");

  if (!card || !e.dataTransfer) return;

  e.target.classList.add("dragging");

  e.dataTransfer.setData("text/plain", e.target.dataset.id);
});

document.addEventListener("dragend", (e) => {
  e.target.classList.remove("dragging");
});

const listas = [listaPendentes, listaConcluidas];

listas.forEach((lista) => {
  lista.addEventListener("dragover", (e) => {
    e.preventDefault();

    lista.classList.add("drag-over");
  });

  lista.addEventListener("dragleave", () => {
    lista.classList.remove("drag-over");
  });

  lista.addEventListener("drop", async (e) => {
    e.preventDefault();
    lista.classList.remove("drag-over");

    if (!e.dataTransfer) {
      console.error("Evento sem dataTransfer:", e);
      return;
    }

    const tarefaId = Number(e.dataTransfer.getData("text/plain"));

    if (!Number.isFinite(tarefaId)) {
      console.error("ID inválido:", tarefaId);
      return;
    }

    const tarefas = await buscarTarefas();
    if (!tarefas) return;

    const tarefa = tarefas.find((t) => t.id === tarefaId);
    if (!tarefa) return;

    const concluida = lista === listaConcluidas;

    if (tarefa.done === concluida) return;

    const tarefaAtualizada = {
      ...tarefa,
      done: concluida,
    };

    await atualizarTarefa(tarefaId, tarefaAtualizada);
    await buscarTarefas();
  });
});

async function BuscarPorTexto(texto) {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Erro ao buscar tarefas");
    }

    const tarefas = await response.json();
    const termo = texto.trim().toLowerCase();

    return tarefas.filter((tarefa) =>
      tarefa.name?.toLowerCase().includes(termo),
    );
  } catch (error) {
    console.error("Erro ao buscar tarefas:", error);
    return [];
  }
}

const formularioPesquisa = document.getElementById("searchTarefa");
const inputPesquisa = document.getElementById("inputPesquisa");

formularioPesquisa.addEventListener("submit", async (e) => {
  e.preventDefault();

  const texto = inputPesquisa.value;
  const tarefas = await BuscarPorTexto(texto);

  limparBarra();
  exibirTarefas(tarefas);
  atualizarContadores(tarefas);
});

function limparBarra() {
  document.querySelector("#inputPesquisa").value = "";
}

buscarTarefas();
