function CrochetPatternGenerator(gauge, radius, stitchHeight) {
	var maximumRowIndex = Math.floor(Math.PI*radius/stitchHeight)
	var previousCircumferenceOfNextRow = 0
	document.getElementById("patternText").innerHTML = ""

	for (var i = 0; i < maximumRowIndex; i ++) {
		var circumferenceOfNextRow = Math.floor(2*Math.PI*radius*Math.sin((i+1)*stitchHeight/radius)*gauge)
		var increaseAmount = circumferenceOfNextRow - previousCircumferenceOfNextRow
		if (increaseAmount > 0) {
			document.getElementById("patternText").innerHTML += "Row " + i + " (" + previousCircumferenceOfNextRow + " stitches total): increase by " + increaseAmount + " stitches <br>" 
		} else {
			document.getElementById("patternText").innerHTML += "Row " + i + " (" + previousCircumferenceOfNextRow + " stitches total): decrease by " + Math.abs(increaseAmount) + " stitches <br>" 
		}previousCircumferenceOfNextRow = circumferenceOfNextRow

	}
}