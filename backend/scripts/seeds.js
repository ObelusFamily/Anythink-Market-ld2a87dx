//TODO: seeds script should come here, so we'll be able to put some data in our local env

// Server Connection
const mongoose = require("mongoose");

const mongo = mongoose.connect(process.env.MONGODB_URI)
if (mongo) { console.info("server connected") }

// Require Modules
const User = require("../models/User");
const Item = require("../models/Item");
const Comments = require("../models/Comment");
const user = require("../models/User");

async function seed(){
    for (let i = 0; i < 100; i++) {
        const user = new User
        user.username = `user${200}${i}`
        user.email = user.username + "@wilco.com"
        user.setPassword = user.username + "password" + i
       await user.save()

        const item = new Item()
        item.title = "item-title" + i
        item.slug = "slug-" + i
        item.description = item.title + "description"
        item.seller = user
        await item.save()

        const comment = new Comments()
        comment.seller = user
        comment.body = i + "comment about"  + item.title 
        await comment.save()



        
    }

}
seed()