import * as mongoose from 'mongoose';
import DBInit from './init';
import userModel from '../models/userModel';
import tweetModel from '../models/tweetModel';

DBInit();
const db = mongoose.connection;

class DB {

    public collectionName: string;
    public _id: string = '';
    constructor(collectionName) {
        this.collectionName = collectionName;
    }
    public insertUser(newItem) {
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
    public insertTweet(newItem) {
        const item = new tweetModel(newItem);
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
                .find({ author: username }).sort({ date: -1 }).toArray((err, result) => {
                    if (result) {
                        resolve(result);
                    } else {
                        reject(err);
                    }
                });
        });
    }
    public findEntry(user) {
        const username = user.user;
        return new Promise((resolve, reject) => {
            db
                .collection(this.collectionName)
                .find({ username: new RegExp(username) }).toArray((err, result) => {
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