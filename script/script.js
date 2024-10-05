// utility

const removeClasses = () => {
  const removeBtn = document.getElementsByClassName("category-btn");
  for (const btn of removeBtn) {
    btn.classList.remove("bg-red-500", "text-white");
  }
};

// fetching the data from api
const loadCategoric = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => loadDisplay(data.categories))
    .catch((error) => console.log(error));
};

const loadVideos = (searchValue = "") => {
  fetch(
    `https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchValue}`
  )
    .then((res) => res.json())
    .then((data) => displayVideo(data.videos))
    .catch((error) => console.log(error));
};

const loadVideosByCategories = (id) => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      const btn = document.getElementById(`btn-${id}`);
      removeClasses();
      btn.classList.add("bg-red-500", "text-white");
      displayVideo(data.category);
    })
    .catch((error) => console.log(error));
};

async function loadDetails(videoId) {
  const URL = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
  const res = await fetch(URL);
  const data = await res.json();
  showDetails(data.video);
}
const showDetails = (data) => {
  const modal = document.getElementById("modal2");
  document.getElementById("my_modal_5").showModal();
  modal.innerHTML = `
    <img class="w-full object-cover rounded-xl my-4"' src="${data.thumbnail}" />
    <p>${data.description}</p>
    <div class="modal-action">
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn">Close</button>
      </form>
    </div>
  `;
};

// displaying the fetch data to UI

const loadDisplay = (categories) => {
  const categoriesContainer = document.getElementById("categories");
  categories.forEach((item) => {
    categoriesContainer.innerHTML += `
    <button id='btn-${item.category_id}' onclick='loadVideosByCategories(${item.category_id})' class="btn category-btn">${item.category}</button>
    `;
  });
};

const displayVideo = (videos) => {
  const videoContainer = document.getElementById("videos");

  videoContainer.innerHTML = "";

  if (videos.length === 0) {
    videoContainer.classList.remove("grid");
    videoContainer.innerHTML = `
      <div class="min-h-[300px] flex flex-col gap-5 items-center justify-center">
        <img src="assets/Icon.png"/>
        <p class='font-bold text-4xl'>
          There is no videos in this Category
        </p>
      </div>
    `;
    return;
  } else {
    videoContainer.classList.add("grid");
  }

  videos.forEach((video) => {
    videoContainer.innerHTML += `
    <div class="card card-compact ">
        <figure class='h-[200px] relative'>
          <img class="w-full h-full object-cover rounded-xl"
            src="${video.thumbnail}"
            alt="thumbnail" />
        
        </figure>
        <div class="flex px-0 py-4 gap-3">
          <div>
              <img class='w-10 h-10 rounded-full object-cover' src="${
                video.authors[0].profile_picture
              }"/>          
          </div>
          <div>
            <p class='font-bold text-xl'>
              ${video.title}
            </p>
            <div class='flex gap-2 items-center'>
              <p class='text-gray-400'>${video.authors[0].profile_name}</p>
              ${
                video.authors[0].verified === true
                  ? `<img class='w-5 h-5' src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png" />`
                  : ""
              }
            </div>
            <p class='text-gray-400'>${video.others.views} views</p>
            <button  onclick="loadDetails('${
              video.video_id
            }')" class='btn btn-sm'>
              Details 
            </button>
          
          </div>
        </div>
    </div>  
    `;
  });
};

document.getElementById("input").addEventListener("input", (e) => {
  loadVideos(e.target.value);
});

document.getElementById("home").addEventListener("click", () => {
  loadVideos();
});

loadCategoric();
loadVideos();
