import DB from '../db/db';
const feedController = {
    getFeed,
    getUsers,
    addTweet,
    likeTweet,
    unlikeTweet,
    retweetTweet,
    unretweetTweet,
    renderUserTweets,
    renderRetweets,
}
function getFeed(user) {
    const db = new DB('tweets');
    if (user.subscriptions.length) {
        let promises = user.subscriptions.map((item) => {
            return db.findByAuthor(item);
        });
        return Promise.all(promises);
    }
};
function renderRetweets(user) {
    const db = new DB('tweets');
    if (user.retweets.length) {
        let promises = user.retweets.map((item) => {
            return db.findById(item);
        });
        return Promise.all(promises);
    }
};
function renderUserTweets(user) {
    const db = new DB('tweets');
    return db.findByAuthor(user.name);
};

function getUsers(user) {
    const db = new DB('users');
    return db.findEntry(user)
        .then((res: Response) => {
            return res;
        })
        .catch(() => {
            return false;
        });
}
function addTweet(newTweet) {
    const db = new DB('tweets');
    return db.insertTweet(newTweet)
        .then((res: Response) => {
            console.log(res);
            return true;
        })
        .catch(() => {
            return false;
        })
}
function likeTweet(tweet) {
    const db = new DB('tweets');
    return db.likeTweet(tweet)
        .then((res: Response) => {
            return true;
        })
        .catch(() => {
            return false;
        })
}
function unlikeTweet(tweet) {
    const db = new DB('tweets');
    return db.unlikeTweet(tweet)
        .then((res: Response) => {
            console.log(res);
            return true;
        })
        .catch(() => {
            return false;
        })
}
function retweetTweet(user) {
    const db = new DB('tweets');
    const db2 = new DB('users');
    return db.retweetTweet(user)
        .then((res: Response) => {
            db2.addRetweet(user).then((resp) => {
                console.log(true)
                return true
            }).catch(() => {
                return false;
            })
        })

}
function unretweetTweet(tweetID) {
    const db = new DB('tweets');
    return db.unretweetTweet(tweetID)
        .then((res: Response) => {
            console.log(res);
            return true;
        })
        .catch(() => {
            return false;
        })
}
export default feedController;