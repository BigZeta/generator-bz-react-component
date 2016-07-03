import starWarsNames from './starwars-names.json'

let getRandomItem = function() {
    return starWarsNames[Math.round(starWarsNames.length*Math.random())];
};

module.exports = {
    all: starWarsNames,
    random: random
};

function random(num) {
    if (num === undefined) {
        return getRandomItem();
    } else {
        var items = [];

        for (var i = 0; i < num; i++) {
            items.push(getRandomItem())
        }
        return items;
    }
}