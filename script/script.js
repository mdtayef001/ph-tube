const loadCategoric = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => loadDisplay(data.categories))
    .catch((error) => console.log(error));
};

const loadDisplay = (categories) => {
  const categoriesContainer = document.getElementById("categories");
  categories.forEach((item) => {
    categoriesContainer.innerHTML += `
    <button class="btn">${item.category}</button>
    `;
  });
};

loadCategoric();
