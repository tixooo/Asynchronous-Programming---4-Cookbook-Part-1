window.addEventListener(`load`, function main() {
    let recipes = `http://localhost:3030/jsonstore/cookbook/recipes`;
    let details = `http://localhost:3030/jsonstore/cookbook/details/`;
    let newPelement = document.createElement(`article`);
    let firstElement = document.querySelector(`main > p`).remove();
    

    fetch(recipes)
    .then((response) => response.json())
    .then(data => Object.entries(data).forEach((entry) => {
    const [key, value] = entry;
    var currentRecepyId = key;
    let currentRecepyName = value.name;
    let currentRecepyImg = value.img;

    let article = document.createElement(`article`);
    article.className = `preview`;
    let titleDiv = document.createElement(`div`);
    titleDiv.className = `title`;
    let smallDiv = document.createElement(`div`);
    smallDiv.className = `small`;
    let h2 = document.createElement(`h2`);
    h2.textContent = currentRecepyName
    let img = document.createElement(`img`);
    img.setAttribute(`src`, currentRecepyImg);

    titleDiv.appendChild(h2);
    article.appendChild(titleDiv);
    smallDiv.appendChild(img);
    article.appendChild(smallDiv);
    document.querySelector(`main`).appendChild(article);

    article.addEventListener(`click`, showDetails)
    
    function showDetails(every) {
    let currentElement = every.currentTarget;
    currentElement.style.display = "none";

    
    fetch(details + currentRecepyId)
    .then((response) => response.json())
    .then(data => {
        let ingredients = data.ingredients;
        let preparation = data.steps;
        let name = data.name;
        let newishImg = data.img;
        
        let newArticle = document.createElement(`article`);
        newArticle.className = `preview`
        let bandDiv = document.createElement(`div`);
        bandDiv.className = `band`;
        let thumbDiv = document.createElement(`div`);
        thumbDiv.className = `thumb`;
        let ingredientsDiv = document.createElement(`div`);
        ingredientsDiv.className = `ingredients`;
        let ingredientsH3 = document.createElement(`h3`);
        ingredientsH3.textContent = `Ingredients:`;
        let newH2 = document.createElement(`h2`);
        let preparationH3 = document.createElement(`h3`);
        preparationH3.textContent = `preparation:`;
        let ul = document.createElement(`ul`);
        let descriptionDiv = document.createElement(`div`);
        descriptionDiv.className = `description`;
        let newImg = document.createElement(`img`);

        newH2.textContent = name;
        newArticle.appendChild(newH2);
        newImg.setAttribute(`src`, newishImg);
        thumbDiv.appendChild(newImg);
        bandDiv.appendChild(thumbDiv);
        ingredientsDiv.appendChild(ingredientsH3);
        for (const every of ingredients) {
            let li = document.createElement(`li`);
            li.textContent = every;
            ul.appendChild(li);
        }
        ingredientsDiv.appendChild(ul);
        bandDiv.appendChild(ingredientsDiv);
        newArticle.appendChild(bandDiv);

        descriptionDiv.appendChild(preparationH3);
        for (const everyLine of preparation) {
            let pElement = document.createElement(`p`);
            pElement.textContent = everyLine;
            descriptionDiv.appendChild(pElement);
        }
        newArticle.appendChild(descriptionDiv);
        

        currentElement.insertAdjacentElement(`beforebegin`, newArticle);
        
        if (newArticle.addEventListener(`click`, main)) {
            hideElement
        }
    })

}

}))
})

