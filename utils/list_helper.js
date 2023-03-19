const _ = require('lodash')


const dummy = (array) => {
    return 1
}

const totalLikes = (listOfBlogs) => {

    const filteredListOfBlogs = listOfBlogs.filter(item => item.likes)

    if(!filteredListOfBlogs){
        return 0
    }

    const reducedList = filteredListOfBlogs.reduce((sum, item)=> {
        return item.likes + sum
    },0)

    return reducedList
}

const favoriteBlog = (listOfBlogs) => {

    const filteredListOfBlogs = listOfBlogs.filter(item => item.likes > 0)

    if(!filteredListOfBlogs.length){
        return 0
    }

    const newArray = [];

    for(let i =0; filteredListOfBlogs.length > i; i++){
        let currentItem = filteredListOfBlogs[i]  
        if(newArray.length === 0){
            newArray.push(currentItem)
        }else if (newArray[0].likes < currentItem.likes){
            newArray.shift()
            newArray.push(currentItem)
        }
    }

    const reformatedArray = [...newArray, delete newArray[0]._id, delete newArray[0].__v, delete newArray[0].url] 
    return reformatedArray[0];
}

const mostBlogs = (listOfBlogs) => {
    if(!listOfBlogs){
        return 0
    }

    const count = _.countBy(listOfBlogs, (e) => e.author)

    const author = Object.keys(count) 
    const blogs = Object.values(count) 


    if(author[0] === 'undefined'){
        const undefinedAuthor = {
            author: 'Nehum autor na lista',
            blogs: 0
        }
        return undefinedAuthor
    }

    const authorWithMostBlogs =  {
        author: author[0],
        blogs: blogs[0] 
    }

    return authorWithMostBlogs;

}

const mostLikes = (arrayOfBlogs) => {
    if(!arrayOfBlogs){
        return undefined
    }

    const group = _.groupBy(arrayOfBlogs, (element) => element.author)

    let newArray = []
    _.map(group, element =>{
        const newObject = {author:element[0].author, likes:totalLikes(element)}
        
        if(!newArray.length){
            newArray.push(newObject)
        }else if(newObject.likes > newArray[0].likes){
            newArray = [];
            newArray.push(newObject)
        }
    })

    if(newArray[0].author === undefined){
        return undefined
    }
    
    return newArray[0]

}


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}