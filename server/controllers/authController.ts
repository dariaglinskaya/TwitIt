import DB from '../db/db';

export default function register(user) {
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
