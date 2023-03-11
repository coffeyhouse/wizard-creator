const body = document.querySelector("body");
const header = document.createElement("div");
const main = document.createElement("div");
const container = document.createElement("div");
const addNewSectionButton = document.createElement("div");
const cardContainer = document.createElement("div");

const modal = document.createElement("div");
const modalWindow = document.createElement("div");
const modalHeader = document.createElement("div");
const modalContent = document.createElement("div");
const modalFooter = document.createElement("div");

let selectedIndex;

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
        back: 1,
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
        back: 10,
        restart: 1,
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


let sections = testData;

function createHeader() {
    header.setAttribute("id", "header");
    body.appendChild(header);

    const leftHeader = document.createElement("div");
    leftHeader.classList.add("left-header");
    header.appendChild(leftHeader);

    const rightheader = document.createElement("div");
    rightheader.classList.add("right-header");
    header.appendChild(rightheader);

    const icon = document.createElement("div");
    icon.classList.add("icon");

    const iconImage = document.createElement("img");
    iconImage.setAttribute("src", "images/magicwand-svgrepo-com.svg");
    icon.appendChild(iconImage);
    leftHeader.appendChild(icon);

    const headerText = document.createElement("p");
    headerText.textContent = "Wizard creator";
    leftHeader.appendChild(headerText);

    const previewButton = document.createElement("button");
    previewButton.textContent = "Preview";
    rightheader.appendChild(previewButton);

    const manageButton = document.createElement("button");
    manageButton.textContent = "Manage";
    rightheader.appendChild(manageButton);

    const saveButton = document.createElement("button");
    saveButton.textContent = "Save";
    saveButton.classList.add("btn-primary");
    rightheader.appendChild(saveButton);
}

function createContainer() {
    main.setAttribute("id", "main");
    body.appendChild(main);

    container.classList.add("container");
    main.appendChild(container);

    createContainerTitle();
    createCardContainer();
}

function createContainerTitle() {
    const pageTitle = document.createElement("h3");
    pageTitle.textContent = "Test page title";
    container.appendChild(pageTitle);

    const sectionsText = document.createElement("p");
    sectionsText.textContent = "Sections";
    sectionsText.setAttribute("id", "section-title");
    container.appendChild(sectionsText);

    const sectionCount = document.createElement("span");
    sectionCount.classList.add("section-count");
    sectionCount.textContent = "3";
    sectionsText.appendChild(sectionCount);
}

function createCardContainer() {
    cardContainer.setAttribute("id", "card-container");
    container.appendChild(cardContainer);
    createCards();
}

function createAddNewSectionButton() {
    addNewSectionButton.classList.add("add-new");
    addNewSectionButton.addEventListener("click", () => { openModal("show"); });

    const para = document.createElement("p");
    para.textContent = "+ Add section";
    addNewSectionButton.appendChild(para);
    container.appendChild(addNewSectionButton);
}

function createModal() {
    modal.classList.add("modal");
    main.appendChild(modal);

    modalWindow.classList.add("modal-window");
    modal.appendChild(modalWindow);

    modalHeader.classList.add("modal-header");
    modalWindow.appendChild(modalHeader);

    const modalTitle = document.createElement("h4");
    modalTitle.textContent = "Modal title";
    modalTitle.setAttribute("id", "modal-title");
    modalHeader.appendChild(modalTitle);

    const modalHeaderClose = document.createElement("button");
    modalHeaderClose.classList.add("header-close");
    modalHeaderClose.textContent = "x";
    modalHeaderClose.addEventListener("click", () => { openModal("close"); });
    modalHeader.appendChild(modalHeaderClose);

    modalContent.classList.add("modal-content");
    modalWindow.appendChild(modalContent);

    modalFooter.classList.add("modal-footer");
    modalWindow.appendChild(modalFooter);

    const closeButton = document.createElement("button");
    closeButton.textContent = "Close";
    closeButton.addEventListener("click", () => { openModal("close"); });
    modalFooter.appendChild(closeButton);

    const saveButton = document.createElement("button");
    saveButton.textContent = "Save";
    saveButton.setAttribute("id", "modal-save");
    saveButton.classList.add("btn-primary");
    modalFooter.appendChild(saveButton);
}

