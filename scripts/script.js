let wizardArray = [];
const container = document.querySelector(".container");

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
    const name = prompt("Name?");
    const content = prompt("Content?");
    const id = getLargestID() + 1;

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

        sectionName.textContent = `${section.name} (ID: ${section.id})`
        sectionBody.textContent = section.content;

        if (section.buttons) {
            for (let y = 0; y < section.buttons.length; y++) {
                const sectionButton = document.createElement("li");
                sectionButton.textContent = `${section.buttons[y].text} (Go to: ${section.buttons[y].link})`;
                sectionButtons.appendChild(sectionButton);
            }
        }

        sectionContainer.appendChild(sectionName);
        sectionContainer.appendChild(sectionBody);
        sectionContainer.appendChild(sectionButtons);
        container.appendChild(sectionContainer);
    }

}

function getLargestID() {
    return Math.max(...wizardArray.map(section => section.id));
}

function changeSectionContent(id) {
    const foundIndex = wizardArray.findIndex(section => section.id == id);

    if (!wizardArray[foundIndex]) {
        alert("No ID found");
        return;
    }

    const name = prompt("Change name to?");
    wizardArray[foundIndex].name = name;

    addSectionsToPage();
}

addSectionsToPage();