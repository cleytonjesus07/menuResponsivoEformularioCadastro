const pathImgsCities = './assets/images/';

const cities = [
    {
        nameCity: "New York",
        description: "A cidade de Nova York compreende 5 distritos situados no encontro do rio Hudson com o Oceano Atlântico. No centro da cidade fica Manhattan, um distrito com alta densidade demográfica que está entre os principais centros comerciais, financeiros e culturais do mundo. Entre seus pontos emblemáticos, destacam-se arranha-céus, como o Empire State Building, e o enorme Central Park.",
        img: `${pathImgsCities}newYork-min.jpg`,
       
    },
    {
        nameCity: "Madrid",
        description: "Madri, a capital da Espanha, situada no centro do país, é uma cidade de avenidas elegantes e parques grandes e bem cuidados, como o Buen Retiro. Ela é famosa pelos ricos acervos de arte europeia, entre os quais estão as obras de Goya, Velázquez e outros mestres espanhóis no Museu do Prado. O centro da antiga Madri da época da Casa de Habsburgo é a Plaza Mayor, ladeada por pórticos, e nas proximidades ficam o barroco Palácio Real e o Arsenal Real, que exibe armas históricas.",
        img: `${pathImgsCities}madrid-min.jpg`
    },
    {
        nameCity: "Coimbra",
        description: "Coimbra, uma cidade à beira-rio no centro de Portugal e antiga capital do país, alberga uma cidade velha medieval preservada e a histórica Universidade de Coimbra. Construída no local de um antigo palácio, a Universidade é célebre pela sua biblioteca barroca, a Biblioteca Joanina, e pela sua torre do sino do século XVIII. Na cidade velha encontra-se a catedral românica do século XII, a Sé Velha. ",
        img: `${pathImgsCities}coimbra-min.jpg`
    },
    {
        nameCity: "Tóquio",
        description: "Tóquio, a movimentada capital do Japão, combina o estilo ultramoderno com o tradicional, desde arranha-céus iluminados por neon a templos históricos. O opulento santuário xintoísta Meiji é conhecido por seu altíssimo portão e pelas florestas circundantes. O Palácio Imperial fica localizado em meio a jardins públicos. Os muitos museus da cidade oferecem exposições que variam de arte clássica (no Museu Nacional de Tóquio) a um teatro kabuki reconstruído (no Museu Edo-Tokyo). ",
        img: `${pathImgsCities}tokyo-min.jpg`
    },
    {
        nameCity: "São Paulo",
        description: "São Paulo, centro financeiro do Brasil, está entre as cidades mais populosas do mundo, com diversas instituições culturais e uma rica tradição arquitetônica. Há prédios simbólicos como a catedral neogótica, o Edifício Martinelli, um arranha-céu inaugurado em 1929, e o Edifício Copan, com suas linhas curvas projetadas pelo arquiteto modernista Oscar Niemeyer. A igreja em estilo colonial do Pátio do Colégio marca o local onde os padres jesuítas fundaram a cidade em 1554. ",
        img: `${pathImgsCities}saoPaulo-min.jpg`
    },
    {
        nameCity: "Hong Kong",
        description: "Hong Kong, ex-colônia britânica, é um território autônomo no sudeste da China. Seu centro urbano vibrante e densamente povoado é também um porto importante e um centro financeiro global de destaque, com um horizonte marcado por arranha-céus. O distrito comercial exibe monumentos arquitetônicos como a Torre do Bank of China, de I. M. Pei. Hong Kong é também um destino importante para compras, famoso pela alfaiataria sob medida e pelo Mercado Noturno da Rua do Templo.",
        img: `${pathImgsCities}hongKong-min.jpg`
    }
]
let citiesCounter = 0

window.onload = () => {
    loadingScreen(); //Tela de loading
    myEvents();
   
    bgChange(10000);
}

function maskTel(field) {
    const numbers = field.value;
    const isCel = numbers.length === 10;
    const hasHyphen = numbers.indexOf("-");
    let formatedNumber;

    if (hasHyphen === -1 && numbers != "") {
        if (isCel) {
            const part1 = numbers.slice(0, 5);
            const part2 = numbers.slice(5, 9)
            formatedNumber = `${part1} - ${part2}`
        } else {

            const part1 = numbers.slice(0, 4);
            const part2 = numbers.slice(4, 8)

            formatedNumber = `${part1} - ${part2}`
        }

        field.value = formatedNumber;
    }

}
let disabledInputsref = [];
function maskCpfCep(field) {
    const numbers = field.value;
    const isCep = numbers.length === 8;
    const hasHyphen = numbers.indexOf("-") || numbers.indexOf(".");
    

    if (numbers != "" && hasHyphen === -1) {
        if (isCep) {
            cepMask(numbers, field);
        } else {
            cpfMask(numbers, field)
        }


    }
}

