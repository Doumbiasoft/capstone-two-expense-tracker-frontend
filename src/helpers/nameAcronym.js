
export default function nameAcronym(ctx) {
    let shortName="";
    if(ctx.user.firstName !== undefined){
      shortName = Array.from(ctx.user.firstName)[0] +''+ Array.from(ctx.user.lastName)[0];
    }
  return shortName;
}
