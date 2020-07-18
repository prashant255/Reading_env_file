const createForm = document.querySelector('#form-3')
const search = document.querySelector('input')
const message = document.querySelector('#message')

createForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const envName = search.value
    if(envName === '')
        message.textContent = "Error! Please enter Environment name."
    else{
        fetch('/createNewEnvironment/' + envName).then((response) => {
            response.text().then((data) => {
                message.textContent = data
            })
        })
    }
})