function createCards() {
    cardContainer.textContent = "";

    for (let x = 0; x < sections.length; x++) {
        const data = sections[x];

        const card = document.createElement("div");
        card.setAttribute("id", `card-${data.id}`);
        card.classList.add("card");
        cardContainer.appendChild(card);

        const cardTitle = document.createElement("div");
        cardTitle.classList.add("card-title");
        card.appendChild(cardTitle);

        const title = document.createElement("h4");
        title.textContent = data.name;
        cardTitle.appendChild(title);

        const editIcon = document.createElement("img");
        editIcon.classList.add("edit-icon");
        editIcon.setAttribute("src", "images/edit.svg");
        editIcon.addEventListener("click", () => { selectSection(data.id); });
        cardTitle.appendChild(editIcon);

        const selected = document.createElement("span");
        selected.classList.add("selected-section");
        selected.textContent = "Selected";
        cardTitle.appendChild(selected);

        const cardContent = document.createElement("div");
        cardContent.classList.add("card-content");
        card.appendChild(cardContent);

        const content = document.createElement("p");
        content.textContent = data.content;
        cardContent.appendChild(content);

        const buttonContainer = document.createElement("ul");
        buttonContainer.classList.add("buttons");
        card.appendChild(buttonContainer);

        data.buttons.forEach((button) => {
            const btn = document.createElement("li");
            btn.classList.add("li-btn");
            btn.textContent = button.text;
            buttonContainer.appendChild(btn);
        });

        if (data.back) {
            const backBtn = document.createElement("li");
            backBtn.textContent = "Back button";
            backBtn.classList.add("li-back");
            buttonContainer.appendChild(backBtn);
        }

        if (data.restart) {
            const restartBtn = document.createElement("li");
            restartBtn.textContent = "Restart button";
            restartBtn.classList.add("li-restart");
            buttonContainer.appendChild(restartBtn);
        }

        const addBtn = document.createElement("li");
        addBtn.textContent = "+ Add button";
        addBtn.classList.add("li-add");
        addBtn.addEventListener("click", openAddButtonModal);
        buttonContainer.appendChild(addBtn);
    }
}

function selectSection(val) {
    const index = getIndexOfSection(val);
    selectedIndex = index;

    const section = document.querySelector("#card-" + val);
    const cards = document.querySelectorAll(".card");
    cards.forEach(card => {
        card.classList.remove("selected");
    });

    const cardTitle = section.querySelector("h4");

    cardTitle.addEventListener("click", createEditModal);

    section.classList.add("selected");
}

function getIndexOfSection(id) {
    return sections.findIndex(section => section.id == id);
}

function openAddButtonModal() {
    amendModalTitle("Add button");

    modalContent.textContent = null;

    const label = document.createElement("label");
    label.textContent = "What type of button:"
    modalContent.appendChild(label);

    const buttonTypeSelect = document.createElement("select");
    modalContent.appendChild(buttonTypeSelect);


    const initialOption = document.createElement("option");
    initialOption.setAttribute("disabled", true);
    initialOption.setAttribute("selected", true);
    initialOption.setAttribute("hidden", true);
    initialOption.textContent = "Choose an option";
    buttonTypeSelect.appendChild(initialOption);

    const optionNormal = document.createElement("option");
    optionNormal.textContent = "Normal button";
    optionNormal.setAttribute("value", "normal");
    buttonTypeSelect.appendChild(optionNormal);

    const optionRestart = document.createElement("option");
    optionRestart.textContent = "Restart button";
    optionRestart.setAttribute("value", "restart");
    if (sections[selectedIndex].restart) {
        optionRestart.setAttribute("disabled", true);
    }
    buttonTypeSelect.appendChild(optionRestart);

    const optionBack = document.createElement("option");
    optionBack.textContent = "Back button";
    optionBack.setAttribute("value", "back");
    if (sections[selectedIndex].back) {
        optionBack.setAttribute("disabled", true);
    }
    buttonTypeSelect.appendChild(optionBack);

    const modalInputs = document.createElement("div");
    modalInputs.setAttribute("id", "modal-inputs");
    modalContent.appendChild(modalInputs);

    buttonTypeSelect.addEventListener("click", changeAddButtonSelect);

    const saveButton = document.querySelector("#modal-save");
    saveButton.addEventListener("click", () => { addButton("normal"); });


    console.log(sections[selectedIndex].back);

    openModal("show");
}

