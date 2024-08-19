const Vendor = require('./Vendor');
const User = require('./User');
const Shop = require('./Shop');
const Merchandise = require('./Merchandise');
const Subscriber = require('./Subscribers');
const Basket = require('./Basket')
/////////////////

Vendor.belongsToMany(User, {
    onDelete: 'CASCADE',
    through: Subscriber,
    foreignKey: 'subscriber_id',
    as: 'subscribers'
});
User.belongsToMany(Vendor, {
    onDelete: 'CASCADE',
    through: Subscriber,
    foreignKey: 'subscribed_id',
    as: 'subscriptions'
});
Subscriber.belongsTo(Vendor, { foreignKey: 'subscriber_id'});
Subscriber.belongsTo(User, { foreignKey: 'subscribed_id'});

/////////////////

Vendor.hasOne(Shop, {
    onDelete: 'CASCADE',
    foreignKey: 'owner_id',
    as: 'shop',
});
Shop.belongsTo(Vendor, {
    onDelete: 'CASCADE',
    foreignKey: 'owner_id',
    as: 'vendor',
});

/////////////////

// Vendor.hasMany(Merchandise, {
//     onDelete: 'CASCADE',
//     foreignKey: 'vendor_id',
//     as: 'merchandise',
// });
Shop.hasMany(Merchandise, {
    onDelete: 'CASCADE',
    foreignKey: 'shop_id',
    as: 'merchandise',
});

/////////////////

Merchandise.belongsToMany(User, {
    onDelete: 'CASCADE',
    through: Basket,
    foreignKey: 'merch_id',
    as: 'basket'
});
User.belongsToMany(Merchandise, { 
    onDelete: 'CASCADE',
    through: Basket,
    foreignKey: 'user_id',
    as: 'basket'
});

module.exports = { Vendor, User, Shop, Merchandise, Basket };
