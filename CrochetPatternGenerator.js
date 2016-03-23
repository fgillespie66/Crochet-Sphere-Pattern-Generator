var pattern = [[0,0],[0,0]]
var row = 0

function CrochetPatternGenerator(gauge, radius, stitchHeight) {
	$("#patternText").show()
	$("#currentRow").show()

	var maximumRowIndex = Math.floor(Math.PI*radius/stitchHeight)
	var previousCircumferenceOfNextRow = 0
	document.getElementById("patternText").innerHTML = ""

	for (var i = 0; i < maximumRowIndex; i ++) {
		var circumferenceOfNextRow = Math.floor(2*Math.PI*radius*Math.sin((i+1)*stitchHeight/radius)*gauge)
		var increaseAmount = circumferenceOfNextRow - previousCircumferenceOfNextRow
		pattern[i] = [previousCircumferenceOfNextRow, increaseAmount]
		// if (increaseAmount > 0) {
		// 	document.getElementById("patternText").innerHTML += "Row " + i + " (" + previousCircumferenceOfNextRow + " stitches total): increase by " + increaseAmount + " stitches <br>" 
		// } else {
		// 	document.getElementById("patternText").innerHTML += "Row " + i + " (" + previousCircumferenceOfNextRow + " stitches total): decrease by " + Math.abs(increaseAmount) + " stitches <br>" 
		// }
		previousCircumferenceOfNextRow = circumferenceOfNextRow
	}
	changeRowTo(0)
	printPattern()
}

function printPattern() {

	var table = $("<table></table>");
	for (var i = 0; i < pattern.length; i++) {
		var new_row = $("<tr></tr>").append(
			$("<td> Row " + i + "</td>").addClass("stitchTableCell"),
			$("<td> " + pattern[i][0] + " stitches total </td>").addClass("stitchTableCell")
		)
		if (pattern[i][1] >= 0) {
			new_row.append(
				$("<td> increase by " + pattern[i][1] + " stitches </td>").addClass("stitchTableCell")
			)
		} else  {
			new_row.append(
				$("<td> decrese by " + Math.abs(pattern[i][1]) + " stitches </td>").addClass("stitchTableCell")
			)
		} 

		if (i === row) {
			new_row.addClass("selected").attr("id", "selected")
		}
		table.append(new_row)
	}
	$("#patternText").empty();
	$("#patternText").append(table)

	$("#patternText").scrollTop($("#patternText").scrollTop() + $("#selected").position().top - $("#patternText").height());
}

function changeRowBy(n) {
	if (n == parseInt(n, 10))
		changeRowTo(row + parseInt(n))
}

function changeRowTo(n) {
	if (n == parseInt(n, 10) && n >= 0 && n < pattern.length) {
		row = parseInt(n, 10)

		$("#rowName").text("Row " + n + " of " + (pattern.length - 1))
		$("#rowTotal").text(pattern[n][0] + " stitches total")
		if (pattern[n][1] >= 0) {
			$("#rowIncr").text("increase by " + pattern[n][1] + " stitches")
		} else {
			$("#rowIncr").text("decrease by " + Math.abs(pattern[n][1]) + " stitches")
		}
		printPattern();
	}
}

function max(a, b) {
	return (a > b) ? a : b;
}

function reactToKeyboard(e) {
	// spacebar
	if (e.keyCode == "32") {
		changeRowBy(1);
	}

	// up
	if (e.keyCode == "38") {
		changeRowBy(-1);
	}

	// down
	if (e.keyCode == "40") {
		changeRowBy(1);
	}
}


function getBackground(){

    var background_data = g_backgrounds[Math.floor(Math.random() * g_backgrounds.length)];
    var background = "url(\"" +background_data["url"] +"\")";
    $('<img/>').attr('src', background_data["url"]).load(function(){
        $("body").css('background-image', background);
        $(".overlay").fadeOut();
        $("#credit").append("With thanks to "+ background_data["author"] + " for the image");
    });
}

$(document).ready( function() {
	window.addEventListener("keydown", reactToKeyboard, false);
	getBackground();
});