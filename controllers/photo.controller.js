import { Photo } from '../models/Photo.js';
import { Album } from '../models/Album.js';

class PhotoController {
  async create(req, res) {
    const { album, url, title, description, isPublic, category } = req.body;
    const needAlbum = await Album.findOne({ title: album });

    if (!needAlbum) {
      return res.status(404).json({ error: 'Альбом не найден' });
    }
    const newPhoto = new Photo({
      url,
      title,
      description,
      isPublic,
      category,
      album: needAlbum._id,
    });
    try {
      const result = await newPhoto.save();
      res.status(201).json(result);
      console.log(needAlbum);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getPublicPhotos(req, res) {
    try {
      const photos = await Photo.find({ isPublic: true });
      res.json(photos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllPhotos(req, res) {
    try {
      const photos = await Photo.find();
      res.json(photos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getPhotoById(req, res) {
    try {
      const { id } = req.params;
      const photo = await Photo.findById(id);

      if (!photo) {
        return res.status(404).json({ error: 'Фото не найдено' });
      }

      res.json(photo);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { url, title, description, isPublic, category, album } = req.body;

      const updatedPhoto = await Photo.findByIdAndUpdate(
        id,
        { url, title, description, isPublic, category, album },
        { new: true }
      );

      if (!updatedPhoto) {
        return res.status(404).json({ error: 'Фото не найдено' });
      }

      res.json(updatedPhoto);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const deletedPhoto = await Photo.findByIdAndDelete(id);

      if (!deletedPhoto) {
        return res.status(404).json({ error: 'Фото не найдено' });
      }

      res.status(204).json({ message: 'Фото было успешно удалено' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new PhotoController();
