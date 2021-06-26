
const inputNameField = document.querySelector("#nameField")
const submitButton = document.querySelector("#button")
const myApp = document.querySelector("#myApp")

// Detalhe: Funções anômimas("()=>") não podem executar o método THIS, mas functions podem

inputNameField.clean = function () {
    this.value = ""
}

submitButton.onclick = () => {
    const gitHubAccountName = inputNameField.value
    writeApiDataAtDocument(gitHubAccountName)
}

// Função usada para receber os dados da api
async function fetchGitApi(gitHubUserName) {
    const url = `https://api.github.com/users/${gitHubUserName}`
    return await (await fetch(url)).json()
}

// Função usada para construir os dados no front-end
async function writeApiDataAtDocument(gitHubUserName) {
    await fetchGitApi(gitHubUserName).then(apiData => {
        inputNameField.clean()
        if (apiData.login == null) {
            console.warn(apiData)
            alert("Usuário não encontrado")
            return
        }

        // Reúne das informações da api transformando textos com "http" em links
        let accountDetails = ""
        Object.entries(apiData).forEach(element => {
            let key = element[0]
            let value = String(element[1]).includes("http") ?
                `<a href=${element[1]}>${element[1]}</a>` :
                `${element[1]}`;
            accountDetails += `<li><strong>${key}: </strong>${value}</li>`
        })

        // Constrói o html com as informações da api
        myApp.innerHTML += (
            `<fieldset>
                <img width=100 src="${apiData.avatar_url}" alt=""><br>
                <details>
                    <summary><strong>${apiData.name}</strong></summary>
                    <ul>
                         ${accountDetails}
                    </ul>
                </details>
            </fieldset>`)
    })
}