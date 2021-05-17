const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// get all tags
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product, through: ProductTag, as: 'location_tags' }]
    });
    // console.log(tagData);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Product data
});

// get tag by id
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findOne(req.params.id, {
      include: [{ model: Product, through: ProductTag, as: 'location_tags' }]
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Product data
});

// create new tag
router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update tag 
router.put('/:id', async (req, res) => {
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
  .then((tag) => res.status(200).json(tag))
  .catch((err) => {
    // console.log(err);
    res.status(400).json(err);
  });
});

// delete tag by id
router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: { id: req.params.id }
    });
    if (!tagData) {
      res.status(404).json({ message: 'No tag with this id!' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
