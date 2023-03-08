let wizardArray = [];
let selectedIndex;

const container = document.querySelector("#sections");
const saveBtn = document.querySelector("#save-btn");
const loadBtn = document.querySelector("#load-btn");
const addBtn = document.querySelector("#add-btn");
const saveSectionBtn = document.querySelector("#save-section");
const nameInput = document.querySelector("input[name='name']");
const contentInput = document.querySelector("textarea[name='content']");
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
                link: 2
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
                link: 2
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
                link: 2
            },
            {
                text: "Button six",
                link: 3
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

    nameInput.value = wizardArray[index].name;
    contentInput.value = wizardArray[index].content.replace(/<br \/>/g, "\n");

    selectedIndex = index;
    console.log(nameInput);
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
    initialOption.setAttribute("selected", "");
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

function createEditSection() {
    const nameInput = createInput("Name", "text");
    const contentInput = createInput("Content", "select");

    editSection.appendChild(nameInput);
    editSection.appendChild(contentInput);

}

function createInput(name, type) {
    const itemName = name.toLowerCase() + "-input";

    const item = document.createElement("div");
    item.classList.add("edit-input");

    const label = document.createElement("label");
    label.setAttribute("for", itemName);
    label.textContent = name + ":";

    item.appendChild(label);

    if (type === "text") {
        const input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("id", name.toLowerCase() + "-input");
        input.setAttribute("name", name.toLowerCase() + "-input");
        item.appendChild(input);
    }

    if (type === "select") {
        const input = document.createElement("textarea");
        input.setAttribute("rows", "5");
        input.setAttribute("id", name.toLowerCase() + "-input");
        input.setAttribute("name", name.toLowerCase() + "-input");
        item.appendChild(input);
    }

    return item;
}



saveBtn.addEventListener("click", saveToLocalStorage);
loadBtn.addEventListener("click", loadFromLocalStorage);
addBtn.addEventListener("click", addNewSectionToArray);
saveSectionBtn.addEventListener("click", saveSection)
cancelBtn.addEventListener("click", clearInputs);
buttonCheckbox.addEventListener("change", watchButtonCheckbox)