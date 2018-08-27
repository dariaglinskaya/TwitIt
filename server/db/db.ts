import * as mongoose from 'mongoose';
import DBInit from './init';
import userModel from '../models/userModel';
import tweetModel from '../models/tweetModel';
const ObjectID = require('mongodb').ObjectID;

DBInit();
const db = mongoose.connection;

class DB {

    public collectionName: string;
    public _id: string = '';
    constructor(collectionName) {
        this.collectionName = collectionName;
    }
    public addSubscription(user) {
        console.log(user);
        return new Promise((resolve, reject) => {
            db
                .collection(this.collectionName)
                .update({ username: user.admin }, { $push: {subscriptions: user.username}}, (err, result) => {
                    if (result) {
                        resolve(result);
                    } else {
                        reject(err);
                    }
                });
        });
    }
    public addRetweet(user) {
        console.log(user);
        return new Promise((resolve, reject) => {
            db
                .collection(this.collectionName)
                .update({ username: user.admin }, { $push: {retweets: user.id}}, (err, result) => {
                    if (result) {
                        resolve(result);
                    } else {
                        reject(err);
                    }
                });
        });
    }
    public likeTweet(tweet) {
        console.log(tweet.text);
        return new Promise((resolve, reject) => {
            db
                .collection(this.collectionName)
                .update({ _id:  ObjectID(tweet._id)}, { $inc: {countLikes: 1}}, (err, result) => {
                    if (result) {
                        resolve(result);
                    } else {
                        reject(err);
                    }
                });
        });
    }
    public unlikeTweet(tweet) {
        return new Promise((resolve, reject) => {
            db
                .collection(this.collectionName)
                .update({ _id: ObjectID(tweet._id) }, { $inc: {countLikes: -1}}, (err, result) => {
                    if (result) {
                        resolve(result);
                    } else {
                        reject(err);
                    }
                });
        });
    }
    public retweetTweet(tweet) {
        return new Promise((resolve, reject) => {
            db
                .collection(this.collectionName)
                .update({ _id:  ObjectID(tweet.id)}, { $inc: {countRetweets: 1}}, (err, result) => {
                    if (result) {
                        resolve(result);
                    } else {
                        reject(err);
                    }
                });
        });
    }
    public unretweetTweet(tweet) {
        return new Promise((resolve, reject) => {
            db
                .collection(this.collectionName)
                .update({ _id: ObjectID(tweet.id) }, { $inc: {countRetweets: -1}}, (err, result) => {
                    if (result) {
                        resolve(result);
                    } else {
                        reject(err);
                    }
                });
        });
    }
    public removeSubscription(user) {
        console.log(user);
        return new Promise((resolve, reject) => {
            db
                .collection(this.collectionName)
                .update({ username: user.admin }, { $pull: {subscriptions: user.username}}, (err, result) => {
                    if (result) {
                        resolve(result);
                    } else {
                        reject(err);
                    }
                });
        });
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
    public findById(id) {
        return new Promise((resolve, reject) => {
            db
                .collection(this.collectionName)
                .find({ _id: ObjectID(id) }).sort({ date: -1 }).toArray((err, result) => {
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