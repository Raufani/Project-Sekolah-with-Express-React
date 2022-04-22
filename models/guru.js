const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const guruSchema = new Schema({
    nama_guru: {
        type: String,
        required: true,
        unique: true
    },
    alamat: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    telepon: {
        type: String,
        min:12,
        required: true
    },
    id_sekolah:{
        type: String,
        required: true
        //type: mongoose.Schema.Types.ObjectId,
        //ref: 'Data_smkn' 
    }
})

let data_smkn_guru = mongoose.model('Data_smkn_guru', guruSchema);
module.exports = data_smkn_guru;