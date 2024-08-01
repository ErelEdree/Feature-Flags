const mongoose = require('mongoose');

const SeedTrackSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    seeded: { type: Boolean, default: false },
    lastSeeded: { type: Date }
});

module.exports = mongoose.model('SeedTrack', SeedTrackSchema);