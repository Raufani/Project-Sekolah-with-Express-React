const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const kelasSchema = new Schema({
    nama_kelas: {
        type: String,
        required: true
    },
    katagori: {
        type: String,
        required: true,
        max:2
    },
    jurusan: {
        type: String,
        required: true
    },
    id_sekolah: {
        type: String,
        required: true
    },
    id_wali: {
        type: String,
        required: true
    }
})



let Data_smkn_kelas = mongoose.model('Data_smkn_kelas', kelasSchema);
module.exports = Data_smkn_kelas;