const MAX_STACK_SIZE_BY_DEFAULT = 10

const Stack = class {
    constructor(maxSize = MAX_STACK_SIZE_BY_DEFAULT) {
        if (!Number.isFinite(maxSize) || maxSize <= 0) {
            throw new Error(`Указан некорректный максимальный размер для стека`)
        }

        this._container = {}
        this._maxSize = maxSize
        this._size = 0
    }
    
    isEmpty = () => !this._size
    
    push(element) {
        if (this._size === this._maxSize) throw new Error(`Невозможно добавить элемент: стек переполнен`)

        this._container[this._size++] = element
        return this
    }
    
    pop() {
        if (this.isEmpty()) throw new Error(`Невозможно удалить элемент: стек пуст`)

        const topElement = this._container[this._size - 1]

        delete this._container[--this._size]
        return topElement
    }

    peek = () => this.isEmpty() ? null : this._container[this._size - 1]
    
    toArray() {
        const result = new Array(this._size)
    
        for (let i = 0, top = this._size - 1; i < result.length;) result[i++] = this._container[top--]
        return result
    }

    static fromIterable(iterable) {
        const stack = new Stack([...iterable].length)

        for (const element of iterable) stack._container[stack._size++] = element
        return stack
    }
}

module.exports = { Stack }
