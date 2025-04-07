import { Album } from "../models/Album.js"

class AlbumController {
    async create(req, res) {
        try {
            const album = await new Album(req.body).save();
            res.status(201).json(album)
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async update(req, res) {
        try {
          const { id } = req.params;
          const { title } = req.body;
          const result = await Album.findByIdAndUpdate(
            id,
            { title },
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
            res.json({ message: "Удален", deletedProduct: result });
        } catch (error) {
            res.status(500).json({error: error.message});
        }
      }
}

export default new AlbumController();