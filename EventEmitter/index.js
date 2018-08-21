// 自定义事件,
// node index.js 即可
class Event {
    constructor() {
        this.actions = {

        }
    }

    registerAction(name, callback) {
        let n = name
        if (typeof this.actions[n] === 'undefined' || this.actions[n] === null) {
            this.actions[n] = []
        }
        this.actions[n].push(callback)
        return this
    }

    fire(...arg) {
        const [name, ...rest] = arg
        const callbacks = this.actions[name]
        if (Array.isArray(callbacks)) {
            callbacks.forEach((k) => {
              k.apply(this, rest)
            })
        }else {
            // 没有找到
        }
        return this
    }

    removeAction(name) {
        if (name !== undefined) {
          this.actions[name] = null
        } else {
          this.actions = null
        }
        return this
    }

    // 生命周期 事件销毁
    destroy() {
        if (Object.keys(this.actions).length > 0) {
            this.fire('destroyed')
        }
        this.actions = null
    }

    // single 创建一个单例
    static single() {
        const cls = this
        if (cls.instance === undefined) {
            cls.instance = new cls()
        }
        return cls.instance
    }
}

const test = () => {
    const log = console.log.bind(console)
    const w = Event.single()
    const eventType = 'message'

    w.registerAction(eventType, () => {
        log('message event')
    })

    w.registerAction(eventType, () => {
        log('message event 1')
    })

    w.fire(eventType)

    w.removeAction(eventType)

    w.fire(eventType)

    w.registerAction(eventType, () => {
        log('message event 3')
    })

    w.fire(eventType)
}

const main = () => {
    test()
}

main()
