const fs = require('fs')

getPath = (processName) => {
    return "config/" + processName + ".env"
}
splitKeyValue = (str) => {
    var parts = str.split('=');
    var tail = parts.slice(1).join('=');
    var result = parts.slice(0,1);
    result.push(tail);
    return result;
}  

convertToJSON = (readMe) => {
    const data = []
    lines = readMe.split('\n');
    lines.forEach(element => {
        keyValue = splitKeyValue(element)
        if(keyValue[0]!=''){
            data.push({
                key: keyValue[0],
                value: keyValue[1]
            })
        }
    });
    return data
}

loadEnvironment = (processName) => {
    try{
        const readMe = fs.readFileSync(getPath(processName), "utf-8")
        data = convertToJSON(readMe)
    } catch(e) {
        data = {
            error: "Environment doesnot exist!"
        }
    }
    return data
}

addEnvironmentVariable = (processName, key, value) => {
    try {
        newEnvironment = key + "=" + value + "\n"
        fs.appendFileSync(getPath(processName), newEnvironment)
        data = loadEnvironment(processName)
    } catch (e) {
        data = {
            error: "Error appending environment!"
        }
    }
    return data
}

createNewEnironment = (processName) => {
    try{
        if(fs.existsSync(getPath(processName))){
            return "Environment already Exists! Please try different Name for the environment!"
        }
        fs.writeFileSync(getPath(processName), "")
        return "New Environment created succesfully!"
    } catch(e) {
        return "Error accessing file"
    }
}

module.exports = {

    loadEnvironment,
    addEnvironmentVariable,
    createNewEnironment

}