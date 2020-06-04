function isObject(x) {
    return 
    Object.prototype.toString.call(x) ==='[object Object]'; 
  }
function clone(source, map = new Map()) {
      // 非 obj 直接返回
      if (!isObject(source)) return source;
      if (map.get(source))return map.get(source); 
      
      var target = Array.isArray(target) ? [] : {};
      map.set(source, target); 
  
      for (const i in source)  {
          if (source.hasOwnProperty(i)) {
              if (typeof source[i] === 'object') {
                  target[i] = clone(source[i], map); // 递归
              } else {
                  target[i] = source[i];
              }
          }
      }
      return target;
  }

  const target = { field1: 1, field2: undefined, field3: { child: 'child' }, field4: [2, 4, 8] }; 
  target.target = target

  const newobj = clone(target);
  console.log(target);