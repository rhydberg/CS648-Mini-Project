function rnd(){
    return Math.random();
}

function get_points(n){
    var points = [0,1];
    
    for (var i = 0; i < n; i++){
        points.push(rnd());
    }
    points.sort();
    return points;
}

function find_min_interval(points){
    var min_interval = 1;
    var index = -1;
    for (var i = 0; i < points.length - 1; i++){
        var interval = points[i + 1] - points[i];
        if (interval < min_interval){
            min_interval = interval;
            index = i;
        }
    }
    return [min_interval, index];
}

const input_field = document.getElementById('textField');
const button = document.getElementById('submit');
const info = document.getElementById('info');


let dpi = window.devicePixelRatio;
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext("2d");
ctx.translate(0.5, 0.5);
let canvas_height = +getComputedStyle(canvas).getPropertyValue("height").slice(0, -2);
let canvas_width = +getComputedStyle(canvas).getPropertyValue("width").slice(0, -2);

function fix_dpi() {
    //get CSS height
    //the + prefix casts it to an integer
    //the slice method gets rid of "px"
    let style_height = +getComputedStyle(canvas).getPropertyValue("height").slice(0, -2);
    //get CSS width
    let style_width = +getComputedStyle(canvas).getPropertyValue("width").slice(0, -2);
    //scale the canvas
    console.log(style_width, style_height);
    canvas.setAttribute('height', style_height * dpi);
    canvas.setAttribute('width', style_width * dpi);
}

fix_dpi();
console.log(canvas_width, canvas_height);
const adj = 1.318
canvas_width = canvas_width*adj;
canvas_height = canvas_height*adj;

line_start_x = .05*canvas_width;
line_start_y = .5*canvas_height;
line_width = .9*canvas_width;
line_height = 5

function draw(){
    ctx.clearRect(0, 0, canvas_width, canvas_height);

    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.fillRect(line_start_x, line_start_y, line_width, line_height);
    n = parseInt(input_field.value);
    let points = get_points(n);
    let [min_interval, index] = find_min_interval(points);

    ctx.fillStyle = "#36e617"
    for (var i = 0; i < points.length; i++){
        ctx.beginPath();
        if(i == index || i == index + 1){
            ctx.fillStyle = "red";
        } 
        else {
            ctx.fillStyle = "#36e617";
        }
        ctx.arc(points[i]*line_width + line_start_x, line_start_y + line_height/2, 6, 0, 2*Math.PI);
        ctx.fill();
    }

    ctx.fillStyle = "red"
    ctx.beginPath();
    ctx.fillRect(points[index]*line_width + line_start_x, line_start_y, min_interval*line_width, line_height);
    info.style.display = "block";
    info.innerHTML = "Smallest interval: " + min_interval.toFixed(5);


}




// ctx.fillRect(0, 0, canvas_width*1.32, canvas_height*1.32);
// ctx.arc(.5*canvas_width*adj, .5*canvas_height*adj, 10, 0, 2*Math.PI);
// ctx.fill();
function submit(){
    // const n = parseInt(input_field.value);
    // console.log(n); 
    // alert(n);
    
    console.log("submit");
}
button.addEventListener('click', draw);   