import * as mongoose from 'mongoose';
import DBInit from './init';

DBInit();
const db = mongoose.connection;

class DB {

    public collectionName: string;
    public _id: string = '';
    constructor(collectionName) {
        this.collectionName = collectionName;
    }
    public insert() {
        return new Promise((resolve, reject) => {

            let newItem = JSON.parse(this.toJSON());            
            db
                .collection(this.collectionName)
                .insertOne(newItem, { w: 1 }, (err, result) => {
                    if (!err) {
                        this._id = result.insertedId;
                        resolve(this._id);
                    } else {
                        reject(err);
                    }
                });
        });
    }

    public getDataObject() {
        return JSON.parse(this.toJSON());
    }
    public toJSON(): string {
        return JSON.stringify(this.getDataObject())
    }
}

export default DB;