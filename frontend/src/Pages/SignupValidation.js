function validation(values) {
    console.log("From validation" + values.username)
    let errors = {}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{6,}$/
    
    if(values.username === "") {
        errors.username = "Username should not be empty"
        
        console.log("entered in values.username")
    } else {
        errors.username = ""
    }

    if(values.email === "") {
        errors.email = "Email should not be empty"
       } 
       else if(!email_pattern.test(values.email)) {
        errors.email = "Email didn't match"
       } 
       else {
        errors.email = ""
       }
       
    if(values.password === "") {
    errors.password = "Password should not be empty"
    }
    else if (!password_pattern.test(values.password)) {
    errors.password =  "Password didn't match"
    }   
    else {
    errors.password = ""
    }
    return errors

}

export default validation;