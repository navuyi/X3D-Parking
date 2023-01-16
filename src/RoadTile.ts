import ParkingLotObject from "./ParkingLotObject"


class RoadTile extends ParkingLotObject{
   

    constructor(position:SFVec3f, scale:SFVec3f, color:SFColor){
       super(position, scale, color, "box")
    }   
}

export default RoadTile


