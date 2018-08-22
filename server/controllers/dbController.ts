import DB from '../db/db';

export default function register(user) {
    const db = new DB('users');
    return db.findOne(user)
        .then((res: Response) => {
            console.log(res);
            return false;
        })
        .catch(() => {
            db.insert(user);
            return true;
        });
}
