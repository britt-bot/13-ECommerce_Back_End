// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
  through: {
    model: Tag,
    unique: false
  },
  as: 'planned_product'
});

// Categories have many Products
Category.haveMany(Product, {
  through: {
    model: Tag,
    unique: false
  },
  as: 'planned_category'
});

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: {
    model: ProductTag,
    unique: false
  },
  as: 'location_products'
});

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: {
    model: ProductTag,
    unique: false
  },
  as: 'location_tags'
});



module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
