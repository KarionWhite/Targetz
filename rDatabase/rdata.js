class datenbank{
    constructor(expireTime = 60000, callbacktime = 60000){
        this.datenbank = {};
        this.datenbank["target"]= [];
        this.expireTime = expireTime;
        this.callbacktime = callbacktime;
        this.checkExpiredSessions();
    }

    createHash(hashlength){
        let hash = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (let i = 0; i < hashlength; i++){
            hash += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return hash;
    }

    newSession(sessionkey){
        this.datenbank[sessionkey] = {};
        this.datenbank[sessionkey]["target"] = {};
        for (targetObject in this.datenbank["target"]){
            for(pathkey in targetObject){
                this.datenbank[sessionkey]["target"][this.createHash(10)] = targetObject[pathkey];
            }
            
        }
        this.datenbank[sessionkey]["lastaccess"] = new Date();
    }

    getSession(sessionkey){
        this.datenbank[sessionkey]["lastaccess"] = new Date();
        return this.datenbank[sessionkey];
    }

    setTargetz(targetObject){
        this.datenbank["target"].push(targetObject);
    }

    checkExpiredSessions(){
        setInterval(()=>{
            let now = new Date();
            for (sessionkey in this.datenbank){
                if(sessionkey != "target"){
                    if(now - this.datenbank[sessionkey]["lastaccess"] > this.expireTime){
                        delete this.datenbank[sessionkey];
                    }
                }
            }
        }, this.callbacktime);
    }
}

export default datenbank;