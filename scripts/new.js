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
    addNewSectionButton.addEventListener("click", () => { openModal("show");});

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
    modalHeader.appendChild(modalTitle);

    const modalHeaderClose = document.createElement("button");
    modalHeaderClose.classList.add("header-close");
    modalHeaderClose.textContent = "x";
    modalHeaderClose.addEventListener("click", () => { openModal("close");});
    modalHeader.appendChild(modalHeaderClose);

    modalContent.classList.add("modal-content");
    modalWindow.appendChild(modalContent);

    modalFooter.classList.add("modal-footer");
    modalWindow.appendChild(modalFooter);

    const closeButton = document.createElement("button");
    closeButton.textContent = "Close";
    closeButton.addEventListener("click", () => { openModal("close");});
    modalFooter.appendChild(closeButton);

    const saveButton = document.createElement("button");
    saveButton.textContent = "Save";    
    saveButton.classList.add("btn-primary");
    modalFooter.appendChild(saveButton);
}

function createCards() {
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
    }
}

function buildPage() {
    createHeader();
    createContainer();
    createAddNewSectionButton();
    createModal();
}

buildPage();





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