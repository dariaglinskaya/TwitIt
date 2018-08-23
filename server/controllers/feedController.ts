import DB from '../db/db';

export default function getFeed(user) {
    const db = new DB('tweets');
    console.log(user)
    if (user.subscriptions.length) {
        let promises = user.subscriptions.map((item) => {
            return db.findByAuthor(item);
        });
        return Promise.all(promises);
    }
};