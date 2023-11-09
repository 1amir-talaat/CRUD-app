let prodects = [];
let currntProdect = null;

const updatePodectsList = (data) => {
  const table = document.getElementById("table");
  prodects = data;
  let productsList = "";
  prodects.forEach((product) => {
    productsList += `<tr>
        <td>${product.name}</td>
        <td>${product.price}</td>
        <td>${product.description}</td>
        <td>
        <button class="btn btn-danger me-3" onclick=deleteProduct(${product.id})>Delete</button>
        <button class="btn btn-success" onclick=editProduct(${product.id})>edit</button>
        </td></tr>`;
  });

  table.innerHTML = productsList;
};

const getProducts = async () => {
  await fetch("http://localhost:3000/products")
    .then((res) => res.json())
    .then((data) => updatePodectsList(data))
    .catch((error) => console.error("Error fetching products: " + error));
};

const resetForm = () => {
  document.querySelector("#prodectName").value = "";
  document.querySelector("#prodectPrice").value = "";
  document.querySelector("#prodectDesc").value = "";
  document.querySelector("#add").style.display = "block";
  document.querySelector("#update").style.display = "none";
};

const getFormValues = () => {
  let values = {
    name: document.querySelector("#prodectName").value,
    price: document.querySelector("#prodectPrice").value,
    description: document.querySelector("#prodectDesc").value,
  };

  return values;
};

const addProduct = async (e) => {
  e.preventDefault();

  const data = getFormValues();

  await fetch("http://localhost:3000/addproduct", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(() => {
    resetForm();
    getProducts();
  });
};

const deleteProduct = async (id) => {
  await fetch(`http://localhost:3000/deletprodect/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(() => getProducts());
};

const editProduct = (id) => {
  const updateButton = document.querySelector("#update");
  const addButton = document.querySelector("#add");
  updateButton.style.display = "block";
  addButton.style.display = "none";

  let product = prodects.filter((prodect) => {
    return prodect.id == id;
  })[0];

  document.querySelector("#prodectName").value = product.name;
  document.querySelector("#prodectPrice").value = product.price;
  document.querySelector("#prodectDesc").value = product.description;

  currntProdect = id;
};

const handelFormEditProdect = () => {
  const updatedData = getFormValues();

  fetch(`http://localhost:3000/updateproduct/${currntProdect}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  }).then(() => {
    resetForm();
    getProducts();
  });
};

document.querySelector("#add").addEventListener("click", addProduct);
document.querySelector("#update").addEventListener("click", handelFormEditProdect);

resetForm();
getProducts();
