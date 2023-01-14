import ParkingLotObject from "./ParkingLotObject";

export type T_PROPS = {
    acceleration_max: number,
    friction_max: number,
    steering_angle_max: number
}

class Car extends ParkingLotObject{
    private velocity : number
    private vector : SFVec3f
    private acceleration : number
    private acceleration_max: number
    private friction : number
    private steering_angle : number
    private steering_angle_max : number

    constructor(position:SFVec3f, scale:SFVec3f, color:SFColor, props:T_PROPS){
        super(position, scale, color, "box")
        
        this.velocity = 0
        this.vector = {x:0, y: 0, z:1}
        this.steering_angle = 0;
        this.acceleration = 0
        
        this.acceleration_max = props.acceleration_max
        this.steering_angle_max = props.steering_angle_max
        this.friction = props.friction_max
        
        

        document.addEventListener("keydown", this.handle_key_down.bind(this))
        document.addEventListener("keyup", this.handle_key_up.bind(this))
    }

    public update = () : void => {
        this.apply_friction()
        this.update_velocity()
        this.apply_velocity()
        this.apply_steering()
    }

    private apply_velocity = () : void => {
        const tmp = this.get_position()
        tmp.x += this.vector.x * this.velocity
        tmp.z += this.vector.z * this.velocity
        this.set_position(tmp)
    }

    private update_velocity = () : void => {
       this.velocity += this.acceleration
    }

    private apply_friction = () : void => {
        if(this.velocity - this.friction < 0){
            this.velocity = 0;
        }
        else{
            this.velocity -= this.friction
        }
    }

    private apply_steering = () : void => {
        this.vector.x = this.vector.x * Math.cos(this.steering_angle) - this.vector.z*Math.sin(this.steering_angle)
        //this.vector.y = this.vector.y
        this.vector.z = this.vector.x*Math.sin(this.steering_angle) + this.vector.z*Math.cos(this.steering_angle)
        console.log(this.vector)
    }

    private handle_key_down = (e:KeyboardEvent) => {
        switch(e.code){
            case "ArrowLeft": {
                this.steering_angle = this.steering_angle_max
                break
            }
            case "ArrowRight": {
                this.steering_angle = -this.steering_angle_max
                break
            } 
            case "ArrowUp": {
                this.acceleration = this.acceleration_max
            }
            case "ArrowDown": {
               
                break
            }
        }
    }

    private handle_key_up = (e:KeyboardEvent) => {
        switch(e.code){
            case "ArrowLeft": {
                this.steering_angle = 0
                break
            }
            case "ArrowRight": {
                this.steering_angle = 0
                break
            } 
            case "ArrowUp": {
                this.acceleration = 0
                break;
            }
        }
    }
}

export default Car