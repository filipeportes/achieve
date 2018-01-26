import {Meteor} from 'meteor/meteor';
import {HTTP} from 'meteor/http';

import {Categories} from '../imports/api/categories.js';
import {Offers} from '../imports/api/offers.js';
import {Goals} from '../imports/api/goals.js';

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

    let categoriesCount = Categories.find().count();
    if (categoriesCount == 0) {
    	Categories.insert({title: "New car", createdAt: new Date(), description: "Achieve the car you ever wanted",
            value: "€ 50.000", imageSource: "/assets/images/categories/car.jpg"});
    	Categories.insert({title: "Dream Travel", createdAt: new Date(), description: "You deserve some rest",
            value: "€ 4.000", imageSource: "/assets/images/categories/travel.jpeg"});
        Categories.insert({title: "House", createdAt: new Date(), description: "Live in your dream house",
            value: "€ 200.000", imageSource: "/assets/images/categories/house.png"});
    	Categories.insert({title: "iPhone X", createdAt: new Date(),  description: "Be another Mac fag",
            value: "€ 2.000", imageSource: "/assets/images/categories/iphoneX.png"});
        Categories.insert({title: "BVG Shoes", createdAt: new Date(), description: "They should pay you to use it",
            value: "€ 1.000", imageSource: "/assets/images/categories/Sneakers.png"});

        console.log("Categories created: " + Categories.find().count());
    }

});
