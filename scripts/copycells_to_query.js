/**
 * Take the result of using sn_utils copycells slash command to grab a list of values, and output a stringified SN query

e.g. 
raw copycells result:
INC0244129
INC0244702
INC0246368
INC0244032

join them into a single line


var input = "INC0244129 INC0244702 INC0246368 INC0244032";
var field = "number";


expected output => number=INC0244129^ORnumber=INC0244702^ORnumber=INC0246368^ORnumber=INC0244032

*/



// MODIFY THESE
var input = "INC0244129 INC0244702 INC0246368 INC0244032";
var field = "number";

function cc_to_query(input, field) {
    var arr = input.split(" ");
    var query = "";

    for (var i = 0; i < arr.length; i++) {
        if (i != 0) {
            query += "^OR";
        }
        query += field + "=" + arr[i];
    }
    return query;
}

var output = cc_to_query(input, field);
console.log(output);