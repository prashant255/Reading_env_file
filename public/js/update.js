const updateForm = document.querySelector('#form-2')
const message = document.querySelector('#message')

updateForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const envName = document.querySelector('#ip1').value
    const key = document.querySelector('#ip2').value
    const value = document.querySelector('#ip3').value
    if(envName === ''){
        message.textContent = "Error! Please enter Environment name."
        document.getElementById("table").style.visibility = "hidden";
    }else if(key  === ''){
        message.textContent = "Error! Please enter Key for environment variable."
        document.getElementById("table").style.visibility = "hidden";
    }else if(value === ''){
        message.textContent = "Error! Please enter value to add to environment variable"
        document.getElementById("table").style.visibility = "hidden";
    }else{
        fetch('/setEnvironment/' + envName + "/" + key + "/" + value).then((response) => {
            response.json().then((data) => {
                if(data.error) {
                    document.getElementById("table").style.visibility = "hidden";
                    message.textContent = data.error
                    table.textContent = ""
                } else {
                    message.textContent = "Environment Variables:" 
                    createTable(data)
                }
            })
        })
    }
})

function createTable(list) {
    var cols = []; 
      
    for (var i = 0; i < list.length; i++) { 
        for (var k in list[i]) { 
            if (cols.indexOf(k) === -1) {  
                cols.push(k); 
            } 
        } 
    } 
    var table = document.getElementById("table"); 
    table.textContent=""
    table.style.visibility = "visible";
    var tr = table.insertRow(-1); 
      
    for (var i = 0; i < cols.length; i++) {  
        var theader = document.createElement("th"); 
        theader.innerHTML = cols[i]; 
        tr.appendChild(theader); 
    } 
    for (var i = 0; i < list.length; i++) { 
        trow = table.insertRow(-1); 
        for (var j = 0; j < cols.length; j++) { 
            var cell = trow.insertCell(-1); 
            cell.innerHTML = list[i][cols[j]]; 
        } 
    }  
} 
