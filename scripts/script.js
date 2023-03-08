let wizardArray = [];
let selectedIndex;

const container = document.querySelector("#sections");
const saveBtn = document.querySelector("#save-btn");
const loadBtn = document.querySelector("#load-btn");
const addBtn = document.querySelector("#add-btn");
const saveSectionBtn = document.querySelector("#save-section");
// const nameInput = document.querySelector("input[name='name']");
// const contentInput = document.querySelector("textarea[name='content']");
const cancelBtn = document.querySelector("#cancel-btn");
const buttonCheckbox = document.querySelector("#button-checkbox");
const addButtonContainer = document.querySelector("#add-button-container");
const editSection = document.querySelector("#edit-section");

const testData = [
    {
        id: 1,
        name: "Section One",
        content: "Test content here.",
        buttons: [
            {
                text: "Button 1",
                link: 10
            },
            {
                text: "Button 2",
                link: 3
            }
        ]
    },
    {
        id: 10,
        name: "Section Two",
        content: "This is test for section two.",
        buttons: [
            {
                text: "Button 3",
                link: 1
            },
            {
                text: "Button 4",
                link: 3
            }
        ]
    },
    {
        id: 3,
        name: "Section 3",
        content: "This is test for section 3.",
        buttons: [
            {
                text: "Button five",
                link: 10
            },
            {
                text: "Button six",
                link: 1
            }
        ]
    }
]

wizardArray = testData;

function getSections(array) {
    for (let x = 0; x < array.length; x++) {
        console.log(array[x]);
    }
}

function addNewSectionToArray() {
    const newSection = getNewSectionData();
    wizardArray.push(newSection);
    addSectionsToPage();
}

function getNewSectionData() {
    const id = getLargestID() + 1;
    const name = prompt("Name?", `Section ${id}`);
    const content = prompt("Content?", "Content here...");

    const newItem = {
        id: id,
        name: name,
        content: content
    }

    return newItem;
}

function addSectionsToPage() {
    const array = wizardArray;
    container.textContent = "";

    for (let x = 0; x < array.length; x++) {
        const sectionContainer = document.createElement("div");
        const section = array[x];
        const sectionName = document.createElement("h1");
        const sectionBody = document.createElement("p");
        const sectionButtons = document.createElement("ul");
        const sectionEditBtn = document.createElement("button");

        sectionName.textContent = `${section.name} (ID: ${section.id})`
        sectionBody.innerHTML = section.content;

        sectionName.setAttribute("section-value", section.id);

        if (section.buttons) {
            for (let y = 0; y < section.buttons.length; y++) {
                const sectionButton = document.createElement("li");
                sectionButton.textContent = `${section.buttons[y].text} (Go to: ${section.buttons[y].link})`;
                sectionButtons.appendChild(sectionButton);
            }
        }

        if (section.back) {
            const backButton = document.createElement("li");
            backButton.textContent = `Back button  (Go to: ${section.back})`;
            sectionButtons.appendChild(backButton);
        }

        sectionEditBtn.textContent = "Edit";
        sectionEditBtn.classList.add("section-edit");
        sectionEditBtn.setAttribute("value", section.id);

        sectionContainer.appendChild(sectionEditBtn);
        sectionContainer.appendChild(sectionName);
        sectionContainer.appendChild(sectionBody);
        sectionContainer.appendChild(sectionButtons);

        sectionContainer.classList.add("section");
        container.appendChild(sectionContainer);
    }
    addEditButtonEventListener();
}

function getLargestID() {
    if (wizardArray.length > 0) {
        return Math.max(...wizardArray.map(section => section.id));
    } else {
        return 0;
    }
}


function amendSectionContent(newContent, property) {

    if (!wizardArray[selectedIndex]) {
        alert("No ID found");
        return;
    }

    if (!wizardArray[selectedIndex][property]) {
        alert("No property found");
        return;
    }

    wizardArray[selectedIndex][property] = newContent;

    addSectionsToPage();
}

function getIndexOfSection(id) {
    return wizardArray.findIndex(section => section.id == id);
}

