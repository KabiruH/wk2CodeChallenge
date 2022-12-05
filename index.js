
//DOM functions
let characters = [];
let selectedCharacter = null;

//Get elements from DOM
const list = document.getElementsByTagName("ul")[0]
const characterId = document.getElementById("characterId")
const characterName = document.getElementById("characterName")
const characterImage = document.getElementById("img")
const characterVotes = document.getElementById("votes")
const voteButton = document.getElementById("vote")
const resetButton = document.getElementById("reset")
const addButton = document.getElementById("add")

window.addEventListener("load", () => {
  fetchData()
});

voteButton.addEventListener("click", () => {
  if (selectedCharacter) {
    const ID = characters.findIndex((character) => character.id == selectedCharacter.id);
    characters.splice(ID, 1, {
      ...selectedCharacter,
      votes: parseInt(selectedCharacter.votes ++),
    });

    setCharacterDetails(characters[ID]);
  }
});



resetButton.addEventListener("click", () => {
  characters = characters.map((character) => {
    if ((selectedCharacter.id = character.id)) {
      selectedCharacter.votes = 0;
    }

    return { ...character, votes: 0 };
  });

  if (selectedCharacter) {
    setCharacterDetails(selectedCharacter);
  }
});

function fetchData() {
  fetch("http://localhost:3000/characters", { method: "GET" })
    .then((response) => response.json())
    .then((data) => {
      characters = data;

      characters.forEach((character, id) => {
        const listItem = document.createElement("li");
        listItem.setAttribute("class", "listItem");
        list.setAttribute("id", id);
        listItem.textContent = character.name;

        listItem.addEventListener("click", () => {
          selectedCharacter = character;
          setCharacterDetails(character);
        });
        list.appendChild(listItem);
      });
    });
}

function setCharacterDetails(character) {
  characterId.textContent = character.id;
  characterName.textContent = character.name;
  characterImage.setAttribute("src", character.image);
  characterVotes.textContent = character.votes;
}