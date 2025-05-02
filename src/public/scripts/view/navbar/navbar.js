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
                html += `<p class="control">
							<a class="button ` + e.class + (e.link ? `" href="` + e.link : `"`) + `">
								<span class="icon">` +
									e.icon +
								`</span>
								<span>` + e.text + `</span>
							</a>
						</p>`;
            });

            parentElment.innerHTML = html;
        }
    };

    return navabr;
};