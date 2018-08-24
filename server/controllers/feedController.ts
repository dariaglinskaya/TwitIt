import DB from '../db/db';
const feedController = {
    getFeed,
    getUsers,
    addTweet,
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
export default feedController;