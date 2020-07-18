const loadForm = document.querySelector('#form-1')
const search = document.querySelector('input')
const message = document.querySelector('#message')

loadForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const envName = search.value
    if(envName === ''){
        message.textContent = "Error! Please enter Environment name."
        document.getElementById("table").style.visibility = "hidden";
    }
    else{
        fetch('/getEnvironment/' + envName).then((response) => {
            response.json().then((data) => {
                if(data.error) {
                    document.getElementById("table").style.visibility = "hidden";
                    message.textContent = data.error
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