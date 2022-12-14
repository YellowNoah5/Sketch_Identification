function preload() {
    classifier = ml5.imageClassifier("DoodleNet")
}

function setup() {
    canvas = createCanvas(450, 400)
    background("white")
    canvas.center()
    canvas.mouseReleased(classifycanvas)
    synth = window.speechSynthesis
}

function draw() {
    strokeWeight(7)
    stroke("black")
    if(mouseIsPressed) {
        line(pmouseX, pmouseY, mouseX, mouseY)
    }
}

function classifycanvas() {
    classifier.classify(canvas, gotresults)
}

function gotresults(error, results) {
    if(error) {
        console.error(error)
    }
    console.log(results)
    document.getElementById("objname").innerHTML = "name: "+ results[0].label
    document.getElementById("objcon").innerHTML = "confidence: "+ Math.floor(results[0].confidence*100)+"%"

    Talk = new SpeechSynthesisUtterance(results[0].label)
    synth.speak(Talk) 
}

function clear_canv() {
    background("white")
}