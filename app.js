fetch('https://www.themealdb.com/api/json/v1/1/random.php')
  .then(response => response.json())
  .then(data => {
    const random_item = data.meals[0];
    const heading = random_item.strMeal;
    const image = random_item.strMealThumb;
    document.getElementById('random-title').textContent = heading;
    

    const foodImg = document.querySelector('.food-image');
    foodImg.src = image;
    foodImg.alt = heading;

  })
  .catch(error => {
    console.log('Error', error);
  });




// Open the modal
function openModal() {
  var modal = document.getElementById("myModal");
  modal.style.display = "block";
  displayIngredients(); // Display ingredients when modal is opened
}

// Close the modal
function closeModal() {
  var modal = document.getElementById("myModal");
  modal.style.display = "none";
}

// Display ingredients in the modal
function displayIngredients() {
  const modalTitle = document.getElementById("modal-title");
  const ingredientList = document.getElementById("ingredient-list");

  // Fetch ingredients for the selected food (you can modify this based on your API response structure)
  fetch('https://www.themealdb.com/api/json/v1/1/random.php')
      .then(response => response.json())
      .then(data => {
          const random_item = data.meals[0];
          const heading = random_item.strMeal;
          const ingredients = getIngredients(random_item);

          modalTitle.textContent = heading;
          ingredientList.innerHTML = ingredients;
      })
      .catch(error => {
          console.log('Error', error);
      });
}

// Helper function to extract and format ingredients
function getIngredients(meal) {
  let ingredients = '';
  for (let i = 1; i <= 20; i++) { // Assuming there are maximum 20 ingredients
      if (meal['strIngredient' + i]) {
          ingredients += `<li>${meal['strIngredient' + i]} - ${meal['strMeasure' + i]}</li>`;
      } else {
          break;
      }
  }
  return ingredients;
}

// Search functionality
const searchForm = document.querySelector('form');
searchForm.addEventListener('submit', function (event) {
  event.preventDefault(); 

  const searchbarText = document.getElementById("search-barr").value;
  
  if (searchbarText.trim() !== "") { 
      fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchbarText}`)
          .then(response => response.json())
          .then(data => {
              console.log(data);
              displayResult(data.meals);
          })
          .catch(error => {
              console.log('Error', error);
          });
  }
});

// Display search results
function displayResult(meals) {
  const searchResultsContainer = document.querySelector('.food-search');
  searchResultsContainer.innerHTML = ''; 

  meals.forEach(meal => {
      const mealDiv = document.createElement('div');
      mealDiv.classList.add('meall');

      const mealImage = document.createElement('img');
      mealImage.classList.add('image-meal');
      mealImage.src = meal.strMealThumb;
      mealImage.alt = meal.strMeal;
      mealImage.onclick = openModal; // Open modal when image is clicked

      const mealheading = document.createElement('h3');
      mealheading.classList.add('heading-meal');
      mealheading.textContent = meal.strMeal;

      mealDiv.appendChild(mealheading);
      mealDiv.appendChild(mealImage);

      searchResultsContainer.appendChild(mealDiv);
  });
}
