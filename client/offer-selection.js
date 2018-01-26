import {Offers} from '../imports/api/offers.js';

Template.offerSelection.helpers({
    offers() {
        return Offers.find({}, { bank_id: 1 });
    }
});



Template.offerSelection.events({
  "change #offerSelect": function(event, template){
    var selectValue = template.$("#offerSelect").val();
    console.log(selectValue);
    alert(selectValue);
  }
});

