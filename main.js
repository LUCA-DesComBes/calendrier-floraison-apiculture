const btnSearch = document.getElementById("btn-search");
const container = document.querySelector("main");
const inputSearch = document.getElementById("inp");

function moisEnLettres(mois) {
    const moisArray = [
        "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
        "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
    ];
    return moisArray[mois - 1];
}

function createElement(tag, attributes = {}, textContent = "") {
    const element = document.createElement(tag);
    for (const key in attributes) {
        if (key === "className") element.className = attributes[key];
        else element.setAttribute(key, attributes[key]);
    }
    if (textContent) element.textContent = textContent;
    return element;
}

function createContainer(
    imgplant,
    title,
    start,
	end,
    desc,
    stars,
    propolis,
    pollen,
    nectar
) {
    const section = createElement("section", {}, "");

    const divFirstPart = createElement("div", { className: "first-part" }, "");
    section.appendChild(divFirstPart);

    const divImgPlant = createElement(
        "div",
        {
            className: "img-plantOne",
            style: `background: center/cover url(${imgplant})`,
        },
        ""
    );
    divFirstPart.appendChild(divImgPlant);

    const divSecondPart = createElement("div", { className: "second-part" }, "");
    section.appendChild(divSecondPart);

    const divImgStar = createElement("div", { className: "div-img-star" }, "");
	for (let i = 0; i < stars; i++) {
		const imgStar = createElement(
			"img",
			{ src: "./asset/star.svg", alt: "star" },
			""
		);
		if (stars == 1) {
			divImgStar.classList.add("one");
			divImgStar.appendChild(imgStar);
		}
		if (stars == 2) {
			divImgStar.classList.add("two");
			divImgStar.appendChild(imgStar);
		}
		if (stars == 3) {
			divImgStar.classList.add("three");
			divImgStar.appendChild(imgStar);
		}
	}
    divSecondPart.appendChild(divImgStar);

    const h2 = createElement("h2", {}, title);
    divSecondPart.appendChild(h2);

    const divInfo = createElement("div", { className: "div-info" }, "");
    divSecondPart.appendChild(divInfo);

    const divFloraison = createElement("div", { className: "div-floraison" }, "");
    divInfo.appendChild(divFloraison);

    const imgBee = createElement("img", { src: "./asset/bee.svg", alt: "bee" });
    divFloraison.appendChild(imgBee);

    const paraFloraison = createElement(
        "p",
        { className: "para-floraison" },
        "Floraison"
    );
    divFloraison.appendChild(paraFloraison);

    const divDate = createElement("div", { className: "date-div" }, "");
    divInfo.appendChild(divDate);

    const paraDate = createElement("p", { className: "date-para" }, `${start} - ${end}`);
    divDate.appendChild(paraDate);

    const paraDivGrid = createElement("p", { className: "para-div-grid" }, desc);
    divSecondPart.appendChild(paraDivGrid);

    const divClassi = createElement("div", { className: "div-classi" }, "");
    divSecondPart.appendChild(divClassi);

    const divPropolis = createElement("div", { className: "f-c" }, "");
    divClassi.appendChild(divPropolis);

    const divNectar = createElement("div", { className: "f-c" }, "");
    divClassi.appendChild(divNectar);

    const divPollen = createElement("div", { className: "f-c-p" }, "");
    divClassi.appendChild(divPollen);

    const paraPropolis = createElement(
        "p",
        { className: "para-classi" },
        "Propolis"
    );
    divPropolis.appendChild(paraPropolis);

    const paraNectar = createElement("p", { className: "para-classi" }, "Nectar");
    divNectar.appendChild(paraNectar);

    const paraPollen = createElement("p", { className: "para-classi" }, "Pollen");
    divPollen.appendChild(paraPollen);

    if (propolis >= 1) {
        const imgTrue = createElement("img", { src: "./asset/true.svg" }, "");
        divPropolis.appendChild(imgTrue);
    } else {
        const imgCross = createElement("img", { src: "./asset/cross.svg" }, "");
        divPropolis.appendChild(imgCross);
    }

    if (nectar >= 1 && nectar <= 3) {
        const span = createElement("span", {}, nectar);
        divNectar.appendChild(span);
        const imgPollen = createElement(
            "img",
            { src: `./asset/pollen${nectar == 1 ? 'Three' : nectar == 2 ? '' : 'Two'}.svg` },
            ""
        );
        divNectar.appendChild(imgPollen);
        divNectar.classList.remove("f-c");
        divNectar.classList.add("f-c-p");
    } else {
        const imgCross = createElement("img", { src: "./asset/cross.svg" }, "");
        divNectar.appendChild(imgCross);
    }

    if (pollen >= 1 && pollen <= 3) {
        const span = createElement("span", {}, pollen);
        divPollen.appendChild(span);
        const imgPollen = createElement(
            "img",
            { src: `./asset/pollen${pollen == 1 ? 'Three' : pollen == 2 ? '' : 'Two'}.svg` },
            ""
        );
        divPollen.appendChild(imgPollen);
        divPollen.classList.remove("f-c");
        divPollen.classList.add("f-c-p");
    } else {
        const imgCross = createElement("img", { src: "./asset/cross.svg" }, "");
        divPollen.appendChild(imgCross);
    }

    return section;
}

async function getInfo(e) {
    e.preventDefault();
    const dateInput = inputSearch.value;

    const res = await fetch(`http://10.69.0.17:3002/v1/flowers?date=${dateInput}`);
    const data = await res.json();

	let monthInLetters;

    container.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        const myCard = createContainer(
            element.image,
            element.name.toUpperCase(),
			monthInLetters = moisEnLettres(parseInt(element.startBloom)),
			monthInLetters = moisEnLettres(parseInt(element.endBloom)),
            element.description,
            element.melliferous,
            element.propolis,
            element.pollen,
            element.nectar
        );
        container.appendChild(myCard);
    }
}

btnSearch.addEventListener("click", getInfo);