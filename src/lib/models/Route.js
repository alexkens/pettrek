import mongoose from 'mongoose';

const routeSchema = new mongoose.Schema({
  start: {
    type: String,
    required: true,
  },
  end: {
    type: String,
    default: null,
  },
  routeType: {
    type: String,
    enum: ['one-way', 'round-trip'],
    default: 'one-way',
  },
  mode: {
    type: String,
    enum: ['walking', 'biking'],
    default: 'walking',
  },
  time: {
    type: Number,
    required: true,
  },
  distance: {
    type: Number,
    required: true,
  },
  calculatedDistance: {
    type: Number,
    default: 0,
  },
  duration: {
    type: Number,
    default: 0,
  },
  coordinates: {
    start: {
      lat: Number,
      lon: Number,
    },
    end: {
      lat: Number,
      lon: Number,
    },
  },
  routeCoordinates: [
    {
      type: [Number], // [longitude, latitude]
    },
  ],
  dogParks: [
    {
      name: String,
      latitude: Number,
      longitude: Number,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Route || mongoose.model('Route', routeSchema);
