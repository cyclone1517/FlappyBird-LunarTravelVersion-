//变量缓存器
export class DataStore{

    static getInstance(){
        if(!DataStore.instance){
            DataStore.instance = new DataStore();
        }
        return DataStore.instance;
    }

    constructor(){
        //需要销毁的对象放map中
        //长期保存的放类变量如背景DataStore.res
        this.map = new Map();
    }

    put(key, value){
        if(typeof value === 'function'){
            value = new value;
        }
        this.map.set(key, value);
        return this;
    }

    get(key){
        return this.map.get(key);
    }

    destroy(){
        for(let value of this.map.values()){
            value = null;
        }
    }
}