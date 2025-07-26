import products from '../data/product.js';

//get All product
const getAllProducts = (req, res) => {
    try {
      res.json({ success: true, products });
} catch (error) {
    console.log(error) ;
    res.json({success:false,message:'Error'});
}
};

export { getAllProducts };
