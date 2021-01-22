class MathTeacher{
  normalizeFractionPairs(args) {
    console.log("abcd"+args.length)
    for (let i=0; i<args.length; i++) {
      if (args[i]===undefined) {
        args[i]=""
      }
    }
    for (let i=0; i<args.length-1; i+=2) {
      try {
        args[i]=parseInt(args[i])
        args[i+1]=parseInt(args[i+1])
        if (args[i]>0 && args[i+1]<0) {
          args[i]*=-1
          args[i+1]*=-1
        }
      } catch {

      }
    }
    console.log("in normalize"+args)
    return args
  }
}
export default MathTeacher;