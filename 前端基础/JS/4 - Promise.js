(function (window) {
    /* Promise 构造函数
    excutor: 内部同步执行的函数 (resolve, reject) => {}
    */
   function Promise(excutor) {
        const self = this 
        self.status = 'pending' // 状态值, 初始状态为 pending, 成功了变为 resolved, 失败了变为 rejected 
        self.data = undefined // 用来保存成功 value 或失败 reason 的属性 
        self.callbacks = [] 

        try { // 立即同步调用 excutor()处理 
            excutor(resolve, reject) 
        } catch (error) { // 如果出了异常, 直接失败 
            reject(error) 
        }

        function reject(reason) {
            if (self.status!=='pending') { return } // 如果当前不是 pending, 直接结束
            self.status = 'rejected' 
            self.data = reason 
            // 异步调用所有待处理的 onRejected 失败回调函数 
            setTimeout(() => {  
                self.callbacks.forEach(obj => { obj.onRejected(reason) })
            })
        }
            
        function resolve(value) { 
            if( self.status!=='pending') { return } // 如果当前不是 pending, 直接结束
            self.status = 'resolved'
            self.data = value 
            // 异步调用所有待处理的 onResolved 成功回调函数 
            setTimeout(() => { 
                self.callbacks.forEach(obj => { obj.onResolved(value) }) 
            })
        }
    }
    /* 为 promise 指定成功/失败的回调函数
    函数的返回值是一个新的 promise 对象
    */
    Promise.prototype.then = function (onResolved, onRejected) { 
        const self = this
        // 如果 onResolved/onRejected 不是函数, 可它指定一个默认的函数 
        onResolved = typeof onResolved==='function' ? onResolved : value => value;
        onRejected = typeof onRejected === 'function' ? onRejected : reason => {throw reason};

        // 返回一个新的 promise 对象 
        return new Promise((resolve, reject) => { 
            /* 
             专门抽取的用来处理 promise 成功/失败结果的函数
             callback: 成功/失败的回调函数 
             */
            function handle(callback) { 
                // 1. 抛出异常 ===> 返回的 promise 变为 rejected 
                try { 
                    const x = callback(self.data) 
                    // 2. 返回一个新的 promise ===> 得到新的 promise 的结果值作为返回的 promise 的结果值 
                    if (x instanceof Promise) { 
                        x.then(resolve, reject) 
                        // 一旦 x 成功了, resolve(value), 一旦 x 失败了: reject(reason) 
                    } else { 
                        // 3. 返回一个一般值(undefined) ===> 将这个值作为返回的 promise 的成功值
                        resolve(x)
                    } 
                } catch (error) { 
                    reject(error)
                }
            } 

            if (self.status === 'resolved') { 
                // 当前 promise 已经成功了 
                setTimeout(() => { handle(onResolved) }) 
            } else if (self.status === 'rejected') { 
                // 当前 promise 已经失败了 
                setTimeout(() => { handle(onRejected) }) 
            } else { // 当前 promise 还未确定 pending 
                // 将 onResolved 和 onRejected 保存起来 
                self.callbacks.push({ 
                    onResolved(value) { handle(onResolved) },
                    onRejected(reason) { handle(onRejected) }
                })
            }
        })
    } 
    /* 为 promise 指定失败的回调函数
    是 then(null, onRejected)的语法糖
    */
    Promise.prototype.catch = function (onRejected) { // 语法糖而已
        return this.then(null, onRejected) 
    }

    Promise.race = function (promises) {
        return new Promise((resolve, reject) => { 
            for (var i = 0; i < promises.length; i++) { 
                Promise.resolve(promises[i]).then(
                    (value) => { resolve(value) },
                    (reason) => { reject(reason) }
                )
            }   
        })
    }

    Promise.all = function (promises) { 
        return new Promise((resolve, reject) => {
            let resolvedCount = 0  // 已成功的数量 
            const promisesLength = promises.length // 待处理的 promises 数组的长度 
            const values = new Array(promisesLength) // 准备一个保存成功值的数组 
    
            for (let i = 0; i < promisesLength; i++) { 
                // promises 中元素可能不是一个数组, 需要用 resolve 包装一下 
                Promise.resolve(promises[i]).then( value => { 
                    values[i] = value // 成功当前 promise 成功的值到对应的下标
                    resolvedCount++ // 成功的数量加 1
                    if(resolvedCount===promisesLength) { // 一旦全部成功 
                        // 将所有成功值的数组作为返回 promise 对象的成功结果值 
                        resolve(values) 
                    }
                }, reason => { reject(reason) } // 一旦有一个promise产生了失败结果值, 将其作为返回promise对象的失败结果值
                )
            }
        })
    }
    /*
    返回一个延迟指定时间才确定结果的 promise 对象
    */ 
    Promise.resolveDelay = function (value, time) { 
        return new Promise((resolve, reject) => { 
            setTimeout(() => { 
                if (value instanceof Promise) { // 如果 value 是一个 promise, 取这个 promise 的结果值作为返回的 promise 的结果值 
                    value.then(resolve, reject) // 如果 value 成功, 调用 resolve(val), 如果 value 失败了, 调用 reject(reason) 
                } else { resolve(value) } 
            }, time); 
        }) 
    }
    /* 
    返回一个延迟指定时间才失败的 Promise 对象。 
    */ 
    Promise.rejectDelay = function (reason, time) { 
        return new Promise((resolve, reject) => { 
            setTimeout(() => { reject(reason) }, time)
        })
    }
    window.Promise = Promise
})(window)