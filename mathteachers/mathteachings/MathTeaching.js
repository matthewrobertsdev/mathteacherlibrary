class MathTeaching{
    static makeListFromArray(array){
        if (array.length===0) {
          return 'none'
        } else if (array.length===1){
            return array[0];
        } else{
            var list='';
            for (var i=0; i<array.length; i++){
                list+=array[i];
                if (i===array.length-2){
                    list+=' and ';
                }
                if (i<array.length-2){
                    list+=(', ');
                }
            }
        }
        return list
    }
}
export default MathTeaching;