function cpfMask(numbers, field) {
    const part1 = numbers.slice(0, 3);
    const part2 = numbers.slice(3, 6);
    const part3 = numbers.slice(6, 9);
    const part4 = numbers.slice(9, 11);
    formatedNumber = `${part1}.${part2}.${part3} - ${part4}`
    field.value = formatedNumber;
}

async function cepMask(numbers, field) {
    const form = document.forms[0];
    const inputsDisabled = form.querySelectorAll(".container-inputs fieldset:nth-child(2) input:disabled");

    const part1 = numbers.slice(0, 5);
    const part2 = numbers.slice(5, 8)
    formatedNumber = `${part1} - ${part2}`
    const data = await cepSearch(numbers);

    if (!data.erro) {

        inputsDisabled[0].value = data.logradouro;
        inputsDisabled[1].value = data.bairro;
        inputsDisabled[2].value = data.uf;
        inputsDisabled[3].value = data.localidade;

        inputsDisabled.forEach((input) => {
            disabledInputsref.push(input)
            input.disabled = false;
        })
    } else {
        formatedNumber = "CEP Não encontrado";
        
        disabledInputsref.forEach((input) => {
            input.value = "";
            input.disabled = true;
        })
    }
    field.value = formatedNumber;
}

async function cepSearch(cep) {

    try {
        const search = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const json = await search.json();

        return json;
    } catch (err) {
        console.log(err);
    }

}

function myEvents() {
    const containerModal = document.querySelector(".container-modal");
    const modal = document.querySelector(".modal");
    const btnBuy = document.querySelector(".menu > ul li:nth-child(4) a")
    const closeModal = document.querySelector(".close-modal");
    const form = modal.querySelector("form")
    const formResult = modal.querySelector(".form-result")
    btnBuy.addEventListener("click", () => {
        containerModal.setAttribute("style", "display:flex");
        setTimeout(() => {
            containerModal.style.opacity = 1;
            modal.setAttribute("style", "bottom:0")
        }, 500)
    })

    closeModal.addEventListener("click", () => {
        containerModal.setAttribute("style", "display:none");
    })

    document.querySelector(".btn-hamburguer").addEventListener("click", () => {
        const menu = document.querySelector(".menu-list").cloneNode(true);
        if (document.querySelector(".menu-mobile").children.length === 1) {
            document.querySelector(".menu-mobile").insertAdjacentElement("afterbegin", menu);
        }
        document.querySelector(".menu-mobile").style.right = 0;
        document.querySelector(".menu-mobile > ul li:nth-child(4) a").addEventListener("click", () => {
            containerModal.setAttribute("style", "display:flex");
            setTimeout(() => {
                containerModal.style.opacity = 1;
                modal.setAttribute("style", "bottom:0")
            }, 500)
        })
    })

    document.querySelector(".menu-mobile button").addEventListener("click", () => {
        document.querySelector(".menu-mobile").style.right = "-50vw";
    })

    const inputsDisabled = form.querySelectorAll(".container-inputs fieldset:nth-child(2) input:disabled");
    const disabledInputsref = inputsDisabled;

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        
        if(!Array.from(form.querySelectorAll("input")).find((input)=>input.disabled)){
        form.querySelectorAll("input").forEach((input, index) => {
            formResult.querySelectorAll("p")[index].innerHTML = input.value;
        })

        form.style.opacity = 0;
        formResult.style.display = "flex";
        document.querySelector(".close-modal").addEventListener("click", () => {
            disabledInputsref.forEach((input) => {
            
                input.disabled = true;
            })
            formResult.style.opacity = 0;


            formResult.style.display = "none";
            form.style.opacity = 1;

            form.querySelectorAll("input").forEach((input) => {
                input.value = "";
            })

        })
        setTimeout(() => {
            formResult.style.opacity = 1;
        }, 1000)
    }else{
        document.querySelector("input[name=cep]").value = "Insira um cpf válido"
    }})
}

function loadingScreen() {
    const loadingScreen = document.querySelector(".loadingScreen");
    if (document.readyState == "complete") {
        initializingInfo();
        loadingScreen.setAttribute("style", "opacity:0")
        setTimeout(() => {
            loadingScreen.setAttribute("style", "display:none")
        }, 2000)
    }
}

function initializingInfo() {
    const nameCity = document.querySelector("#nameCity");
    const infoCity = document.querySelector("#infoCity");
    nameCity.innerHTML = cities[citiesCounter].nameCity;
    infoCity.innerHTML = cities[citiesCounter].description;
}

function bgChange(timer) {
    const mainContainer = document.querySelector(".mainContainer");
    setTimeout(() => {
        citiesCounter++;
        if (citiesCounter > (cities.length - 1)) {
            citiesCounter = 0
        }
        new Image().src = cities[citiesCounter].img;
      
      setTimeout(() => {
        nameCity.innerHTML = cities[citiesCounter].nameCity;
        infoCity.innerHTML = cities[citiesCounter].description;
        mainContainer.setAttribute("style", `background-image:url("${cities[citiesCounter].img}");`)
        bgChange(timer)
      }, 5000);
     
    }, timer);


}




