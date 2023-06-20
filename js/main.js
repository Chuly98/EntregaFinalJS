const carrito = JSON.parse(localStorage.getItem("carrito")) ?? []

const verProducto = ({ id, nombre, precio, stock, urlImg }) => {
    const contenedorTarjetas = document.querySelector("#contenedorTarjetas")
    const tarjeta = document.createElement("div")
    tarjeta.className = "tarjeta"
    tarjeta.innerHTML = `
                        <img src="${urlImg}" alt="">
                        <div class="contenido">
                            <h3>${nombre}</h3>
                            <span><b>Precio:</b> ${precio}$</span>
                        </div>
                        <form id="formCarrito${id}">
                        <input name="id" type="hidden" value="${id}">
                        <input name="cantidad" type="number" value="1" min="1" max="${stock}">
                        <button type="submit">Agregar Carrito</button>
                        </form>
                        
    `
    contenedorTarjetas.append(tarjeta)
}
let cantidadTotal = 0

const agregarCarrito = (id) => {
    const formCarrito = document.querySelector("#formCarrito" + id)
    formCarrito.addEventListener("submit", (e) => {
        e.preventDefault()
        const cantidad = e.target.children["cantidad"].value
        carrito.push({
            id,
            cantidad
        })
        localStorage.setItem("carrito", JSON.stringify(carrito))

        cantidadTotal = cantidadTotal + cantidad
        const numeroCarrito = document.querySelector("#numeroCarrito")
        numeroCarrito.innerText = cantidadTotal
        console.log(cantidadTotal)
        Toastify({
            text: "Producto Agregado Al Carrito!",
            duration: 2000,
            gravity: "bottom",
            position: "right",
            style: {
                background: "black",
                width: "300px",
                textAlign: "center",
                borderRadius: "5px"
            }
        }).showToast();


    })
}
const verProductos = async () => {
    const res = await fetch("./productos.json")
    const productos = await res.json()
    productos.forEach(producto => {
        if (producto.stock != 0) {
            verProducto(producto)
            agregarCarrito(producto.id)
        }

    })
}

verProductos()