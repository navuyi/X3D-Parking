
class ParkingLotObject{
    protected element : HTMLElement

    constructor(position: SFVec3f, scale:SFVec3f, color:SFColor, type: "box" | "sphere"){  
       this.element = this.create_element(position, scale, color, type)
       document.getElementById("scene")?.appendChild(this.element)
    }

    public get_position = () : SFVec3f => {
        return this.element?.getFieldValue("translation")
    }
    public set_position = (position : SFVec3f) : void => {
        this.element.setFieldValue("translation", position)
    } 

    public get_rotation = () : Quaternion => {
        return this.element?.getFieldValue("rotation")
    }

    public set_rotation = (value : Quaternion) => {
        this.element.setAttribute("rotation", `${value.x} ${value.y} ${value.z} ${value.w}`)
    }

    public get_scale = () : SFVec3f => {
        return this.element?.getFieldValue("scale")
    }
    public set_scale = (scale : SFVec3f) : void => {
       this.element?.setFieldValue("scale", scale)
    } 

    public get_color = () : SFColor => {
        const material = this.element?.getElementsByTagName("material")[0] as HTMLElement
        return material?.getFieldValue("diffuseColor")
    }
    public set_color = (color : SFColor) => {
        const material = this.element?.getElementsByTagName("material")[0] as HTMLElement
        material.setFieldValue("diffuseColor", color)
    }

    private create_element = (position:SFVec3f, scale:SFVec3f, color:SFColor, type : string) : HTMLElement => {
        const html_transform = document.createElement("transform")
        html_transform.setAttribute("translation", `${position.x} ${position.y} ${position.z}`)
        html_transform.setAttribute("scale", `${scale.x} ${scale.y} ${scale.z}`)

        const html_shape = document.createElement("shape")
        const html_appearance = document.createElement("appearance")
        const html_material = document.createElement("material")
        html_material.setAttribute("diffuseColor", `${color.r} ${color.g} ${color.b}`)
        const shape = document.createElement(type)

        html_appearance.appendChild(html_material)
        html_shape.appendChild(html_appearance)
        html_shape.append(shape)
        html_transform.appendChild(html_shape)

        return html_transform
    }
}

export default ParkingLotObject