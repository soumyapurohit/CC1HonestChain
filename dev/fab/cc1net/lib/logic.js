/**
 * Track the trade of a commodity from one trader to another
 * @param {org.cc1.net.Trade} trade - the trade to be processed
 * @transaction
 */
async function trade(trade) {

    var trustScore = (trade.ds + trade.cs)/2;
    var risk;
    if(trustScore <=3){
        risk = -1; 
    }else if(trustScore > 3 && trustScore <= 7){
        risk = 0;
    }else{
        risk = 1; 
    }

    trade.commodity.owner = trade.newOwner;
    let assetRegistry = await getAssetRegistry('org.cc1.net.Commodity');
    if(risk == 1){
        await assetRegistry.update(trade.commodity);
    }else{
        return {'trust':trust};
    }
}