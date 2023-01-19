
declare module "*.txt"
declare module "*.x3d"

declare interface HTMLElement {
    getFieldValue : Function,
    setFieldValue : Function,
}
declare interface SFVec3f {
    x: number,
    y: number,
    z: number
}
declare interface SFColor {
    r: number,
    g: number,
    b: number
}
declare interface Quaternion {
    x: number,
    y: number, 
    z: number,
    w: number
}