const input = document.getElementById("tarefa");
const btn = document.getElementById("adicionar");
const lista = document.getElementById("lista");
const container = document.getElementById("container")

btn.addEventListener("click", function () {
  const texto = input.value.trim();
  
  if (texto === "") return;

  const li = document.createElement("li");
  li.textContent = texto;
  
  li.addEventListener("click", function () {
    li.classList.toggle("concluida");
    contadorDeTarefas();
    salvarTarefas();
  })
  
  const btnRemover = document.createElement("button");
  btnRemover.textContent = "Remover";
  
  btnRemover.addEventListener("click", function (event) {
    event.stopPropagation();
    li.remove();
    contadorDeTarefas();
    salvarTarefas();
  });
  
  li.appendChild(btnRemover);

  lista.appendChild(li);
  
  contadorDeTarefas();
  
  salvarTarefas();

  input.value = "";
});

function salvarTarefas() {
  const tarefas = [];
  
  document.querySelectorAll("#lista li").forEach(li => {
    tarefas.push({
      texto: li.firstChild.textContent,
      concluida: li.classList.contains("concluida")
    });
  });
  localStorage.setItem("tarefas", JSON.stringify(tarefas));                   
};

function carregarTarefas() {
  const dados = localStorage.getItem("tarefas");
  
  if (!dados) return;
  
  const tarefas = JSON.parse(dados);
  
  tarefas.forEach(tarefa => {
    const li = document.createElement("li");
    li.textContent = tarefa.texto;
    
    if (tarefa.concluida) {
     li.classList.add("concluida");
    };
    
    li.addEventListener("click", function () {
