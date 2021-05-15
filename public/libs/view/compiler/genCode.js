/**
    生成VNode
    VNode: [
        tagName 标签名
        type 节点类型
          -- ELEMENT 元素
          -- TEXT 文本
        _isStatic 是否为静态节点，如果是静态节点，在DOM-DIFF的时候可就不必进行比较
        children 节点的孩子
        attr 属性
        events 事件
    ]
*/