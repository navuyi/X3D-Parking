export const calculate_distance = (A:SFVec3f, B:SFVec3f) => {
    const distance = Math.sqrt(Math.pow(A.x-B.x, 2) + Math.pow(A.z-B.z, 2))
    return distance
}