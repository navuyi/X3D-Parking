import Car, { T_PROPS } from "./Car"
import text from "./map.txt"
import RoadTile from "./RoadTile"
import { get_lines, remove_end_of_line_chars } from "./utils/string-utils"

const text_arr = get_lines(text)
console.log(text_arr)
const size = text_arr[0].length
const map : Array<{
    x: number,
    z: number,
    type: string
}> = []


//TODO split the "map" string into lines and work on that split on \n end of the line character

const SIZE = 2
for(const [row_idx, row] of text_arr.entries()){
    Array.from(row).forEach((char, index) => {
        if(char === "#"){
            map.push({
                type: "road",
                x: index*SIZE*2,
                z: row_idx*SIZE*2
            })
        }
    })
}




// Generate lane of road tiles

// Generate lane of road tiles
let pos = 0;
const props : T_PROPS = {
    acceleration_max: 0.01,
    friction_max: 0.005,
    steering_angle_max: Math.PI/1000
} 
const car = new Car({x:0,y:2,z:0}, {x:1,y:1,z:1.5}, {r:0,g:0,b:1}, props)

map.forEach(item => {
    if(item.type === "road"){
        console.log("gene")
        new RoadTile({x: item.x, y: 0, z: item.z}, {x: SIZE, z: SIZE, y: 1}, {r: 82/255, g:82/255, b:82/255})
    }
    else{

    }
})



const camera = document.getElementById("camera")

document.onkeydown = checkKey;

function checkKey(e:KeyboardEvent) {
    e = e || window.event;
    const current_position = camera?.getAttribute("position")
}


const animate = () => {
    car.update()




    requestAnimationFrame(animate)
}

requestAnimationFrame(animate)
