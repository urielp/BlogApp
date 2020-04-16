const bcrypt = require('bcrypt');
let passWords = [];

const reg = (pass)=>{
 
 return new Promise( (resolve,reject) =>{ 
    bcrypt.genSalt(10,(err,salt)=>{
    bcrypt.hash(pass,salt,(err,hashed)=>{
        if(err) reject(err);
        else{
            passWords.push(hashed);
            resolve(true);
        }
    })
})
});
};

const logIn = (pass) =>{
    console.log(pass);
    bcrypt.compare(pass,passWords[0]).then( (isMatched)=>{

        if(isMatched){
            console.log("Correct")
        }
        else
            console.log("Incorrect");
    })
        
    
    
}


reg("1234").then(results=>{
    console.log(passWords,results);
    logIn("1232");
});