function changeAddButtonSelect() {
    const content = document.querySelector("#modal-inputs");
    console.log(content);

    switch (this.value) {
        case "normal":
            content.textContent = "Show name and where to link to...";
            break;

        case "restart":
            content.textContent = "Show where to restart to.";
            break;

        case "back":
            content.textContent = "WHere to go back to?"
            break;
    }

}

function addButton(type) {
    console.log(sections[selectedIndex].buttons);
    const text = prompt("Button name?")
    const newButton = {
        text: text,
        link: 123
    }

    sections[selectedIndex].buttons.push(newButton);
    createCards();
    openModal("hide");

    removeEventListeners("#modal-save");
}

function removeEventListeners(id) {
    const old_element = document.querySelector(id);
    const new_element = old_element.cloneNode(true);
    old_element.parentNode.replaceChild(new_element, old_element);
}

function amendModalTitle(val) {
    const title = document.querySelector("#modal-title");
    title.textContent = val;
}

function buildPage() {
    createHeader();
    createContainer();
    createAddNewSectionButton();
    createModal();
}

buildPage();

function createEditModal() {
    clearModal();

    const section = sections[selectedIndex];
    console.log(section);
    const titleLabel = document.createElement("label");
    titleLabel.textContent = "Title:";
    modalContent.appendChild(titleLabel);

    const titleInput = document.createElement("input");
    titleInput.setAttribute("type", "text");
    titleInput.value = section.name;
    modalContent.appendChild(titleInput);

    const contentLabel = document.createElement("label");
    contentLabel.textContent = "Content:";
    modalContent.appendChild(contentLabel);

    const contentInput = document.createElement("textarea");
    contentInput.value = section.content;
    modalContent.appendChild(contentInput);

    section.buttons.forEach((button, index) => {
        const btnLabel = document.createElement("label");
        btnLabel.textContent = `Button ${index}:`;
        modalContent.appendChild(btnLabel);

        const btnName = document.createElement("input");
        btnName.setAttribute("type", "text");
        btnName.value = button.text;
        modalContent.appendChild(btnName);

        const btnTarget = createSectionDropdown();
        btnTarget.value = button.link;
        modalContent.appendChild(btnTarget);
    });

    const backLabel = document.createElement("label");
    backLabel.textContent = "Back button:";
    modalContent.appendChild(backLabel);

    const backInput = createSectionDropdown();
    backInput.value = section.back;
    modalContent.appendChild(backInput);

    const restartLabel = document.createElement("label");
    restartLabel.textContent = "Restart button:";
    modalContent.appendChild(restartLabel);

    const restartInput = createSectionDropdown();
    restartInput.value = section.restart;
    modalContent.appendChild(restartInput);

    const newButtonLabel = document.createElement("label");
    newButtonLabel.textContent = "New button:";
    modalContent.appendChild(newButtonLabel);

    const btnName = document.createElement("input");
    btnName.setAttribute("type", "text");
    modalContent.appendChild(btnName);

    const btnTarget = document.createElement("input");
    btnTarget.setAttribute("type", "text");
    modalContent.appendChild(btnTarget);

    openModal('show');
}

function clearModal() {
    modalContent.textContent = null;
}

function createSectionDropdown() {
    const select = document.createElement("select");
    const initialOption = document.createElement("option");
    // initialOption.setAttribute("disabled", "");
    // initialOption.setAttribute("selected", "");
    initialOption.textContent = "-- Select an option --";

    select.appendChild(initialOption);

    for (let x = 0; x < sections.length; x++) {
        const option = document.createElement("option");
        option.setAttribute("value", sections[x].id);
        option.textContent = sections[x].name;

        select.appendChild(option);
    }

    return select;
}



function openModal(trigger) {
    console.log(trigger)
    const modal = document.querySelector(".modal");
    const container = document.querySelector(".container");
    const header = document.querySelector("#header");

    if (trigger == "show") {
        modal.style.visibility = "visible";
        modal.style.opacity = "1";
        container.style.filter = "blur(5px)";
        header.style.filter = "blur(5px)";
    } else {
        modal.style.visibility = "hidden";
        modal.style.opacity = "0";
        container.style.filter = "blur(0px)";
        header.style.filter = "blur(0px)";
    }

}