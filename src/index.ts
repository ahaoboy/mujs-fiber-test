function splitInt(n: number, count: number) {
  if (n < 2) return [n]
  let list = [...Array(count - 1)]
    .map(() => (Math.random() * n) | 0)
    .sort((a, b) => a - b)
  list.push(n)
  list.unshift(0)
  // console.log(list.filter(i => i < 0))
  let res = []
  for (let i = 1; i <= count; i++) {
    res.push(list[i] - list[i - 1])
  }
  return res
}

class VNode {
  constructor(public id: number, public child: VNode[] = []) {
  }
}

function getTree(count: number, maxChild = 16) {
  let id = 0

  // 创建n个节点的树
  function buildTree(n: number) {
    if (n === 1) return new VNode(id++)
    let childCount = splitInt(n - 1, maxChild)
    let root = new VNode(id++)
    // console.log('n', n, childCount)
    for (let i of childCount) {
      if (i < 1) continue
      root.child.push(buildTree(i))
    }
    return root
  }

  return buildTree(count)
}


class FNode {
  constructor(public id: number, public sibling: FNode | null = null, public parent: FNode | null = null, public child: FNode[] = []) {

  }
}


function getNodeNum(root: FNode) {
  let count = 0

  function dfs(r: FNode) {
    if (!r) return
    count++
    for (let i of r.child)
      dfs(i)
  }

  dfs(root)
  return count
}

function tree2fiber(tree: VNode) {
  let root = new FNode(tree.id)
  let nodes = tree.child
  let preNode = null
  for (let i = 0; i < nodes.length; i++) {
    let node = tree2fiber(nodes[i])
    node.parent = root
    if (i === nodes.length - 1) {
      node.sibling = null
      // preNode.sibling = node
    }
    preNode && (preNode.sibling = node)
    preNode = node
    root.child.push(node)
  }
  return root
}

function recursion(root: VNode) {
  let res: number[] = []

  function dfs(r: VNode) {
    if (!r) return
    res.push(r.id)
    for (let i of r.child)
      dfs(i)
  }

  dfs(root)
  return res
}


function fiber(root: FNode) {
  let res = []
  let current = root
  while (true) {
    res.push(current.id)
    if (current.child.length) {
      current = current.child[0]
      continue
    }
    if (current === root) {
      break
    }

    while (!current.sibling) {
      if (!current.parent || current.parent === root) {
        return res;
      }
      current = current.parent;
    }
    current = current.sibling
  }
  return res
}


let time1 = []
let time2 = []
let countList = []
const N = 100
let TestCount = 10
const ChildCount = 100
for (let pow = 1; pow < N; pow++) {
  let COUNT = ChildCount * pow
  countList.push(COUNT)
  let sum1 = 0
  let sum2 = 0
  for (let i = 0; i < TestCount; i++) {
    let root = getTree(COUNT, 16)
    // console.log(getNodeNum(root))
    // let root = getBinTree(COUNT)
    let fiberLink = tree2fiber(root)
    let st2 = +new Date()
    let dfsRes = recursion(root)
    let ed2 = +new Date()
    let st1 = +new Date()
    let fiberRes = fiber(fiberLink)
    let ed1 = +new Date()
    // console.log('fiber', ed1 - st1, 'dfs', ed2 - st2, fiberRes.join('') === dfsRes.join(''))
    // console.log(getNodeNum(root), fiberRes.length)
    // console.log(dfsRes.join(','))
    // time1.push(ed1 - st1)
    // time2.push(ed2 - st2)
    sum1 += (ed1 - st1)
    sum2 += (ed2 - st2)
  }
  time1.push(sum1 / TestCount)
  time2.push(sum2 / TestCount)
}

declare var print: (...args: any[]) => void
declare var console: { log: (...args: any[]) => void }

const log = typeof console !== 'undefined' ? console.log : print
log(time1.join(','))
log(time2.join(','))
log(countList.join(','))

