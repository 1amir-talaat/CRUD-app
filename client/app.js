const updatePodectsList = (products) => {
  const table = document.getElementById("table")
  let productsList = ''
  products.forEach(product => {
    productsList += `<tr>
        <td>${product.name}</td>
        <td>${product.price}</td>
        <td>${product.description}</td>
        <td>
        <button class="btn btn-danger me-3" onclick=deletePodect(${product.id})>Delete</button>
        <button class="btn btn-success" onclick=editPodect(${product.id})>update</button>
        </td></tr>`
  });

  table.innerHTML = productsList
}

const getProdects = async () => {
  await fetch('http://localhost:3000/products')
    .then(
      (res) => res.json()
    )
    .then(
      (data) => updatePodectsList(data)
    )
}

const addProduct = async (e) => {
  e.preventDefault()

  const data = {
    name: e.target.prodectName.value,
    price: e.target.prodectPrice.value,
    description: e.target.prodectDesc.value,
  }

  await fetch('http://localhost:3000/addproduct', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  e.target.prodectName.value = ''
  e.target.prodectPrice.value = ''
  e.target.prodectDesc.value = ''

  getProdects()

}

const deletePodect = async (id) => {
  await fetch(`http://localhost:3000/deletprodect/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  getProdects()

}

const updatePodect = (id) => {
  
}

getProdects()
