import { Album } from '../models/Album.js';
import { Photo } from '../models/Photo.js';
import { Video } from '../models/Video.js';

class AlbumController {
  async create(req, res) {
    try {
      const album = await new Album(req.body).save();
      res.status(201).json(album);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async getAll(req, res) {
    try {
      const albums = await Album.find();
      res.json(albums);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async getOne(req, res) {
    try {
      const { id } = req.params;
      const photos = await Photo.find({ album: id });
      const videos = await Video.find({ album: id });

      if (photos.length === 0 && videos.length === 0) {
        return res.status(404).json({ error: 'Альбом пуст' });
      }

      res.json({photos, videos});
    } catch (error) {
      res.status(500).json({ error: 'Внутренняя ошибка сервера', error: error.message });
    }
  }
  async update(req, res) {
    try {
      const { id } = req.params;
      const { title, year } = req.body;
      const result = await Album.findByIdAndUpdate(
        id,
        { title, year },
        { new: true }
      );
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async delete(req, res) {
    try {
      const { id } = req.params;
      const result = await Album.findByIdAndDelete(id);
      res.json({ message: 'Удален', deletedProduct: result });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new AlbumController();
