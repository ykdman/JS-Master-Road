class Product {
  #product = [];
  constructor(title, imgUrl, description, price) {
    this.title = title || 'DEFAULT';
    this.imgUrl = imgUrl;
    this.description = description;
    this.price = price;
  }
}
