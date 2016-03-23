function CrochetPatternGenerator(gauge, radius, stitchHeight) {
	var maximumRowIndex = Math.floor(Math.PI*radius/stitchHeight)
	var previousCircumferenceOfNextRow = 0
	document.getElementById("patternText").innerHTML = ""
	for (var i = 0; i < maximumRowIndex; i ++) {
		var circumferenceOfNextRow = 2*Math.PI*radius*Math.sin((i+1)*stitchHeight/radius)*gauge
		document.getElementById("patternText").innerHTML += "Row " + i + " (" + Math.floor(previousCircumferenceOfNextRow) + " stitches total): increase by " + Math.floor(circumferenceOfNextRow - previousCircumferenceOfNextRow) + " stitches <br>" 
		previousCircumferenceOfNextRow = circumferenceOfNextRow

	}

	console.log(gauge)
	console.log(radius)
	console.log(stitchHeight) 
}