/*fetch("http://localhost:3001/api/v1/categories")
  .then((response) => response.json())
  .then((data) => {
    const categoriesList = document.getElementById("categories-list");
    data.data.forEach((category) => {
      // Modification ici pour accéder aux données
      const categoryItem = document.createElement("li");
      categoryItem.innerText = category.name;
      categoriesList.appendChild(categoryItem);
    });
  })
  .catch((err) => {
    console.error(err);
    // Gérez les erreurs de récupération des données ici
  });
*/
const categoriesUrl = "http://localhost:3001/api/v1/categories";
const subcategoriesUrl = "http://localhost:3001/api/v1/subcategories/";

async function fetchCategoriesAndSubcategories() {
  const categoriesResponse = await fetch(categoriesUrl);
  const categories = await categoriesResponse.json();

  const subcategoriesResponse = await fetch(subcategoriesUrl);
  const subcategories = await subcategoriesResponse.json();

  const categoriesList = document.createElement("ul");
  categoriesList.classList.add("categories");

  categories.data.forEach((category) => {
    const categoryItem = document.createElement("li");
    categoryItem.classList.add("category");
    categoryItem.textContent = category.name;

    const subcategoriesList = document.createElement("ul");
    subcategoriesList.classList.add("subcategories");

    subcategories.data.forEach((subcategory) => {
      if (
        subcategory.categorie &&
        subcategory.categorie.name === category.name
      ) {
        const subcategoryItem = document.createElement("li");
        subcategoryItem.classList.add("subcategory");
        subcategoryItem.textContent = subcategory.name;
        subcategoriesList.appendChild(subcategoryItem);
      }
    });

    categoryItem.appendChild(subcategoriesList);
    categoriesList.appendChild(categoryItem);
  });

  document.body.appendChild(categoriesList);
}
// Récupération des catégories depuis l'API
fetch("http://localhost:3001/api/v1/categories")
  .then((response) => response.json())
  .then((categories) => {
    const categoriesList = document.getElementById("categories-list");

    // Parcours de toutes les catégories
    categories.data.forEach((category) => {
      const tr = document.createElement("tr");

      // Ajout de la catégorie dans une cellule
      const categoryNameCell = document.createElement("td");
      categoryNameCell.innerText = category.name;
      tr.appendChild(categoryNameCell);

      // Ajout d'un bouton de suppression dans une cellule
      const deleteButtonCell = document.createElement("td");
      const deleteButton = document.createElement("button");
      deleteButton.classList.add("btn");
      deleteButton.classList.add("btn-primary");
      deleteButton.innerText = "Supprimer";
      deleteButton.addEventListener("click", () => {
        // Envoi de la requête DELETE pour supprimer la catégorie
        fetch(`http://localhost:3001/api/v1/categories/${category._id}`, {
          method: "DELETE",
        }).then((response) => {
          // Si la suppression réussit, retirer la ligne du tableau
          if (response.ok) {
            tr.remove();
          }
        });
      });
      deleteButtonCell.appendChild(deleteButton);
      tr.appendChild(deleteButtonCell);

      categoriesList.appendChild(tr);
    });
  });
fetchCategoriesAndSubcategories();
