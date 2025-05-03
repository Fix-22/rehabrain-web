export const generateNavbar = (parentElment, pubsub) => {
    const navabr = {
        build: () => {
            pubsub.subscribe("loginForm-login-success", credentials => {
                navabr.render([
                    {
                        class: "is-link",
                        link: "#home",
                        icon: '<i class="fa-solid fa-house"></i>',
                        text: "Home"
                    },
                    {
                        class: "is-light",
                        link: "",
                        icon: '<i class="fa-solid fa-circle-user"></i>',
                        text: "Informazioni personali"
                    }
                ])
            });
        },
        render: (items) => {
            let html = "";

            items.forEach(e => {
                html += e.link 
                        ? 
                        `<p class="control">
							<a class="button ` + e.class + `" href="` + e.link + `">
								<span class="icon">` +
									e.icon +
								`</span>
								<span>` + e.text + `</span>
							</a>
						</p>`
                        :
                        `<p class="control">
							<button class="button ` + e.class + `" ` + (e.dataTarget ? `data-target="` + e.dataTarget : "") + `">
								<span class="icon">` +
									e.icon +
								`</span>
								<span>` + e.text + `</span>
							</button>
						</p>`;
            });

            parentElment.innerHTML = html;
        }
    };

    return navabr;
};