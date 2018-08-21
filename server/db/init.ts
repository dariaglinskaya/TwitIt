import * as mongoose from 'mongoose';
const mongoURL = 'mongodb://127.0.0.1/TwitIt';

const DBInit = () => {
    mongoose.connect(mongoURL, { useNewUrlParser: true }, (err, d) => {
        if (err) {
            console.log("Error while connecting to DB. Error: " + err);
        } else {
            console.log("Coonected to db successfully.");
        }
    });
};

export default DBInit;