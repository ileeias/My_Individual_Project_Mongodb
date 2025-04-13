import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      default: 'Other',
    },
    hashtag: {
      type: String,
      trim: true,
    },
  },
  {
    _id: false,
  }
);

const videoSchema = new mongoose.Schema({
  url: {
    type: String,
    required: [true, 'Необходимо указать ссылку на видео'],
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  addedAt: {
    type: Date,
    default: Date.now,
  },
  isPublic: {
    type: Boolean,
    required: true,
    default: false,
  },
  album: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Album',
    required: true,
    trim: true,
  },
  category: {
    type: categorySchema,
  },
});

export const Video = mongoose.model('Video', videoSchema);
