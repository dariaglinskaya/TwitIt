import * as mongoose from 'mongoose';
import DBInit from './init';
import userModel from '../models/userModel';

DBInit();
const db = mongoose.connection;

class DB {

    public collectionName: string;
    public _id: string = '';
    constructor(collectionName) {
        this.collectionName = collectionName;
    }
    public insert(newItem) {
        const item = new userModel(newItem);
        return new Promise((resolve, reject) => {
            item.save((err) => {
                if (!err) {
                    resolve(this._id);
                } else {
                    reject(err);
                }
            })
        });
    };
    public findOne(item) {
        return new Promise((resolve, reject) => {
            db
                .collection(this.collectionName)
                .findOne({ username: item.username }, (err, result) => {
                    console.log(result)
                    if (result) {
                        resolve(result);
                    } else {
                        reject(err);
                    }
                });
        });
    };
    public findByAuthor(username) {
        return new Promise((resolve, reject) => {
            db
                .collection(this.collectionName)
                .find({ author: username }).toArray((err, result) => {
                    if (result) {
                        resolve(result);
                    } else {
                        reject(err);
                    }
                });
        });
    }
}

export default DB;