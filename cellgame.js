let colours = ["red", "blue", "yellow"];

//RANDOM
let random = Math.floor(Math.random() * (10 - 1) + 1);
for (let index = 0; index < random; index++) {
  createBox();
}

//CONTADOR
var idI = setInterval(function () {
  createBox();
  gameOver();
}, 1000);

function createBox() {
  let main = document.getElementById("main");
  let box = document.createElement("div");
  box.classList.add("box");
  let e = ~~(Math.random() * colours.length);
  let color = colours[e];
  box.classList.add(color);
  box.classList.add("element");
  box.addEventListener("click", function () {
    remove(this);
  });

  box.addEventListener("click", function () {
    change();
  });
  main.append(box);
}

function remove(box) {
  let color = box.classList[1];
  let group = [box];

 

  // Buscar por la izquierda
  let previous = box.previousElementSibling;
  while (previous && previous.classList && previous.classList[1] == color) {
    group.push(previous);
    previous = previous.previousElementSibling;
  }

   // Buscar por la derecha
   let next = box.nextElementSibling;
   while (next && next.classList && next.classList[1] == color) {
     group.push(next);
     next = next.nextElementSibling;
   }

  // Eliminar elementos
  if (group.length > 2) {
    group.forEach((b) => {
      b.remove();
    });

    // Verificar si has ganado
    if (document.querySelectorAll(".box").length === 0) {
      // Mostrar mensaje de "Has ganado"
      alert(
        "¡Enhorabuena has ganado, prueba otra vez dando al boton TRY AGAIN!"
      );
      clearInterval(idI);
    }
  }
}

function gameOver() {
  var elements = document.querySelectorAll(".element");
  var lastElement = elements[elements.length - 1];

  //AQUÍ LO HAGO CON EL TAMAÑO DEL DIV
  //----------------------------------------------
  if (elements.length > 0) {
    // Obtener el ancho total del último elemento, incluyendo márgenes y bordes
    var totalWidthElement = lastElement.offsetWidth;

    // Obtener la posición del último elemento
    var pos = lastElement.getBoundingClientRect();

    // Obtener el ancho del div
    var main = document.getElementById("main");
    var posDerecho = main.getBoundingClientRect().right;

    // Si la posición del último elemento supera el ancho de la ventana, mostrar "Game Over"
    if (pos.right + totalWidthElement >= posDerecho) {
      alert("Game Over");
      console.log(elements.length);
      clearInterval(idI);
      lastElement.remove();
    }
  }
}

function change() {
  let color1, color2;
  let container = document.getElementById("main");
  container.addEventListener("click", (event) => {
    let box = event.target;
    if (event.ctrlKey) {
      if (box.nextElementSibling) {
        color1 = box.getAttribute("class");
        color2 = box.nextElementSibling.getAttribute("class");
        box.setAttribute("class", color2);
        box.nextElementSibling.setAttribute("class", color1);
      }
    }
  });
}
 