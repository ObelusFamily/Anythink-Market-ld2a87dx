//TODO: seeds script should come here, so we'll be able to put some data in our local env

// Server Connection
const mongoose = require("mongoose");

const mongo = mongoose.connect(process.env.MONGODB_URI)
if (mongo) { console.info("server connected") }
mongoose.set("debug", true);

// Require Modules
const User = require("../models/User");
const Item = require("../models/Item");
const Comment = require("../models/Comment");

const { faker } = require('@faker-js/faker');

// CREATE USERS
async function createUsers(){
    for (let index = 0; index < 100; index++) {
        if(!User || typeof(User) !== "function"){ return }

        const username  = faker.internet.userName().replaceAll(".", "").replaceAll("_", "");
        const email = faker.internet.email()
        const password = faker.internet.password()
        const bio = faker.lorem.paragraph()

        const user = new User()
        user.username = username
        user.email = email
        user.password = password
        user.bio = bio

        console.log("USER: \n", user)
        await user.save()
    }
}


//CREATE ITEMS

async function createItems(){
    for (let index = 0; index < 100; index++) {
        if(!Item || typeof(Item) !== "function"){ return }
        const title = faker.lorem.words(Math.ceil(Math.random() * 5))
        const slug = faker.helpers.slugify(title) + "-" + faker.random.numeric(4)
        const description = faker.lorem.paragraph()
        const seller = faker.helpers.arrayElement(await User.find({}))
        
        const item = new Item()
        if (!item) { 
            console.error("item is falsy")
        }
        item.title = title
        item.slug = slug
        item.description = description
        item.seller = seller

        console.log("Item: \n", item)
        await item.save


    }
}



async function createComments(){
    for (let index = 0; index < 100; index++) {
        const comment = new Comment
        const seller = faker.helpers.arrayElement(await User.find({}))
        const item = faker.helpers.arrayElement(await Item.find({}))
        
        if (!seller) {
            console.error("No seller for comment")
        }
        if(!item){console.error("No Item for comment")}
        comment.seller = seller 
        comment.item = item

        console.log(comment)
        comment.save()
    }
}

console.group("run")

console.log("Creating Users \n")
createUsers()

console.log("creating items \n")
createItems()

console.log("creating comments \n")
createComments()
console.groupEnd("run")