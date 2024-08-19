const Vendor = require('./Vendor');
const User = require('./User');
const Shop = require('./Shop');
const Merchandise = require('./Merchandise');
const Subscriber = require('./Subscribers');
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

module.exports = { Vendor, User, Shop, Merchandise };
