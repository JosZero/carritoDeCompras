const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const listaCursos = document.querySelector("#lista-cursos");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");

let articulosCarrito = [];


cargarEventListeners();

function cargarEventListeners(){
      listaCursos.addEventListener('click',agregarCurso);

      //elimina cursos de carrito
      carrito.addEventListener('click',eliminarCurso);

      vaciarCarritoBtn.addEventListener('click',()=>{
            
            articulosCarrito = [];
            limpiarHtml();
      });
}

//Funciones
function agregarCurso(e){
      e.preventDefault();

      if(e.target.classList.contains('agregar-carrito')){
           
            const cursoSelect = e.target.parentElement.parentElement;

            leerDatosCurso(cursoSelect);
      }
      
}

//lee el contenido del html
function leerDatosCurso(course){

      //console.log(courseSelect);

      //crear un objeto con contenido actual
      const infoCourse = {
            imagen: course.querySelector('img').src,
            titulo: course.querySelector('h4').textContent,
            precio: course.querySelector('.precio span').textContent,
            id: course.querySelector('a').getAttribute('data-id'),
            cantidad: 1
      }

      //revisar elementos existentes
      const exist = articulosCarrito.some(cursoSome => cursoSome.id === infoCourse.id );
      if(exist){
            //actualizar la cantidad
            const cursos = articulosCarrito.map(curso =>{
                  if(curso.id === infoCourse.id){
                        curso.cantidad++;
                        return curso; //retorna el objeto aztualizado
                  }else{
                        return curso; // retorna los objetos que no son los duplicados
                  }
            });
            articulosCarrito = [...cursos];
      }else{
            //agregar los elementos
            articulosCarrito = [...articulosCarrito, infoCourse];
      }
      
      
      //console.log(articulosCarrito);
      carritoHtml();
}

//muestra el carrito de compras

function carritoHtml(){
      // limpiar el html de tbody
      limpiarHtml();


      articulosCarrito.forEach(course=>{
            const {imagen, titulo,precio,cantidad,id} = course
            const row = document.createElement('tr');
            row.innerHTML = `
                  <td>
                        <img src="${imagen}" width="100">
                  </td>
                  <td>
                        ${titulo}
                  </td>
                  <td>
                        ${precio}
                  </td>
                  <td>
                        ${cantidad}
                  </td>
                  <td>
                        <a href="#" class="borrar-curso" data-id="${id}"> X </a>
                  </td>
            `;

            //agregar al tbody
            contenedorCarrito.appendChild(row);
      })
}

function limpiarHtml(){

      //forma lenta
      //contenedorCarrito.innerHTML = '';

      while(contenedorCarrito.firstChild){
            contenedorCarrito.removeChild(contenedorCarrito.firstChild);
      }
}

//eliminar un curso del carrito
function eliminarCurso(e){
      
      if(e.target.classList.contains('borrar-curso')){
            const cursoId = e.target.getAttribute('data-id');

            //Eliminar del arreglo de articulosCarrito
            articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
            //console.log(articulosCarrito);
      }
      //console.log("desde eliminando")
      carritoHtml();
}