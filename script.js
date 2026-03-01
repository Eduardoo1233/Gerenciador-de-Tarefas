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
     li.classList.toggle("concluida");
      salvarTarefas();
      contadorDeTarefas();
    });
    
    const btnRemover = document.createElement("button");
    btnRemover.textContent = "Remover";
    
    btnRemover.addEventListener("click", function () {   
      li.remove();
      salvarTarefas();
      contadorDeTarefas();
    });
    
    li.appendChild(btnRemover);
    lista.appendChild(li);
    contadorDeTarefas();
  });
  contadorDeTarefas();
}

//Contador de tarefas nao concluidas 

const contadorText = document.createElement("p");
contadorText.classList.add("contadorText");
container.appendChild(contadorText);

function contadorDeTarefas() {
  const listaCompleta = document.querySelectorAll("#lista li");
  const totalDeTarefas = listaCompleta.length;
  
  let contador = 0;
  
  listaCompleta.forEach(li => {
    if(!li.classList.contains("concluida")) {
      contador++;
    };
  });
  
  if(totalDeTarefas === 0) {
    contadorText.textContent = "Você ainda não adicionou uma Tarefa!";
  } else if (contador === 0) {
      contadorText.textContent = "Parabens você concluiu todas as suas tarefas!"; 
  } else if (contador === 1) {
      contadorText.textContent = "Falta 1 tarefa a ser concluida";
  } else {
    contadorText.textContent = `Faltam ${contador} tarefas a serem concluidas!`;
  };
  const tarefasConcluidas = totalDeTarefas - contador;
  btnRemoverConcluidas.disabled = tarefasConcluidas === 0;
};

//fim contador de tarefas nao concluidas

const btnRemoverConcluidas = document.createElement("button");
btnRemoverConcluidas.classList.add("btn-limpar");
btnRemoverConcluidas.textContent = "Remover Tarefas Concluidas";
container.appendChild(btnRemoverConcluidas);
  
btnRemoverConcluidas.addEventListener("click", function () {
  document.querySelectorAll("#lista li").forEach(li => {
    if (li.classList.contains("concluida")) {
      li.remove();
    };
  });
  salvarTarefas();
  contadorDeTarefas();
});
carregarTarefas();
