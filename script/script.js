// fetching the data from api

const loadCategoric = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => loadDisplay(data.categories))
    .catch((error) => console.log(error));
};

const loadVideos = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => displayVideo(data.videos))
    .catch((error) => console.log(error));
};

// displaying the fetch data to UI

const loadDisplay = (categories) => {
  const categoriesContainer = document.getElementById("categories");
  categories.forEach((item) => {
    categoriesContainer.innerHTML += `
    <button class="btn">${item.category}</button>
    `;
  });
};

const displayVideo = (videos) => {
  const videoContainer = document.getElementById("videos");
  videos.forEach((video) => {
    videoContainer.innerHTML += `
    <div class="card card-compact ">
        <figure>
          <img
            src=${video.thumbnail}
            alt="thumbnail" />
        </figure>
        <div class="card-body">
          <h2 class="card-title">Shoes!</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions ">
            <button class="btn btn-primary">Buy Now</button>
          </div>
        </div>
    </div>  
    `;
  });
};

loadCategoric();
loadVideos();
