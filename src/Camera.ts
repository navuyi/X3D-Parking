import Car from "./Car"



class Camera{
    
    private element : HTMLElement

    constructor(position:SFVec3f, orientation:Quaternion){

        this.element = this.create_camera(position, orientation)
        document.getElementById("scene")?.appendChild(this.element)
    }

    private create_camera = (position:SFVec3f, orientation: Quaternion) => {
        const viewpoint = document.createElement("viewpoint")
        viewpoint.id = "camera"
        viewpoint.setAttribute("position", `${position.x} ${position.y} ${position.z}`)
        viewpoint.setAttribute("orientation", `${orientation.x} ${orientation.y} ${orientation.z} ${orientation.w}`)
    
        return viewpoint
    }

    public get_position = () : SFVec3f => {
        return this.element.getFieldValue("position")
    }
    public set_position = (position : SFVec3f) : void => {
        this.element.setFieldValue("position", position)
    }
    public get_orientation = () : Quaternion => {
        return this.element.getFieldValue("orientation")
    }
    public set_orientation = (orientation : Quaternion) => {
        this.element.setFieldValue("orientation", orientation)
    }

    public follow_car = (car : Car) => {
        const car_position = car.get_position()
        car_position.y += 60
        this.set_position(car_position) 
    }
}


export default Camera