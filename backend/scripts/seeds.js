//TODO: seeds script should come here, so we'll be able to put some data in our local env
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI);
if (isProduction) {
} else {
  mongoose.set("debug", true);
}

require("./models/User");
require("./models/Item");
require("./models/Comment");

const User = mongoose.model('User');
const Item = mongoose.model('Item');
const Comment = mongoose.model('Comment');
(async ()=>{
    let index = 1
    while (index < 100) {
        //seed user
        const user = new User()
        user.username = "user" + 20 + index
        user.email = user.username + "@wilco.com"
        user.setPassword = user.email + index
        await user.save()

        //seed items
        const item = new Item()
        item.title = "item" + index
        item.description = "description" + " " + item.title + " " + index 
        item.seller = user
        await item.save()
        //seed comments
        const comment = new Comment()
        comment.seller = user
        comment.item = item
        comment.body = "comment about " + item.title +  " :)"
        await comment.save()
}})()