import DB from '../db/db';

const authController = {
    register,
    login,
    subscribe,
    unsubscribe,
}

function register(user) {
    const db = new DB('users');
    return db.findOne(user)
        .then((res: Response) => {
            return false;
        })
        .catch(() => {
            db.insertUser(user);
            return true;
        });
}
function login(user) {
    const db = new DB('users');
    console.log(user.username);
    return db.findByUsername(user)
        .then((res: Response) => {
            return res;
        })
        .catch(() => {
            return false;
        });
}
function subscribe(user) {
    const db = new DB('users');
    return db.addSubscription(user)
        .then((res: Response) => {
            return true;
        })
        .catch(() => {
            return false;
        });
}
function unsubscribe(user) {
    const db = new DB('users');
    return db.removeSubscription(user)
        .then((res: Response) => {
            return true;
        })
        .catch(() => {
            return false;
        });
}

export default authController;
