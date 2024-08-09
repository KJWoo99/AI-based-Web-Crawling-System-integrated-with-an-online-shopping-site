const categories = [
    {
        "_id": 1,
        "name": "AirPods"
    },
    {
        "_id": 2,
        "name": "iPhone"
    },
    {
        "_id": 3,
        "name": "iPad"
    },
    {
        "_id": 4,
        "name": "Mac"
    },
    {
        "_id": 5,
        "name": "Watch"
    },
    {
        "_id": 6,
        "name": "TV & Home"
    },
    {
        "_id": 7,
        "name": "Accessories"
    }
]

const prices = [
    {
        "_id": 0,
        "name": "All",
        "array": []
    },
    {   
        "_id": 1,
        "name": "0 ~ 500SG$",
        "array": [0, 500]
    },
    {
        "_id": 2,
        "name": "501 ~ 1000SG$",
        "array": [501, 1000]
    },
    {
        "_id": 3,
        "name": "1001 ~ 1500SG$",
        "array": [1001, 1500]
    },
    {
        "_id": 4,
        "name": "1501 ~ 2000SG$",
        "array": [1501, 2000]
    },
    {
        "_id": 5,
        "name": "2001SG$ +",
        "array": [2001, 2000000]
    }
]

export {
    categories,
    prices
}
