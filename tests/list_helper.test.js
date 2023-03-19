const dummy = require('../utils/list_helper').dummy

const totalLikes = require('../utils/list_helper').totalLikes

const favoriteBlog = require('../utils/list_helper').favoriteBlog

const mostBlogs = require('../utils/list_helper').mostBlogs

const mostLikes = require('../utils/list_helper').mostLikes

describe('Dummy test', () => {
    
    test('Dummy return one-1', () => {
        const blogs = []

        const result = dummy(blogs)

        expect(result).toBe(1)
    })
})

const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
  ]

const listWithOutBlog = [{}]

const listWithManyBlog = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 10,
        __v: 0
      },
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 0,
        __v: 0
      },
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 2,
        __v: 0
      },
]

const listWithVariousEmptyBlog = [
    {
        likes: 1
    },
    {},
    {},
    {},
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 2,
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 0,
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 10,
        __v: 0
    },
    {},
    {},
    {},
    {
        likes: 0
    },
    {abc:450}
]

const ListOfBlogsForFavoriteBlogs = [
    {
    _id: '5a422aa71b54a676234d17f8',
    title: 'ESSE AQUI???',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 2,
    __v: 0
    },
    {
    _id: '5a422aa71b54a676234d17f8',
    title: 'ABCD',
    author: 'TESTE INDICE 2',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 2,
    __v: 0
    },
    {
    _id: '5a422aa71b54a676234d17f8',
    title: '12341234123',
    author: 'tESTE 3',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 2,
    __v: 0
    },
    {
    _id: '5a422aa71b54a676234d17f8',
    title: 'G123123123',
    author: 'EASDADASDASDASD',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 2,
    __v: 0
    },
    {
    _id: '5a422aa71b54a676234d17f8',
    title: 'AGORA É ESSE',
    author: 'TESTE 5',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 300,
    __v: 0
    },
    {
    _id: '5a422aa71b54a676234d17f8',
    title: 'TITULO BACANA MASSA DEMAIS',
    author: 'TESTE 6',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 25,
    __v: 0
    },
]

const firstItemSholdBeCorrect = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'EXATAMENTE ESSSE MESMO',
        author: 'EU',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 3,
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'ESSE AQUI???',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 2,
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'ESSE AQUI???',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 2,
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'ESSE AQUI???',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 2,
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'ESSE AQUI???',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 2,
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'ESSE AQUI???',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 2,
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'ESSE AQUI???',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 2,
        __v: 0
    },
]

const arrayWithManyAuthor = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'EU MESMO IDAI?',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'EU MESMO IDAI?',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'EU MESMO IDAI?',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'ESSE NÃO',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    },
]

describe('Total Likes', () => {

    test('With one list' , () => {
        const result = totalLikes(listWithOneBlog)

        expect(result).toBe(5)
    }) 

    test('Without any blog' , () => {
        const result = totalLikes(listWithOutBlog)

        expect(result).toBe(0)
    }) 

    test('With many lists of blogs' , () => {
        const result = totalLikes(listWithManyBlog)

        expect(result).toBe(12)
    }) 

    test('With various empty lists of blogs' , () => {
        const result = totalLikes(listWithVariousEmptyBlog)

        expect(result).toBe(13)
    }) 

})

describe('Favorite blog', () => {

    test('With one blog', () => {
        const result =  favoriteBlog(listWithOneBlog) 
        
        const equal = {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            likes: 5
        }
        
        expect(result).toEqual(equal)
    })

    test('First item is correct', () => {
        const result =  favoriteBlog(firstItemSholdBeCorrect) 
        
        const equal = {
            title: 'EXATAMENTE ESSSE MESMO',
            author: 'EU',
            likes: 3,
        }
        
        expect(result).toEqual(equal)
    })

    test('With MANY blogS', () => {
        const result =  favoriteBlog(ListOfBlogsForFavoriteBlogs) 
        
        const equal = {
            title: 'AGORA É ESSE',
            author: 'TESTE 5',
            likes: 300,
        }
        
        expect(result).toEqual(equal)
    })

    test('Expect to be 0', () => {
        const result = favoriteBlog(listWithOutBlog)

        const equal = 0

        expect(result).toBe(0)
    })

})

describe('Most blogs author', () => {

    test('With one blog', () => {
        const result = mostBlogs(listWithOneBlog)

        const equal = {author: 'Edsger W. Dijkstra', blogs:1}

        expect(result).toEqual(equal)

    })

    test('With some Authors', () => {
        const result = mostBlogs(arrayWithManyAuthor)

        const equal = {author: 'EU MESMO IDAI?', blogs:3}

        expect(result).toEqual(equal)

    })
    test('Without nothing', () => {
        const result = mostBlogs(listWithOutBlog)

        const equal = {author: 'Nehum autor na lista', blogs:0}

        expect(result).toEqual(equal)

    })
})

describe('Most likes', () => {

    test('Test most likes ', () => {
        const result = mostLikes(arrayWithManyAuthor)

        expect(result).toEqual({author: 'EU MESMO IDAI?', likes: 15})
    })

    test('Test most like with 0 blogs', () => {
        const result = mostLikes(listWithOutBlog)

        expect(result).toBe(undefined)
    })
    test('Test with various', () => {
        const result = mostLikes(ListOfBlogsForFavoriteBlogs)

        expect(result).toEqual({author: 'TESTE 5', likes: 300})
    })
})