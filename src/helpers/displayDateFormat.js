const displayDateFormat = (date)=> {
    var d = new Date(date)
    return d.toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric"});
}
export default displayDateFormat;

