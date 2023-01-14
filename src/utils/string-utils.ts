
export const remove_end_of_line_chars = (text: string) : string => {
    return text.replace(/(\r\n|\n|\r)/gm, "");
}


export const get_lines = (text: string) : Array<string> => {
    return text.split('\n')
}