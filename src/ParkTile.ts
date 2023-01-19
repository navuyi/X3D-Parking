import { color_park_tile } from "./app"
import Car from "./Car"
import ParkingLotObject from "./ParkingLotObject"


class ParkTile extends ParkingLotObject{
    private size : number
    private occupied : boolean
    constructor(position:SFVec3f, size:number){
        super(position, {x:size, y: 1, z:size}, color_park_tile, "box")
        this.occupied = false
        this.size = size
    }   


    public is_car_within = (car : Car) : boolean => {
        const car_position = car.get_position()
        const tile_position = this.get_position()

        const R = this.size/3
        if(Math.pow(car_position.x - tile_position.x, 2) + Math.pow(car_position.z - tile_position.z, 2) < Math.pow(R, 2)){
            return true
        }else{
            return false
        }
    }

    public get_occupied = () : boolean => {
        return this.occupied
    }
    public set_occupied = (occupied : boolean) : void => {
        this.occupied = occupied
    } 
}

export default ParkTile
