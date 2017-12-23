/**
 * Created by li on 23/12/2017.
 */

const formatDate  = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month}-${day}`;
}

export default {
    formatDate
};
