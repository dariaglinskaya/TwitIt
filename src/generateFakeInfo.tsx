import * as faker from 'faker';
import * as _ from 'lodash';

module.exports = function () {
    return {
        tweets: _.times(30, function (index: number) {
            return {
                id: index,
                user: {
                    name: faker.name.findName(),
                    username: faker.internet.userName(),
                    avatar: faker.image.avatar(),
                    cover: faker.image.image(),
                    bio: faker.lorem.sentence(),
                    location: faker.address.city(),
                    following: faker.random.number(1000),
                    followers: faker.random.number(10000)
                },
                time: faker.date.recent(10),
                tweetContent: faker.lorem.sentences(2),
                likes: faker.random.number(500),
                retweets: faker.random.number(500),
                replies: faker.random.number(500)
            };
        }),
        userTweets: _.times(20, function (index: number) {
            return {
                id: index,
                tweetContent: faker.lorem.sentences(2),
                likes: faker.random.number(500),
                retweets: faker.random.number(500),
                replies: faker.random.number(500)
            };
        }),
        login: {
            username: "admin",
            password: "admin",
            name: "Admin",
            bio: "Admin of the page",
            location: "Minsk",
            following: 10,
            followers: 50,
            cover:
                "http://awesomwallpaper.com/img2/D4996B4DDE3D3141/batman-minimalistic-dark-dc-comics-bat-grey-logos-simple-batman-logo.jpg",
            avatar:
                "https://i.pinimg.com/originals/21/75/65/21756520fd48715a506661964c6ddf7a.jpg"
        },
        tweetReplies: _.times(10, function (index: number) {
            return {
                id: index,
                user: {
                    name: faker.name.findName(),
                    username: faker.internet.userName(),
                    avatar: faker.image.avatar(),
                    cover: faker.image.image(),
                    bio: faker.lorem.sentence(),
                    location: faker.address.city(),
                    following: faker.random.number(1000),
                    followers: faker.random.number(10000)
                },
                time: faker.date.recent(10),
                tweetContent: faker.lorem.sentences(2),
                likes: faker.random.number(10),
                retweets: faker.random.number(8),
                replies: faker.random.number(5)
            };
        })
    }
};