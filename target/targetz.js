import {rdata} from 'rdata';
import path from 'path';
import fs from 'fs';
import { create } from 'domain';

/**
 * Targetz class
 * This class will resolve the linking of the webrequest to the target path
 * For this to work the ejs needs to be set in the app.js and linking inside the ejs
 * needs to be done by objects like:
 * <link rel="stylesheet" type="text/css" href="<%= css.mycss">
 * The targetz will resolve the path to the target path by creating a random hashkey.
 * On the clientside the link would be like:
 * <link rel="stylesheet" type="text/css" href="/asnamsdas3283ndsmd">
 * Targetz will than take the hashkey and resolve it to the target path and return the file 
 * 
 * You need to create a renderpath object.
 * For this example like:
 * let css = {mycss: "css/mystyle.css"};
 * targetz.setRenderPath(css);
 * 
 * If you have hardcoded paths, targetz will not touch them. It will only resolve the paths
 * that are created by the renderpath object.
 */
class targetz{

    /**
     * Targetz constructor
     * This constructor will create a new targetz object
     * 
     */
    constructor(){
        this.rdata = new rdata();
    }

    set(renderObject){
        this.rdata.setTargetz(renderObject);
    }

    renderer(req, res, next){
        const sessionKey = req.cookies.sessionKey;
        if(sessionKey != undefined){
            let newSession = this.rdata.createHash(10);
            res.cookie('sessionKey', newSession);
            this.rdata.newSession(newSession);
        }

        next();
    }

    
}