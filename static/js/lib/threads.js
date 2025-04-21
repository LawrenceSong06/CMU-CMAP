function Thread_event(func,delay=0,isAsync=false,name="unknown"){
    this.func = func;
    this.delay = delay;
    this.isAsync = isAsync;
    this.name = name;
}
function delay_acs(a,b){
    return a.delay-b.delay;
}

export function Thread(){
    this.event_list = [];
    this.default_delay = 0;
    /**
     * 
     * @param {*} func - The function put into the thread.
     * @param {*} delay - The delay of running the function, the higher the later the function is ran.
     * @param {*} isAsync - Is the function async? (true/false)
     */
    this.register = function(func,isAsync=false,delay=this.default_delay,name="unknown"){
        this.event_list.push(new Thread_event(func,delay,isAsync,name));
    }
    this.delay_down = function(){
        this.default_delay++;
    }
    this.delay_up = function(){
        this.default_delay--;
    }
    this.set_delay = function(n){
        this.default_delay=n;
    }
    this.run = async function(){
        this.event_list.sort(delay_acs);
        let processing;
        for (let index = 0; index < this.event_list.length; index++) {
            const e = this.event_list[index];
            if (processing != null) await processing;
            processing = null;

            if (e.isAsync){ 
                processing = e.func();
                // await e.func();
            }else{
                e.func();
            }
        }
    }
}


