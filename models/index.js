const Vendor = require('./Vendor');
const User = require('./User');
const Shop = require('./Shop');
const Merchandise = require('./Merchandise');

// Vendor.hasOne(Shop, {
//    onDelete: 'CASCADE',
//    foreignKey: 'owner_id',
//    as: 'shop',
// });
// Shop.belongsTo(Vendor, {
//    onDelete: 'CASCADE',
//    foreignKey: 'vendor_id',
//    as: 'vendor',
// });

module.exports = { Vendor, User, Shop, Merchandise };
