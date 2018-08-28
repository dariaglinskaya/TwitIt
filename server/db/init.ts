import * as mongoose from 'mongoose';
const mongoURL = 'mongodb://dariaglinskaya:6972675Dasha@ds235352.mlab.com:35352/twitit';

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