import Car from "./Car"
import text from "./map.txt"
import ParkingLotObject from "./ParkingLotObject"
import ParkTile from "./ParkTile"
import RoadTile from "./RoadTile"
import { T_PROPS } from "./Car"
import { get_lines, remove_whitespaces } from "./utils/string-utils"
import Camera from "./Camera"
import { calculate_distance } from "./utils/calculate-distance"
import NavigationArrow from "./NavigationArrow"
import SpaceTile from "./SpaceTile"
import PathMapElement from "./PathMapElement"
import { find_path } from "./PathFinding"


export const color_gold : SFColor = {r:252/255,g:186/255,b:3/255}
export const color_road : SFColor = {r: 34/255, g: 34/255, b: 34/255}
export const color_path : SFColor = {r:1/255,g:1/255,b:1/255}
export const color_grass : SFColor = {r: 1/255, g: 30/255, b: 1/255}
export const color_park_tile : SFColor = {r: 135/255, g: 135/255, b: 135/255}

const txt = remove_whitespaces(text)
const lines = get_lines(text)
const string_map: Array<Array<string>> = lines.map(line => line.split(""))
const map: Array<Array<RoadTile | ParkTile | SpaceTile>> = []
const path_map : Array<Array<PathMapElement>> = []



for(let i=0; i<string_map.length; i++){
    map.push(new Array(string_map[i].length))
    path_map.push(new Array(string_map[i].length))
}

const park_tiles : Array<PathMapElement> = []
const road_tiles : Array<PathMapElement> = []
const SIZE = 3

// Prepare map for path finding
for(let i=0; i<string_map.length; i++){
    for(let k=0; k<map[i].length; k++){
        const position = {
            x: i*SIZE*2,
            y: 0,
            z: k*SIZE*2
        }
        if(string_map[i][k] === "#"){
            const rt = new RoadTile(position, SIZE)
            map[i][k] = rt
            const rt_elem = new PathMapElement(i, k, rt)
            path_map[i][k] = rt_elem
            road_tiles.push(rt_elem)
        }
        else if(string_map[i][k] === "P"){
            const pt =  new ParkTile(position, SIZE)
            map[i][k] = pt
            const pt_elem = new PathMapElement(i, k, pt)
            path_map[i][k] = pt_elem
            park_tiles.push(pt_elem)
        }
        else{
          const st =  new SpaceTile(position, SIZE)
          map[i][k] = st
          path_map[i][k] = new PathMapElement(i, k, st)
        }
    }
}



let  camera = new Camera({x:0,y:50,z:0}, {x:-1, y:0, z:0, w:Math.PI/2})
const props : T_PROPS = {
    acceleration: 0.009,
    friction_max: 0.005,
    steering_angle_max: Math.PI/24,
    steering_angle_delta: Math.PI/100
} 
let car : Car
let path : Array<PathMapElement> = []
let designated_park_tile : PathMapElement
let running : boolean = false


const init_game = () => {
    car = new Car({x:2*SIZE,y:2,z:0}, {x:0.7,y:0.7,z:1}, {r:0,g:0,b:1}, props)
    const unoccupied_park_tiles = park_tiles.filter(pt => {
        const _pt = pt.get_element() as ParkTile
        return _pt.get_occupied() === false
    })
    designated_park_tile = unoccupied_park_tiles[Math.floor(Math.random()*unoccupied_park_tiles.length)]

    running = true

    setTimeout(() => {
        navigate()
    }, 500)
}

const navigate = () => {
    let next_tile : PathMapElement | undefined;
    let distance = Number.POSITIVE_INFINITY
    for(let i=0; i<path_map.length; i++){
        for(let k=0; k<path_map[i].length; k++){
            const tile = path_map[i][k]
            if(tile.get_element() instanceof RoadTile){
                const tmp_dist = calculate_distance(car.get_position(), tile.get_element().get_position())
                if(tmp_dist < distance){
                    distance = tmp_dist
                    next_tile = tile
                }
            }
        }
    }
    if(next_tile != null){
        const start = next_tile
        const end = designated_park_tile
        path = find_path(path_map, start, end)
        for(const p of path){
            p.get_element().set_color(color_path)
        }
    }
    designated_park_tile.get_element().set_color(color_gold)
}


init_game()


const animate = () => {
    if(running){
        car.update()
        camera.follow_car(car)

        const pt = designated_park_tile.get_element() as ParkTile
        const parked = pt.is_car_within(car)
        if(parked){
            pt.set_occupied(true)
            running = false
            // Clear colors
            for(const p of path){
                p.get_element().set_color(color_road)
            }
            for(const elem of park_tiles){
                if(elem.get_element() instanceof ParkTile){
                    elem.get_element().set_color(color_park_tile)
                }
            }

            init_game()
        }


        requestAnimationFrame(animate)
    }
}

requestAnimationFrame(animate)


