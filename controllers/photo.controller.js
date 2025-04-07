import { Photo } from '../models/Photo.js';

class PhotoController {
  async create(req, res) {
    try {
      const { url, title, description, isPublic, category } = req.body;
      const newPhoto = new Photo({
        url,
        title,
        description,
        isPublic,
        category,
      });
      const result = await newPhoto.save();
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getPublicPhotos(req, res) {
    try {
      const photos = await Photo.find({ isPublic: true });
      res.json(posts);
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

  async getPostById(req, res) {
    try {
      const { id } = req.params;
      const photo = await Photo.findById(id);

      if (!post) {
        return res.status(404).json({ error: 'Фото не найдено' });
      }

      res.json(post);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { url, title, description, isPublic, category } = req.body;

      const updatedPhoto = await Photo.findByIdAndUpdate(
        id,
        { url, title, description, isPublic, category },
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

// import { Photo } from '../models/Photo.js';

// class ProductController {
//   async getAllProduct(req, res) {
//     try {
//       const products = await Product.find();
//       res.json(products);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   }
//   async getProduct(req, res) {
//     try {
//       const { id } = req.params;
//       const product = await Product.findById(id);
//       res.json(product);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   }
//   async create(req, res) {
//     try {
//       const product = await new Product(req.body).save();
//       res.status(201).json(product);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   }
//   async update(req, res) {
//     try {
//       const { id } = req.params;
//       const { name, description, price, category} = req.body;
//       const result = await Product.findByIdAndUpdate(
//         id,
//         { name, description, price, category},
//         { new: true }
//       );
//       res.json(result);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   }
//   async delete(req, res) {
//     try {
//         const { id } = req.params;
//         const result = await Product.findByIdAndDelete(id);
//         res.json({ message: "Удален", deletedProduct: result });
//     } catch (error) {
//         res.status(500).json({error: error.message});
//     }
//   }
// }

// export default new ProductController();
