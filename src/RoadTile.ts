import ParkingLotObject from "./ParkingLotObject"
import ParkTile from "./ParkTile"


class RoadTile extends ParkingLotObject{
    
    constructor(position:SFVec3f, size:number){
       super(position, {x:size, y:1, z:size}, {r: 34/255, g: 34/255, b: 34/255}, "box")
    }   
}

    




export default RoadTile


