import {Meteor} from 'meteor/meteor';
import {HTTP} from 'meteor/http';

import {Offers} from '../imports/api/offers.js';

Meteor.startup(() => {

    let offersCount = Offers.find().count();
    if(offersCount === 0) {
        HTTP.call("GET", "https://bonding.testraisin.com/rcba/v1/offer/DEU?locale=en", {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer bonding1",
            }
        },
        function (error, response) {
            if(error) {
                console.error(error);
            } else {
                _.each(response.data, function (offer) {
                    Offers.insert(offer);
                });

                console.log("Offers loaded: " + Offers.find().count());
            }
        });
    }
});
