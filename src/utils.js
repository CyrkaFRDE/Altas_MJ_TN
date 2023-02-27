/*********
 * UTILS *
 *********/

// Auxiliary function
function sortedQuants(sortedArray, q) {
    var pos = ((sortedArray.length) - 1) * q;
    var base = Math.floor(pos);
    var rest = pos - base;
    if ((sortedArray[base + 1] !== undefined)) {
        return sortedArray[base] + rest * (sortedArray[base + 1] - sortedArray[base]);
    } else {
        return sortedArray[base];
    }
}

/**
 * Returns the quantiles of data, value must be stored in properties.value for each feature of data.
 *
 * @param {object} data The data in a dictionary format, fetched from a geoJSON.
 * @return {object} The quantiles in a dictionary, with keys "Q0" to "Q4"
 */
function getQuants(data) {
    var dataArray = [];
    for (let f in data.features) {
        dataArray.push(data.features[f].properties.value);
    }

    var sortedArray = dataArray.sort(function (a, b) {
        return a - b;
    });

    return {
        "Q0": sortedArray[0],
        "Q1": sortedQuants(sortedArray, 0.25),
        "Q2": sortedQuants(sortedArray, 0.5),
        "Q3": sortedQuants(sortedArray, 0.75),
        "Q4": sortedArray[sortedArray.length - 1],
    }
}

function percToHex(perc) {
    return (Math.round(255 * perc)).toString(16);
}

/*************
 * END UTILS *
 *************/