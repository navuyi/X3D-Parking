import { color_grass } from "./app"
import ParkingLotObject from "./ParkingLotObject"


class SpaceTile extends ParkingLotObject{
    constructor(position:SFVec3f, size:number){
       super(position, {x:size, y: 0.8, z:size}, color_grass, "box")
    }   
}

export default SpaceTile 