function addEditButtonEventListener() {
    const buttons = document.querySelectorAll(".section-edit");

    buttons.forEach((button) => {

        // and for each one we add a 'click' listener
        button.addEventListener("click", () => {
            const sectionID = button.getAttribute("value");
            // amendSectionContent(sectionID, "name");
            loadSectionContentIntoInputs(sectionID);
        });
    });
}

function loadSectionContentIntoInputs(id) {
    const index = getIndexOfSection(id);
    const selectedItem = wizardArray[index];

    editSection.textContent = "";
    const hr = document.createElement("hr");
    const nameInput = createInput("Name", "text");
    const contentInput = createInput("Content", "select");
    const buttonCheckbox = createInput("Buttons", "checkbox");
    const buttonContainer = document.createElement("div");
    const back = document.createElement("div");
    back.classList.add("edit-input");
    const backLabel = document.createElement("label");
    const backCheckbox = document.createElement("input");
    backCheckbox.setAttribute("type", "checkbox");
    backCheckbox.classList.add("edit-input-item");
    backCheckbox.setAttribute("id", "back-checkbox");
    backCheckbox.addEventListener("change", showBackButtonSelect);
    const backSelect = createSectionDropdown();
    backSelect.setAttribute("id", "back-select");
    backSelect.classList.add("edit-input-item");
    backLabel.textContent = "Back button"
    back.appendChild(backLabel);
    back.appendChild(backCheckbox);
    back.appendChild(backSelect);

    editSection.appendChild(nameInput);

    editSection.appendChild(contentInput);

    editSection.appendChild(buttonCheckbox);

    if (selectedItem.buttons) {
        for (let x = 0; x < selectedItem.buttons.length; x++) {

            const button = document.createElement("div");
            const buttonInput = document.createElement("input");
            const buttonSelector = createSectionDropdown();

            button.classList.add("edit-input");
            button.classList.add("button-edit");

            buttonInput.setAttribute("type", "text");
            buttonInput.value = selectedItem.buttons[x].text;
            buttonInput.classList.add("edit-input-item");

            buttonSelector.classList.add("edit-input-item");
            buttonSelector.value = selectedItem.buttons[x].link;
            button.appendChild(buttonInput);
            button.appendChild(buttonSelector);
            buttonContainer.appendChild(button);
        }
        document.querySelector("#buttons-input").checked = true;
        document.querySelector("#buttons-input").disabled = true;
    }


    editSection.appendChild(buttonContainer);
    editSection.appendChild(back);

    const saveButton = document.createElement("button");
    saveButton.textContent = "Apply changes";
    saveButton.setAttribute("id", "edit-save-btn");
    saveButton.addEventListener("click", saveButtonTest);
    saveButton.setAttribute("disabled", "true");

    editSection.appendChild(saveButton);

    document.querySelector("#name-input").value = selectedItem.name;

    document.querySelector("#content-input").value = selectedItem.content.replace(/<br \/>/g, "\n");

    selectedIndex = index;

    const sections = document.querySelectorAll(".edit-input-item");

    sections.forEach((section) => {
        section.addEventListener("keyup", compareContent);
        section.addEventListener("change", compareContent);
    });
}

function saveButtonTest() {
    wizardArray[selectedIndex] = createEditItemToCompare();
    addSectionsToPage();
    const saveButton = document.querySelector("#edit-save-btn");
    saveButton.setAttribute("disabled", "true");
    alert("Content saved!");
}

function compareContent() {
    const currentItem = JSON.stringify(wizardArray[selectedIndex]);
    const editItem = JSON.stringify(createEditItemToCompare());
    const saveButton = document.querySelector("#edit-save-btn");

    if (currentItem === editItem) {
        saveButton.setAttribute("disabled", "true");
    } else {
        saveButton.removeAttribute("disabled");
    }
}

function createEditItemToCompare() {
    const item = {};
    const name = document.querySelector("#name-input");
    const content = document.querySelector("#content-input");
    const buttons = document.querySelectorAll(".button-edit");
    const backCheckbox = document.querySelector("#back-checkbox");
    const backSelect = document.querySelector("#back-select");
    const buttonArray = [];

    buttons.forEach((button) => {
        buttonItem = {};
        buttonItem.text = button.querySelector("input").value;
        buttonItem.link = parseInt(button.querySelector("select").value);
        buttonArray.push(buttonItem);
    });



    item.id = wizardArray[selectedIndex].id;
    item.name = name.value;
    item.content = content.value;

    if (buttons.length > 0) {
        item.buttons = buttonArray;
    }

    if (backCheckbox.checked) {
        item.back = backSelect.value;
    } else {
        item.back = false;
    }

    return item;
}

