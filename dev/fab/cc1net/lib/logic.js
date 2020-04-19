
/**
 * Track the trade of a commodity from one trader to another
 * @param {org.cc1.net.Trade} trade - the trade to be processed
 * @transaction
 */
async function trade(trade) {
    trade.commodity.owner = trade.newOwner;
    let assetRegistry = await getAssetRegistry('org.cc1.net.Commodity');
    await assetRegistry.update(trade.commodity);
}