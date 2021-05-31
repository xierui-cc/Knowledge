const queue = {
  pending: null,
}

function dispatchAction(queue, action) {
  const update = {
    action,
    next: null,
  }
  if (queue.pending === null) {
    update.next = update
  } else {
    update.next = queue.pending.next;
    queue.pending.next = update
  }
  queue.pending = update
}
dispatchAction(queue, 1)
dispatchAction(queue, 2)
dispatchAction(queue, 3)
dispatchAction(queue, 4)
dispatchAction(queue, 5)
dispatchAction(queue, 6)
dispatchAction(queue, 7)
dispatchAction(queue, 8)
let index = queue.pending.next
do {
  console.log(index.action)
  index = index.next
} while (index !== queue.pending.next)