export const generateButton = (parentElement, pubsub) => {
    let config;

    const button = {
        build: (inputConfig) => {
            config = inputConfig;

            if (config.subscribedEvents) {
                Object.keys(config.subscribedEvents).forEach(k => {
                    pubsub.subscribe(k, config.subscribedEvents[k]);
                });
            }
        },
        render: () => {
            parentElement.innerHTML = '<button id="' + config.id + '" class="' + config.classList.join(" ") + '"' + (config.dataTarget ? ' data-target="' + config.dataTarget + '" ' : "") + (config.disabled ? " disabled" : "") + '>' + (config.icon ? '<span class="icon">' + config.icon + '</span>' : "") + (config.text ? '<span>' + config.text + '</span>' : "") + "</button>";
            
            document.getElementById(config.id).onclick = () => {
                pubsub.publish(config.id + "-onclick");
            }
        },
        disable: () => {
            config.disabled = true;
            button.render();
        },
        enable: () => {
            config.disabled = false;
            button.render();
        }
    };

    return button;
};