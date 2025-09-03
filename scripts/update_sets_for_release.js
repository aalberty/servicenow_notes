/**
 * Grab a list of story numbers from the release record (sn_utils copycells slash command), feed into this script, and receive an sn query as output
 * that can be used on the sys_update_set table to look for update sets following the standard naming convention that likely need to be included in the release
 * batch. "Likely need to be included" simply means they have the story number in their name.
 * 
 * e.g.
 * 
 * raw result of copycells:
 *  STRY0053507
    STRY0053448
    STRY0053361
    STRY0053310
    STRY0053308
    STRY0053299
    STRY0053296
    STRY0053140
    STRY0052853
    STRY0048953
    STRY0048952

    join to a single line

    var story_numbers = "STRY0053507 STRY0053448 STRY0053361 STRY0053310 STRY0053308 STRY0053299 STRY0053296 STRY0053140 STRY0052853 STRY0048953 STRY0048952";

    expected output => nameLIKESTRY0053507^ORnameLIKESTRY0053448^ORnameLIKESTRY0053361^ORnameLIKESTRY0053310^ORnameLIKESTRY0053308^ORnameLIKESTRY0053299^ORnameLIKESTRY0053296^ORnameLIKESTRY0053140^ORnameLIKESTRY0052853^ORnameLIKESTRY0048953^ORnameLIKESTRY0048952

 */

var story_numbers = "STRY0053507 STRY0053448 STRY0053361 STRY0053310 STRY0053308 STRY0053299 STRY0053296 STRY0053140 STRY0052853 STRY0048953 STRY0048952";

function update_sets_for_release(stories) {
    var arr = stories.split(" ");
    var query = "";

    for (var i = 0; i < arr.length; i++) {
        if (i != 0) {
            query += "^OR";
        }
        query += "nameLIKE" + arr[i];
    }
    return query;
}

var query = update_sets_for_release(story_numbers);
console.log(query);