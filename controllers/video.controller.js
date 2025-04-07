import { Video } from "../models/Video.js";

class VideoController {
  async create(req, res) {
    try {
      // const { url, title, description, isPublic, category } = req.body;
      // const newVideo = new Video({ url, title, description, isPublic, category });
      // const result = await newVideo.save();
      const result = await new Video(req.body).save();
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getPublicVideos(req, res) {
    try {
      const videos = await Video.find({ isPublic: true });
      res.json(videos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllVideos(req, res) {
    try {
      const video = await Video.find();
      res.json(video);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getPostById(req, res) {
    try {
      const { id } = req.params;
      const video = await Video.findById(id);

      if (!video) {
        return res.status(404).json({ error: "Видео не найдено" });
      }

      res.json(video);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { url, title, description, isPublic, category } = req.body;

      const updatedVideo = await Video.findByIdAndUpdate(
        id,
        { url, title, description, isPublic, category },
        { new: true }
      );

      if (!updatedVideo) {
        return res.status(404).json({ error: "Видео не найдено" });
      }

      res.json(updatedVideo);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const deletedVideo = await Video.findByIdAndDelete(id);

      if (!deletedVideo) {
        return res.status(404).json({ error: "Видео не найдено" });
      }

      res.status(204).json({ message: "Видео было успешно удалено" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new VideoController();