function saveToLocalStorage() {
    localStorage.setItem("wizardData", JSON.stringify(wizardArray));
    alert("Saved to local storage");
}

function loadFromLocalStorage() {
    const dataFromLocalStorage = localStorage.getItem("wizardData");
    wizardArray = JSON.parse(dataFromLocalStorage);
    alert("Data loaded from local storage");
    addSectionsToPage();
}

function checkIfSavedInLocalStorage() {
    const dataStored = localStorage.getItem("wizardData");

    if (dataStored) {
        const loadData = confirm("There's data stored in localStorage, want to load it?");

        if (loadData) {
            wizardArray = JSON.parse(dataStored);
            console.log(wizardArray)
            addSectionsToPage();

        }
    }
}

function saveSection(e) {
    if (e) {
        e.preventDefault();
    }
    if (!Number.isInteger(selectedIndex)) {
        alert("No section selected...");
        return;
    }

    const changes = checkIfContentChanged();

    console.log(changes);

    if (!changes) return;

    amendSectionContent(nameInput.value, "name");
    amendSectionContent(contentInput.value.replace(/\n/g, "<br />"), "content");
    alert("Content saved!");
    clearInputs();
}

function clearInputs(e) {
    if (e) {
        e.preventDefault();
    }
    nameInput.value = "";
    contentInput.value = "";
    selectedIndex = null;
}

function checkIfContentChanged() {
    if (wizardArray[selectedIndex].name !== nameInput.value) {
        return true;
    }
    else if (wizardArray[selectedIndex].content !== contentInput.value.replace(/\n/g, "<br />")) {
        return true;
    }
    else {
        return false;
    }
}

function watchButtonCheckbox() {
    if (this.checked) {
        addButtonContainer.style.display = "block";
    } else {
        addButtonContainer.style.display = "none";
    }
}

function addButtonSection() {
    const buttonAdd = document.querySelector(".button-add");
    const selectList = createSectionDropdown();

    buttonAdd.appendChild(selectList);
}

function createSectionDropdown() {
    const select = document.createElement("select");
    const initialOption = document.createElement("option");
    initialOption.setAttribute("disabled", "");
    // initialOption.setAttribute("selected", "");
    initialOption.textContent = "-- Select an option --";

    select.appendChild(initialOption);

    for (let x = 0; x < wizardArray.length; x++) {
        const option = document.createElement("option");
        option.setAttribute("value", wizardArray[x].id);
        option.textContent = wizardArray[x].name;

        select.appendChild(option);
    }

    return select;
}

function showBackButtonSelect(e) {
    if (e.target.checked) {
        document.querySelector("#back-select").removeAttribute("disabled");
    } else {
        document.querySelector("#back-select").setAttribute("disabled", "");
        document.querySelector("#back-select").value = null;
    }
}

function createInput(name, type) {
    const itemName = name.toLowerCase() + "-input";

    const item = document.createElement("div");
    item.classList.add("edit-input");

    const label = document.createElement("label");
    label.setAttribute("for", itemName);
    label.textContent = name + ":";
    item.appendChild(label);

    let input;

    if (type === "text") {
        input = document.createElement("input");
        input.setAttribute("type", "text");
    }

    if (type === "select") {
        input = document.createElement("textarea");
        input.setAttribute("rows", "5");
    }

    if (type === "checkbox") {
        input = document.createElement("input");
        input.setAttribute("type", "checkbox");
    }

    input.setAttribute("id", name.toLowerCase() + "-input");
    input.setAttribute("name", name.toLowerCase() + "-input");
    input.classList.add("edit-input-item");
    item.appendChild(input);

    return item;
}

function addContentToEditInputs() {
    console.log("add content");
}



saveBtn.addEventListener("click", saveToLocalStorage);
loadBtn.addEventListener("click", loadFromLocalStorage);
addBtn.addEventListener("click", addNewSectionToArray);


checkIfSavedInLocalStorage();