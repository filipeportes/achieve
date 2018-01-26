import {Offers} from '../imports/api/offers.js';

Template.offerSelection.helpers({
    offers() {
        return Offers.find({}, { bank_id: 1 });
    }
});
