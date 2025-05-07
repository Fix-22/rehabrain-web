export const generateButton = (parentElement, pubsub) => {
    let id, classList, text, icon, dataTarget;

    const button = {
        build: (inputId, inputClassList, inputText, inputIcon, inputDataTarget) => {
            id = inputId;
            classList = inputClassList;
            text = inputText;
            icon = inputIcon;
            dataTarget = inputDataTarget;
        },
        render: () => {
            parentElement.innerHTML = '<button id="' + id + '" class="' + classList.join(" ") + '"' + (dataTarget ? ' data-target="' + dataTarget + '" ' : "") + '>' + (icon ? '<span class="icon">' + icon + '</span>' : "") + (text ? '<span>' + text + '</span>' : "") + "</button>";
            
            document.getElementById(id).onclick = () => {
                pubsub.publish(id + "-onclick");
            }
        }
    };

    return button;
};