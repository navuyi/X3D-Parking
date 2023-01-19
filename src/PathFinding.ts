import PathMapElement from "./PathMapElement"
import SpaceTile from "./SpaceTile"
import ParkTile from "./ParkTile"



const heuristic = (a: PathMapElement, b: PathMapElement) : number => {
    if(b.get_element() instanceof SpaceTile || b.get_element() instanceof ParkTile){
        return Number.POSITIVE_INFINITY
    }else{
        return  Math.abs(a.get_x() - b.get_x()) + Math.abs(a.get_z() - b.get_z())
    }
}

export const find_path = (map : Array<Array<PathMapElement>>, start:PathMapElement, end:PathMapElement) : Array<PathMapElement>=> {
    const openSet = []
    const closedSet = []
    const path = []

    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            const item = map[i][j]
            item.update_neighbors(map)
        }
    }

    openSet.push(start)


    while(openSet.length > 0){
        let lowestIndex = 0;
        for(let i=0; i<openSet.length; i++){
            if(openSet[i].get_f() < openSet[lowestIndex].get_f()){
                lowestIndex = i
            }
        }
        let current : PathMapElement = openSet[lowestIndex]
        //current.get_element().set_color({r:1, g:0, b:0})
        
        if (current === end) {
            let temp : any = current;
            path.push(temp);
            while (temp.get_parent()) {
              path.push(temp.get_parent());
              temp = temp.get_parent();
            }
            console.log("DONE!");
            // return the traced path
            return path.reverse();
        }

        // remove current from openSet
        openSet.splice(lowestIndex, 1)
        // and add to closedSet
        closedSet.push(current)

        let neighbors : Array<PathMapElement> = current.get_neighbors()

        for(let i=0; i<neighbors.length; i++){
            let neighbor = neighbors[i]

            if(!closedSet.includes(neighbor)){
                let possibleG = current.get_g() + 1;

                if(!openSet.includes(neighbor)){
                    openSet.push(neighbor)
                }else if(possibleG >= neighbor.get_g()){
                    continue
                }

                neighbor.set_g(possibleG)
                neighbor.set_h(heuristic(neighbor, end))
                neighbor.set_f(neighbor.get_g() + neighbor.get_h())
                neighbor.set_parent(current)

            }
        }
        
    }

    return [];
}
