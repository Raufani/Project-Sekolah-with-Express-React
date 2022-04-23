const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sekolahSchema = new Schema({
    nama_sekolah: {
        type: String,
        required: true
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
    gambar: {
        type: String,
        default: 'pangdam_jaya.jpg'
    }
})



let Data_smkn = mongoose.model('Data_smkn', sekolahSchema);
module.exports = Data_smkn;