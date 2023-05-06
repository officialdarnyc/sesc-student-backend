export const dateFormat = () => {
    const currentDate = new Date();
  
    const dueDate = new Date(currentDate.getTime() + 14 * 24 * 60 * 60 * 1000)
  
    const year = dueDate.getUTCFullYear();
    const month = ('0' + (dueDate.getUTCMonth() + 1)).slice(-2);
    const day = ('0' + dueDate.getUTCDate()).slice(-2);
    
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
}