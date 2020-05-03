/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';
/**
 * Write your transction processor functions here
 */

/**
 * Sample transaction
 * @param {org.honestchain.ChainTransaction} chainTransaction
 * @transaction
 */
async function chainTransaction(tx) {
    // Get the asset registry for the asset.
    const assetRegistry = await getAssetRegistry('org.honestchain.Dataset');
    let event = getFactory().newEvent('org.honestchain', 'SampleEvent');

    var avg  = (tx.inputcs + tx.inputdr)/2;
    var risk_level = "low";
    var decision = "approved";
    var base_reputation = tx.user.reputation;
    var reputation = 0;
    if (avg <= 3) {
	    risk_level = "low";
	    decision = "approved";
      reputation = reputation + base_reputation + 1 ;
    }
    else if (avg > 3 && avg <= 7) {
	    risk_level = "medium";
      decision = "manual approval required";
      reputation = reputation + base_reputation + 0 ;
    }
    else {
	    risk_level = "high";
      decision = "denied";
      reputation = reputation + base_reputation - 1 ;
    }
    tx.dataset.decision = decision;
    tx.dataset.risk_level = risk_level;
    tx.dataset.reputation = reputation;
    tx.dataset.last_requester = tx.user;

    // Update the asset with the new value.
    await assetRegistry.update(tx.dataset);
    
    // Update the asset in the asset registry.
    event.dataset = tx.dataset;
    event.newDecision = decision;
    event.new_risk_level = risk_level;
    event.new_reputation = tx.dataset.reputation;
    event.inputcs = tx.inputcs;
    event.inputdr = tx.inputdr; 
    emit(event);
}
