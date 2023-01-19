import ParkTile from "./ParkTile"
import RoadTile from "./RoadTile"
import SpaceTile from "./SpaceTile"



class PathMapElement{
    private x : number
    private z : number
    private g : number
    private h : number
    private f : number

    private element : SpaceTile | RoadTile | ParkTile 
    private neighbors : Array<PathMapElement>
    private parent : PathMapElement | undefined

    constructor(x:number, z:number, element : SpaceTile | RoadTile | ParkTile ){
        this.z = z;
        this.x = x;
        this.g = 0;
        this.f = 0;
        this.h = 0;

        this.neighbors = []
        this.element = element
        this.parent = undefined
    }

    public get_element = () : SpaceTile | RoadTile | ParkTile => {
        return this.element
    }

    public get_x = () : number => {
        return this.x
    }
    public get_z = () : number => {
        return this.z
    }
    
    public get_f = () : number => {
        return this.f
    }
    public set_f = (f : number) : void => {
        this.f = f
    }
    
    public get_g = () : number => {
        return this.g
    }
    public set_g = (g : number) : void => {
        this.g = g
    }
    
    public get_h = () : number => {
        return this.h
    }
    public set_h = (h : number) :void => {
        this.h = h
    }
    
    public get_neighbors = () : Array<PathMapElement> => {
        return this.neighbors
    }
    
    public get_parent = () => {
        return this.parent
    }
    public set_parent = (parent : PathMapElement) => {
        this.parent = parent
    }
    
    public update_neighbors = (map : Array<Array<PathMapElement>>) => {
        let i = this.x;
        let j = this.z;
        const cols = map.length
        const rows = map[0].length
    
        if (i < cols - 1) {
            this.neighbors.push(map[i + 1][j]);
        }
        if (i > 0) {
            this.neighbors.push(map[i - 1][j]);
        }
        if (j < rows - 1) {
            this.neighbors.push(map[i][j + 1]);
        }
        if (j > 0) {
            this.neighbors.push(map[i][j - 1]);
        }

        this.neighbors = this.neighbors.filter(n => n.get_element() instanceof RoadTile || n.get_element() instanceof ParkTile)
    };
}


export default PathMapElement