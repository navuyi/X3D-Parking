import ParkingLotObject from "./ParkingLotObject";

export type T_PROPS = {
    acceleration : number,
    friction_max : number,
    steering_angle_max : number,
    steering_angle_delta : number
}

class Car extends ParkingLotObject{
    private velocity : number
    private vector : SFVec3f
    private acceleration : number
    private friction : number
    private steering_angle : number
    private steering_angle_delta : number
    private steering_angle_max : number

    private input : {
        left: boolean,
        right: boolean,
        up: boolean,
        down: boolean
    }

    constructor(position:SFVec3f, scale:SFVec3f, color:SFColor, props:T_PROPS){
        super(position, scale, color, "box")
        
        this.velocity = 0
        this.vector = {x:0, y: 0, z:1}
        this.steering_angle = 0;
        this.acceleration = props.acceleration
        
        this.steering_angle_max = props.steering_angle_max
        this.friction = props.friction_max
        
        this.steering_angle_max = props.steering_angle_max
        this.steering_angle_delta = props.steering_angle_delta

        this.input = {
            left: false,
            right: false,
            up: false,
            down: false
        }
        
        document.addEventListener("keydown", this.handle_key_down.bind(this))
        document.addEventListener("keyup", this.handle_key_up.bind(this))
    }

    public update = () : void => {
        this.apply_acceleration()
        this.apply_velocity()
        this.apply_friction()
        this.apply_steering()
        this.apply_car_rotation()
    }

    private apply_acceleration = () => {
        if(this.input.up){
            this.velocity += this.acceleration
        }
        else if(this.input.down){
            this.velocity -= this.acceleration
        }
    }

    private apply_velocity = () : void => {
        const tmp = this.get_position()
        tmp.x += Math.sin(this.steering_angle) * this.velocity //this.vector.x * this.velocity
        tmp.z += Math.cos(this.steering_angle) * this.velocity //this.vector.z * this.velocity
        this.set_position(tmp)
    }

    private apply_car_rotation = () => {
        const rotation = this.get_rotation()
        rotation.y = 1
        rotation.w = this.steering_angle
        this.set_rotation(rotation)
    }

    private apply_friction = () : void => {
        if(this.velocity > 0){
            if(this.velocity - this.friction < 0){
                this.velocity = 0;
            }
            else{
                this.velocity -= this.friction
            }
        }
        if(this.velocity < 0){
            if(this.velocity + this.friction > 0){
                this.velocity = 0
            }
            else{
                this.velocity += this.friction
            }
        }
    }


    //this.vector.x = this.vector.x * Math.cos(angle) - this.vector.z*Math.sin(angle)
    //this.vector.y = this.vector.y
    //this.vector.z = this.vector.x*Math.sin(angle) + this.vector.z*Math.cos(angle)

    private apply_steering = () : void => {
        if(Math.abs(this.velocity) > 0.01){
            if(this.input.left){
                this.steering_angle += this.steering_angle_delta
            }
            else if(this.input.right){
                this.steering_angle -= this.steering_angle_delta
            }
        }
    }

   

    private handle_key_down = (e:KeyboardEvent) => {
        switch(e.code){
            case "ArrowLeft": {
                this.input.left = true             
                break
            }
            case "ArrowRight": {
                this.input.right = true
                break
            } 
            case "ArrowUp": {
                this.input.up = true
                break
            }
            case "ArrowDown": {
                this.input.down = true
                break
            }
        }
    }

    private handle_key_up = (e:KeyboardEvent) => {
        switch(e.code){
            case "ArrowLeft": {
                this.input.left = false
                break
            }
            case "ArrowRight": {
                this.input.right = false
                break
            } 
            case "ArrowUp": {
                this.input.up = false
                break;
            }
            case "ArrowDown": {
                this.input.down = false
                break
            }
        }
    }
}

export default Car