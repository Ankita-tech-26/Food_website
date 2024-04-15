
fetch('https://www.themealdb.com/api/json/v1/1/random.php')
  .then(response => response.json())
  .then(data => {
    const randomFood = data.meals[0];
    const title = randomFood.strMeal;
    const image = randomFood.strMealThumb;
    document.getElementById('random-title').textContent = title;
    

    const foodImg = document.querySelector('.food-image');
    foodImg.src = image;
    foodImg.alt = title;

  })
  .catch(error => {
    console.log('Error', error);
  });


const searchForm = document.querySelector('form');
searchForm.addEventListener('submit', function (event) {
    event.preventDefault(); r

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

        const mealTitle = document.createElement('h3');
        mealTitle.classList.add('title-meal');
        mealTitle.textContent = meal.strMeal;

        mealDiv.appendChild(mealTitle);
        mealDiv.appendChild(mealImage);

        searchResultsContainer.appendChild(mealDiv);
    });
}
