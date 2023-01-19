import Car from "./Car"
import ParkingLotObject from "./ParkingLotObject"
import ParkTile from "./ParkTile"
import RoadTile from "./RoadTile"
import { calculate_distance } from "./utils/calculate-distance"

class NavigationArrow extends ParkingLotObject{
    
    constructor(position:SFVec3f, scale={x: 1, y:0.2, z:0.2}, color={r:1, g:0, b:0}){
       super(position, scale, color, "box")
    }
    
    public follow_car = (car: Car) => {
        const car_position = car.get_position()
        car_position.y += 2
        this.set_position(car_position)
    }

    public rotate_to_target = (target : ParkTile) => {
       
        const target_position = target.get_position()
        const direction : SFVec3f = {
            x: -this.get_position().x + target_position.x,
            y: -this.get_position().y + target_position.y,
            z: -this.get_position().z + target_position.z,
        }
        const angle_y = Math.atan2(direction.z, direction.x)
        console.log(angle_y)
        const rotation = this.get_rotation()
        rotation.y = 1
        rotation.w = angle_y
        this.set_rotation(rotation) 
    }

    public follow_path = (path: Array<RoadTile>, car:Car, designated_park_tile: ParkTile) => {
       

        // Get closest tile between car and parking lot
        const tiles_closest_to_car = path.sort((a, b) => {
            return calculate_distance(car.get_position(), a.get_position()) - calculate_distance(car.get_position(), b.get_position())
        }).splice(0,3)

        const next_tile = tiles_closest_to_car.sort((a, b) => {
            return calculate_distance(designated_park_tile.get_position(), a.get_position()) - calculate_distance(designated_park_tile.get_position(), b.get_position())
        })[0]
        
        next_tile.set_color({r:1,g:1,b:1})

        // Rotate arrow to point to the next tile

        // 1. Calculate vector between tile and arrow
        const direction : SFVec3f = {
            x: next_tile.get_position().x - this.get_position().x,
            y: next_tile.get_position().y - this.get_position().y,
            z: next_tile.get_position().z - this.get_position().z,
        }

        const angle_y = Math.atan2(direction.x, direction.z)
        const angle_x = Math.atan2(direction.y, direction.z)
        const angle_z = Math.atan2(direction.x, direction.y)

        this.set_rotation({x:angle_x, y:angle_y, z:angle_z, w:1})
    }
}

export default NavigationArrow